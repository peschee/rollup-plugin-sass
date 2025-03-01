"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFunction = exports.isObject = exports.isString = exports.isset = exports.error = exports.warn = exports.log = void 0;
exports.log = console.log.bind(console), exports.warn = console.warn.bind(console), exports.error = console.error.bind(console), exports.isset = x => x !== null && x !== undefined, exports.isString = x => exports.isset(x) && x.constructor === String, exports.isObject = x => typeof x === 'object', exports.isFunction = x => typeof x === 'function';
//# sourceMappingURL=index.js.map