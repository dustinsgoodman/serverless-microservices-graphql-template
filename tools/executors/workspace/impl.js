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
exports.LARGE_BUFFER = void 0;
var child_process_1 = require('child_process');
var path = require('path');
var yargsParser = require('yargs-parser');
var npm_run_path_1 = require('npm-run-path');
exports.LARGE_BUFFER = 1024 * 1000000;
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
var propKeys = [
	'command',
	'commands',
	'color',
	'parallel',
	'readyWhen',
	'cwd',
	'args',
	'envFile',
	'outputPath',
];
function default_1(options, context) {
	return __awaiter(this, void 0, void 0, function () {
		var normalized, success, _a, e_1;
		return __generator(this, function (_b) {
			switch (_b.label) {
				case 0:
					return [4 /*yield*/, loadEnvVars(options.envFile)];
				case 1:
					_b.sent();
					normalized = normalizeOptions(options);
					if (options.readyWhen && !options.parallel) {
						throw new Error(
							'ERROR: Bad executor config for @nrwl/run-commands - "readyWhen" can only be used when "parallel=true".'
						);
					}
					_b.label = 2;
				case 2:
					_b.trys.push([2, 7, , 8]);
					if (!options.parallel) return [3 /*break*/, 4];
					return [4 /*yield*/, runInParallel(normalized, context)];
				case 3:
					_a = _b.sent();
					return [3 /*break*/, 6];
				case 4:
					return [4 /*yield*/, runSerially(normalized, context)];
				case 5:
					_a = _b.sent();
					_b.label = 6;
				case 6:
					success = _a;
					return [2 /*return*/, { success: success }];
				case 7:
					e_1 = _b.sent();
					if (process.env.NX_VERBOSE_LOGGING === 'true') {
						console.error(e_1);
					}
					throw new Error(
						'ERROR: Something went wrong in @nrwl/run-commands - '.concat(
							e_1.message
						)
					);
				case 8:
					return [2 /*return*/];
			}
		});
	});
}
exports['default'] = default_1;
function runInParallel(options, context) {
	return __awaiter(this, void 0, void 0, function () {
		var procs, r, r, failed;
		return __generator(this, function (_a) {
			switch (_a.label) {
				case 0:
					procs = options.commands.map(function (c) {
						return createProcess(
							c.command,
							options.readyWhen,
							options.color,
							calculateCwd(options.cwd, context)
						).then(function (result) {
							return {
								result: result,
								command: c.command,
							};
						});
					});
					if (!options.readyWhen) return [3 /*break*/, 2];
					return [4 /*yield*/, Promise.race(procs)];
				case 1:
					r = _a.sent();
					if (!r.result) {
						process.stderr.write(
							'Warning: @nrwl/run-commands command "'.concat(
								r.command,
								'" exited with non-zero status code'
							)
						);
						return [2 /*return*/, false];
					} else {
						return [2 /*return*/, true];
					}
					return [3 /*break*/, 4];
				case 2:
					return [4 /*yield*/, Promise.all(procs)];
				case 3:
					r = _a.sent();
					failed = r.filter(function (v) {
						return !v.result;
					});
					if (failed.length > 0) {
						failed.forEach(function (f) {
							process.stderr.write(
								'Warning: @nrwl/run-commands command "'.concat(
									f.command,
									'" exited with non-zero status code'
								)
							);
						});
						return [2 /*return*/, false];
					} else {
						return [2 /*return*/, true];
					}
					_a.label = 4;
				case 4:
					return [2 /*return*/];
			}
		});
	});
}
function normalizeOptions(options) {
	options.parsedArgs = parseArgs(options);
	if (options.command) {
		options.commands = [{ command: options.command }];
		options.parallel = !!options.readyWhen;
	} else {
		options.commands = options.commands.map(function (c) {
			return typeof c === 'string' ? { command: c } : c;
		});
	}
	options.commands.forEach(function (c) {
		var _a;
		c.command = transformCommand(
			c.command,
			options.parsedArgs,
			(_a = c.forwardAllArgs) !== null && _a !== void 0 ? _a : true
		);
	});
	return options;
}
function runSerially(options, context) {
	return __awaiter(this, void 0, void 0, function () {
		var _i, _a, c;
		return __generator(this, function (_b) {
			for (_i = 0, _a = options.commands; _i < _a.length; _i++) {
				c = _a[_i];
				createSyncProcess(
					c.command,
					options.color,
					calculateCwd(options.cwd, context)
				);
			}
			return [2 /*return*/, true];
		});
	});
}
function createProcess(command, readyWhen, color, cwd) {
	return new Promise(function (res) {
		var childProcess = (0, child_process_1.exec)(command, {
			maxBuffer: exports.LARGE_BUFFER,
			env: processEnv(color),
			cwd: cwd,
		});
		/**
		 * Ensure the child process is killed when the parent exits
		 */
		var processExitListener = function () {
			return childProcess.kill();
		};
		process.on('exit', processExitListener);
		process.on('SIGTERM', processExitListener);
		childProcess.stdout.on('data', function (data) {
			process.stdout.write(data);
			if (readyWhen && data.toString().indexOf(readyWhen) > -1) {
				res(true);
			}
		});
		childProcess.stderr.on('data', function (err) {
			process.stderr.write(err);
			if (readyWhen && err.toString().indexOf(readyWhen) > -1) {
				res(true);
			}
		});
		childProcess.on('exit', function (code) {
			if (!readyWhen) {
				res(code === 0);
			}
		});
	});
}
function createSyncProcess(command, color, cwd) {
	(0, child_process_1.execSync)(command, {
		env: processEnv(color),
		stdio: [process.stdin, process.stdout, process.stderr],
		maxBuffer: exports.LARGE_BUFFER,
		cwd: cwd,
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
function transformCommand(command, args, forwardAllArgs) {
	if (command.indexOf('{args.') > -1) {
		var regex = /{args\.([^}]+)}/g;
		return command.replace(regex, function (_, group) {
			return args[camelCase(group)];
		});
	} else if (Object.keys(args).length > 0 && forwardAllArgs) {
		var stringifiedArgs = Object.keys(args)
			.map(function (a) {
				return typeof args[a] === 'string' && args[a].includes(' ')
					? '--'.concat(a, '="').concat(args[a].replace(/"/g, '"'), '"')
					: '--'.concat(a, '=').concat(args[a]);
			})
			.join(' ');
		return ''.concat(command, ' ').concat(stringifiedArgs);
	} else {
		return command;
	}
}
function parseArgs(options) {
	var args = options.args;
	if (!args) {
		var unknownOptionsTreatedAsArgs = Object.keys(options)
			.filter(function (p) {
				return propKeys.indexOf(p) === -1;
			})
			.reduce(function (m, c) {
				return (m[c] = options[c]), m;
			}, {});
		return unknownOptionsTreatedAsArgs;
	}
	return yargsParser(args.replace(/(^"|"$)/g, ''), {
		configuration: { 'camel-case-expansion': true },
	});
}
function camelCase(input) {
	if (input.indexOf('-') > 1) {
		return input.toLowerCase().replace(/-(.)/g, function (match, group1) {
			return group1.toUpperCase();
		});
	} else {
		return input;
	}
}
