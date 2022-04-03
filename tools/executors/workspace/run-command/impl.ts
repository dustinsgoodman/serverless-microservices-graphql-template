import { ExecutorContext } from '@nrwl/devkit';
import { exec } from 'child_process';
import * as path from 'path';
import { env as appendLocalEnv } from 'npm-run-path';

const LARGE_BUFFER = 1024 * 1_000_000;

async function loadEnvVars(path?: string) {
  if (path) {
    const result = (await import('dotenv')).config({ path });
    if (result.error) {
      throw result.error;
    }
  } else {
    try {
      (await import('dotenv')).config();
    } catch {}
  }
}

export interface RunCommandsBuilderOptions {
  command: string;
  color?: boolean;
  cwd?: string;
  args?: string;
  envFile?: string;
  outputPath?: string;
  exitCommand?: string;
}

export default async function buildExecutor(
  options: RunCommandsBuilderOptions,
  context: ExecutorContext
) {
  console.info(`Executing workspace:run-command...`);
  await loadEnvVars(options.envFile);

  try {
    process.on('SIGINT', () => {
      console.log('noop on SIGINT');
    });
    process.on('SIGTERM', () => {
      console.log('noop on SIGTERM');
    });

    console.log(`getting ready to run ${options.command}`);

    await createProcess(
      options.command,
      calculateCwd(options.cwd, context),
      options.color
    );

    return { success: true };
  } catch (e) {
    if (process.env.NX_VERBOSE_LOGGING === 'true') {
      console.error(e);
    }
    throw new Error(
      `ERROR: Something went wrong in @nrwl/run-commands - ${e.message}`
    );
  }
}

function createProcess(command: string, cwd: string, color: boolean) {
  return new Promise((res) => {
    const childProcess = exec(command, {
      cwd,
      env: processEnv(color),
      maxBuffer: LARGE_BUFFER,
      // stdio: [process.stdin, process.stdout, 'pipe'],
    });

    /**
     * Ensure the child process is killed when the parent exits
     */
    const processExitListener = (args) => {
      console.log('processExitListener', args);
      childProcess.kill();
    };
    process.on('exit', (args) => {
      console.log('exit handler', args);
      childProcess.kill();
    });
    process.on('SIGTERM', (args) => {
      console.log('SIGTERM handler', args);
      // childProcess.kill();
    });

    childProcess.stdout.on('data', (data) => {
      process.stdout.write(data);
    });

    childProcess.stderr.on('data', (err) => {
      process.stderr.write(err);
    });

    childProcess.on('exit', (code) => {
      process.stdout.write(`Exit with code: ${code}`);
    });

    childProcess.on('SIGINT', () => {
      console.log("DON'T SIGINT");
    });
    childProcess.on('SIGTERM', () => {
      console.log("DON'T SIGTERM");
    });
  });
}

function calculateCwd(
  cwd: string | undefined,
  context: ExecutorContext
): string {
  if (!cwd) return context.root;
  if (path.isAbsolute(cwd)) return cwd;
  return path.join(context.root, cwd);
}

function processEnv(color: boolean) {
  const env = {
    ...process.env,
    ...appendLocalEnv(),
  };

  if (color) {
    env.FORCE_COLOR = `${color}`;
  }
  return env;
}
