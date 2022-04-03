'use strict';
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
exports.__esModule = true;
var child_process_1 = require('child_process');
var path = require('path');
var npm_run_path_1 = require('npm-run-path');
var LARGE_BUFFER = 1024 * 1000000;
function loadEnvVars(path) {
  return __awaiter(this, void 0, void 0, function () {
    var result, _a;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          if (!path) return [3 /*break*/, 2];
          return [
            4 /*yield*/,
            Promise.resolve().then(function () {
              return require('dotenv');
            }),
          ];
        case 1:
          result = _b.sent().config({ path: path });
          if (result.error) {
            throw result.error;
          }
          return [3 /*break*/, 5];
        case 2:
          _b.trys.push([2, 4, , 5]);
          return [
            4 /*yield*/,
            Promise.resolve().then(function () {
              return require('dotenv');
            }),
          ];
        case 3:
          _b.sent().config();
          return [3 /*break*/, 5];
        case 4:
          _a = _b.sent();
          return [3 /*break*/, 5];
        case 5:
          return [2 /*return*/];
      }
    });
  });
}
function buildExecutor(options, context) {
  return __awaiter(this, void 0, void 0, function () {
    var e_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          console.info('Executing workspace:run-command...');
          return [4 /*yield*/, loadEnvVars(options.envFile)];
        case 1:
          _a.sent();
          _a.label = 2;
        case 2:
          _a.trys.push([2, 4, , 5]);
          process.stdin.resume();
          process.on('SIGINT', function () {
            console.log('noop on SIGINT');
          });
          process.on('SIGTERM', function () {
            console.log('noop on SIGTERM');
          });
          console.log('getting ready to run '.concat(options.command));
          return [
            4 /*yield*/,
            createProcess(
              options.command,
              calculateCwd(options.cwd, context),
              options.color
            ),
          ];
        case 3:
          _a.sent();
          return [2 /*return*/, { success: true }];
        case 4:
          e_1 = _a.sent();
          if (process.env.NX_VERBOSE_LOGGING === 'true') {
            console.error(e_1);
          }
          throw new Error(
            'ERROR: Something went wrong in @nrwl/run-commands - '.concat(
              e_1.message
            )
          );
        case 5:
          return [2 /*return*/];
      }
    });
  });
}
exports['default'] = buildExecutor;
function createProcess(command, cwd, color) {
  return new Promise(function (res) {
    var childProcess = (0, child_process_1.exec)(command, {
      cwd: cwd,
      env: processEnv(color),
      maxBuffer: LARGE_BUFFER,
    });
    /**
     * Ensure the child process is killed when the parent exits
     */
    var processExitListener = function (args) {
      console.log('processExitListener', args);
      childProcess.kill();
    };
    process.on('exit', function (args) {
      console.log('exit handler', args);
      childProcess.kill();
    });
    process.on('SIGTERM', function (args) {
      console.log('SIGTERM handler', args);
      // childProcess.kill();
    });
    childProcess.stdout.on('data', function (data) {
      process.stdout.write(data);
    });
    childProcess.stderr.on('data', function (err) {
      process.stderr.write(err);
    });
    childProcess.on('exit', function (code) {
      process.stdout.write('Exit with code: '.concat(code));
    });
    childProcess.on('SIGINT', function () {
      console.log("DON'T SIGINT");
    });
    childProcess.on('SIGTERM', function () {
      console.log("DON'T SIGTERM");
    });
  });
}
function calculateCwd(cwd, context) {
  if (!cwd) return context.root;
  if (path.isAbsolute(cwd)) return cwd;
  return path.join(context.root, cwd);
}
function processEnv(color) {
  var env = __assign(__assign({}, process.env), (0, npm_run_path_1.env)());
  if (color) {
    env.FORCE_COLOR = ''.concat(color);
  }
  return env;
}
