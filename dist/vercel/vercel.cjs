"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/.pnpm/ms@2.1.3/node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/.pnpm/ms@2.1.3/node_modules/ms/index.js"(exports2, module2) {
    "use strict";
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module2.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// node_modules/.pnpm/debug@4.4.1/node_modules/debug/src/common.js
var require_common = __commonJS({
  "node_modules/.pnpm/debug@4.4.1/node_modules/debug/src/common.js"(exports2, module2) {
    "use strict";
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
          if (!debug.enabled) {
            return;
          }
          const self = debug;
          const curr = Number(/* @__PURE__ */ new Date());
          const ms = curr - (prevTime || curr);
          self.diff = ms;
          self.prev = prevTime;
          self.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self, args);
          const logFn = self.log || createDebug.log;
          logFn.apply(self, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy;
        Object.defineProperty(debug, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v) => {
            enableOverride = v;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug);
        }
        return debug;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        const split = (typeof namespaces === "string" ? namespaces : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
        for (const ns of split) {
          if (ns[0] === "-") {
            createDebug.skips.push(ns.slice(1));
          } else {
            createDebug.names.push(ns);
          }
        }
      }
      function matchesTemplate(search2, template) {
        let searchIndex = 0;
        let templateIndex = 0;
        let starIndex = -1;
        let matchIndex = 0;
        while (searchIndex < search2.length) {
          if (templateIndex < template.length && (template[templateIndex] === search2[searchIndex] || template[templateIndex] === "*")) {
            if (template[templateIndex] === "*") {
              starIndex = templateIndex;
              matchIndex = searchIndex;
              templateIndex++;
            } else {
              searchIndex++;
              templateIndex++;
            }
          } else if (starIndex !== -1) {
            templateIndex = starIndex + 1;
            matchIndex++;
            searchIndex = matchIndex;
          } else {
            return false;
          }
        }
        while (templateIndex < template.length && template[templateIndex] === "*") {
          templateIndex++;
        }
        return templateIndex === template.length;
      }
      function disable() {
        const namespaces = [
          ...createDebug.names,
          ...createDebug.skips.map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        for (const skip of createDebug.skips) {
          if (matchesTemplate(name, skip)) {
            return false;
          }
        }
        for (const ns of createDebug.names) {
          if (matchesTemplate(name, ns)) {
            return true;
          }
        }
        return false;
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module2.exports = setup;
  }
});

// node_modules/.pnpm/debug@4.4.1/node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/.pnpm/debug@4.4.1/node_modules/debug/src/browser.js"(exports2, module2) {
    "use strict";
    exports2.formatArgs = formatArgs;
    exports2.save = save;
    exports2.load = load;
    exports2.useColors = useColors;
    exports2.storage = localstorage();
    exports2.destroy = /* @__PURE__ */ (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports2.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      let m;
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module2.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports2.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports2.storage.setItem("debug", namespaces);
        } else {
          exports2.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r;
      try {
        r = exports2.storage.getItem("debug") || exports2.storage.getItem("DEBUG");
      } catch (error) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module2.exports = require_common()(exports2);
    var { formatters } = module2.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// node_modules/.pnpm/debug@4.4.1/node_modules/debug/src/node.js
var require_node = __commonJS({
  "node_modules/.pnpm/debug@4.4.1/node_modules/debug/src/node.js"(exports2, module2) {
    "use strict";
    var tty = require("tty");
    var util = require("util");
    exports2.init = init;
    exports2.log = log;
    exports2.formatArgs = formatArgs;
    exports2.save = save;
    exports2.load = load;
    exports2.useColors = useColors;
    exports2.destroy = util.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    );
    exports2.colors = [6, 2, 3, 4, 5, 1];
    try {
      const supportsColor = require("supports-color");
      if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports2.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (error) {
    }
    exports2.inspectOpts = Object.keys(process.env).filter((key) => {
      return /^debug_/i.test(key);
    }).reduce((obj, key) => {
      const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
        return k.toUpperCase();
      });
      let val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
      } else if (val === "null") {
        val = null;
      } else {
        val = Number(val);
      }
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports2.inspectOpts ? Boolean(exports2.inspectOpts.colors) : tty.isatty(process.stderr.fd);
    }
    function formatArgs(args) {
      const { namespace: name, useColors: useColors2 } = this;
      if (useColors2) {
        const c = this.color;
        const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
        const prefix = `  ${colorCode};1m${name} \x1B[0m`;
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module2.exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = getDate() + name + " " + args[0];
      }
    }
    function getDate() {
      if (exports2.inspectOpts.hideDate) {
        return "";
      }
      return (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function log(...args) {
      return process.stderr.write(util.formatWithOptions(exports2.inspectOpts, ...args) + "\n");
    }
    function save(namespaces) {
      if (namespaces) {
        process.env.DEBUG = namespaces;
      } else {
        delete process.env.DEBUG;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function init(debug) {
      debug.inspectOpts = {};
      const keys = Object.keys(exports2.inspectOpts);
      for (let i = 0; i < keys.length; i++) {
        debug.inspectOpts[keys[i]] = exports2.inspectOpts[keys[i]];
      }
    }
    module2.exports = require_common()(exports2);
    var { formatters } = module2.exports;
    formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
    };
    formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
  }
});

// node_modules/.pnpm/debug@4.4.1/node_modules/debug/src/index.js
var require_src = __commonJS({
  "node_modules/.pnpm/debug@4.4.1/node_modules/debug/src/index.js"(exports2, module2) {
    "use strict";
    if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
      module2.exports = require_browser();
    } else {
      module2.exports = require_node();
    }
  }
});

// node_modules/.pnpm/koa-compose@4.1.0/node_modules/koa-compose/index.js
var require_koa_compose = __commonJS({
  "node_modules/.pnpm/koa-compose@4.1.0/node_modules/koa-compose/index.js"(exports2, module2) {
    "use strict";
    module2.exports = compose;
    function compose(middleware) {
      if (!Array.isArray(middleware)) throw new TypeError("Middleware stack must be an array!");
      for (const fn of middleware) {
        if (typeof fn !== "function") throw new TypeError("Middleware must be composed of functions!");
      }
      return function(context, next) {
        let index = -1;
        return dispatch(0);
        function dispatch(i) {
          if (i <= index) return Promise.reject(new Error("next() called multiple times"));
          index = i;
          let fn = middleware[i];
          if (i === middleware.length) fn = next;
          if (!fn) return Promise.resolve();
          try {
            return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
          } catch (err) {
            return Promise.reject(err);
          }
        }
      };
    }
  }
});

// node_modules/.pnpm/depd@2.0.0/node_modules/depd/index.js
var require_depd = __commonJS({
  "node_modules/.pnpm/depd@2.0.0/node_modules/depd/index.js"(exports2, module2) {
    "use strict";
    var relative = require("path").relative;
    module2.exports = depd;
    var basePath = process.cwd();
    function containsNamespace(str, namespace) {
      var vals = str.split(/[ ,]+/);
      var ns = String(namespace).toLowerCase();
      for (var i = 0; i < vals.length; i++) {
        var val = vals[i];
        if (val && (val === "*" || val.toLowerCase() === ns)) {
          return true;
        }
      }
      return false;
    }
    function convertDataDescriptorToAccessor(obj, prop, message) {
      var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
      var value = descriptor.value;
      descriptor.get = function getter() {
        return value;
      };
      if (descriptor.writable) {
        descriptor.set = function setter(val) {
          return value = val;
        };
      }
      delete descriptor.value;
      delete descriptor.writable;
      Object.defineProperty(obj, prop, descriptor);
      return descriptor;
    }
    function createArgumentsString(arity) {
      var str = "";
      for (var i = 0; i < arity; i++) {
        str += ", arg" + i;
      }
      return str.substr(2);
    }
    function createStackString(stack) {
      var str = this.name + ": " + this.namespace;
      if (this.message) {
        str += " deprecated " + this.message;
      }
      for (var i = 0; i < stack.length; i++) {
        str += "\n    at " + stack[i].toString();
      }
      return str;
    }
    function depd(namespace) {
      if (!namespace) {
        throw new TypeError("argument namespace is required");
      }
      var stack = getStack();
      var site = callSiteLocation(stack[1]);
      var file = site[0];
      function deprecate(message) {
        log.call(deprecate, message);
      }
      deprecate._file = file;
      deprecate._ignored = isignored(namespace);
      deprecate._namespace = namespace;
      deprecate._traced = istraced(namespace);
      deprecate._warned = /* @__PURE__ */ Object.create(null);
      deprecate.function = wrapfunction;
      deprecate.property = wrapproperty;
      return deprecate;
    }
    function eehaslisteners(emitter, type) {
      var count = typeof emitter.listenerCount !== "function" ? emitter.listeners(type).length : emitter.listenerCount(type);
      return count > 0;
    }
    function isignored(namespace) {
      if (process.noDeprecation) {
        return true;
      }
      var str = process.env.NO_DEPRECATION || "";
      return containsNamespace(str, namespace);
    }
    function istraced(namespace) {
      if (process.traceDeprecation) {
        return true;
      }
      var str = process.env.TRACE_DEPRECATION || "";
      return containsNamespace(str, namespace);
    }
    function log(message, site) {
      var haslisteners = eehaslisteners(process, "deprecation");
      if (!haslisteners && this._ignored) {
        return;
      }
      var caller;
      var callFile;
      var callSite;
      var depSite;
      var i = 0;
      var seen = false;
      var stack = getStack();
      var file = this._file;
      if (site) {
        depSite = site;
        callSite = callSiteLocation(stack[1]);
        callSite.name = depSite.name;
        file = callSite[0];
      } else {
        i = 2;
        depSite = callSiteLocation(stack[i]);
        callSite = depSite;
      }
      for (; i < stack.length; i++) {
        caller = callSiteLocation(stack[i]);
        callFile = caller[0];
        if (callFile === file) {
          seen = true;
        } else if (callFile === this._file) {
          file = this._file;
        } else if (seen) {
          break;
        }
      }
      var key = caller ? depSite.join(":") + "__" + caller.join(":") : void 0;
      if (key !== void 0 && key in this._warned) {
        return;
      }
      this._warned[key] = true;
      var msg = message;
      if (!msg) {
        msg = callSite === depSite || !callSite.name ? defaultMessage(depSite) : defaultMessage(callSite);
      }
      if (haslisteners) {
        var err = DeprecationError(this._namespace, msg, stack.slice(i));
        process.emit("deprecation", err);
        return;
      }
      var format = process.stderr.isTTY ? formatColor : formatPlain;
      var output = format.call(this, msg, caller, stack.slice(i));
      process.stderr.write(output + "\n", "utf8");
    }
    function callSiteLocation(callSite) {
      var file = callSite.getFileName() || "<anonymous>";
      var line = callSite.getLineNumber();
      var colm = callSite.getColumnNumber();
      if (callSite.isEval()) {
        file = callSite.getEvalOrigin() + ", " + file;
      }
      var site = [file, line, colm];
      site.callSite = callSite;
      site.name = callSite.getFunctionName();
      return site;
    }
    function defaultMessage(site) {
      var callSite = site.callSite;
      var funcName = site.name;
      if (!funcName) {
        funcName = "<anonymous@" + formatLocation(site) + ">";
      }
      var context = callSite.getThis();
      var typeName = context && callSite.getTypeName();
      if (typeName === "Object") {
        typeName = void 0;
      }
      if (typeName === "Function") {
        typeName = context.name || typeName;
      }
      return typeName && callSite.getMethodName() ? typeName + "." + funcName : funcName;
    }
    function formatPlain(msg, caller, stack) {
      var timestamp = (/* @__PURE__ */ new Date()).toUTCString();
      var formatted = timestamp + " " + this._namespace + " deprecated " + msg;
      if (this._traced) {
        for (var i = 0; i < stack.length; i++) {
          formatted += "\n    at " + stack[i].toString();
        }
        return formatted;
      }
      if (caller) {
        formatted += " at " + formatLocation(caller);
      }
      return formatted;
    }
    function formatColor(msg, caller, stack) {
      var formatted = "\x1B[36;1m" + this._namespace + "\x1B[22;39m \x1B[33;1mdeprecated\x1B[22;39m \x1B[0m" + msg + "\x1B[39m";
      if (this._traced) {
        for (var i = 0; i < stack.length; i++) {
          formatted += "\n    \x1B[36mat " + stack[i].toString() + "\x1B[39m";
        }
        return formatted;
      }
      if (caller) {
        formatted += " \x1B[36m" + formatLocation(caller) + "\x1B[39m";
      }
      return formatted;
    }
    function formatLocation(callSite) {
      return relative(basePath, callSite[0]) + ":" + callSite[1] + ":" + callSite[2];
    }
    function getStack() {
      var limit = Error.stackTraceLimit;
      var obj = {};
      var prep = Error.prepareStackTrace;
      Error.prepareStackTrace = prepareObjectStackTrace;
      Error.stackTraceLimit = Math.max(10, limit);
      Error.captureStackTrace(obj);
      var stack = obj.stack.slice(1);
      Error.prepareStackTrace = prep;
      Error.stackTraceLimit = limit;
      return stack;
    }
    function prepareObjectStackTrace(obj, stack) {
      return stack;
    }
    function wrapfunction(fn, message) {
      if (typeof fn !== "function") {
        throw new TypeError("argument fn must be a function");
      }
      var args = createArgumentsString(fn.length);
      var stack = getStack();
      var site = callSiteLocation(stack[1]);
      site.name = fn.name;
      var deprecatedfn = new Function(
        "fn",
        "log",
        "deprecate",
        "message",
        "site",
        '"use strict"\nreturn function (' + args + ") {log.call(deprecate, message, site)\nreturn fn.apply(this, arguments)\n}"
      )(fn, log, this, message, site);
      return deprecatedfn;
    }
    function wrapproperty(obj, prop, message) {
      if (!obj || typeof obj !== "object" && typeof obj !== "function") {
        throw new TypeError("argument obj must be object");
      }
      var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
      if (!descriptor) {
        throw new TypeError("must call property on owner object");
      }
      if (!descriptor.configurable) {
        throw new TypeError("property must be configurable");
      }
      var deprecate = this;
      var stack = getStack();
      var site = callSiteLocation(stack[1]);
      site.name = prop;
      if ("value" in descriptor) {
        descriptor = convertDataDescriptorToAccessor(obj, prop, message);
      }
      var get = descriptor.get;
      var set = descriptor.set;
      if (typeof get === "function") {
        descriptor.get = function getter() {
          log.call(deprecate, message, site);
          return get.apply(this, arguments);
        };
      }
      if (typeof set === "function") {
        descriptor.set = function setter() {
          log.call(deprecate, message, site);
          return set.apply(this, arguments);
        };
      }
      Object.defineProperty(obj, prop, descriptor);
    }
    function DeprecationError(namespace, message, stack) {
      var error = new Error();
      var stackString;
      Object.defineProperty(error, "constructor", {
        value: DeprecationError
      });
      Object.defineProperty(error, "message", {
        configurable: true,
        enumerable: false,
        value: message,
        writable: true
      });
      Object.defineProperty(error, "name", {
        enumerable: false,
        configurable: true,
        value: "DeprecationError",
        writable: true
      });
      Object.defineProperty(error, "namespace", {
        configurable: true,
        enumerable: false,
        value: namespace,
        writable: true
      });
      Object.defineProperty(error, "stack", {
        configurable: true,
        enumerable: false,
        get: function() {
          if (stackString !== void 0) {
            return stackString;
          }
          return stackString = createStackString.call(this, stack);
        },
        set: function setter(val) {
          stackString = val;
        }
      });
      return error;
    }
  }
});

// node_modules/.pnpm/setprototypeof@1.2.0/node_modules/setprototypeof/index.js
var require_setprototypeof = __commonJS({
  "node_modules/.pnpm/setprototypeof@1.2.0/node_modules/setprototypeof/index.js"(exports2, module2) {
    "use strict";
    module2.exports = Object.setPrototypeOf || ({ __proto__: [] } instanceof Array ? setProtoOf : mixinProperties);
    function setProtoOf(obj, proto) {
      obj.__proto__ = proto;
      return obj;
    }
    function mixinProperties(obj, proto) {
      for (var prop in proto) {
        if (!Object.prototype.hasOwnProperty.call(obj, prop)) {
          obj[prop] = proto[prop];
        }
      }
      return obj;
    }
  }
});

// node_modules/.pnpm/statuses@2.0.1/node_modules/statuses/codes.json
var require_codes = __commonJS({
  "node_modules/.pnpm/statuses@2.0.1/node_modules/statuses/codes.json"(exports2, module2) {
    module2.exports = {
      "100": "Continue",
      "101": "Switching Protocols",
      "102": "Processing",
      "103": "Early Hints",
      "200": "OK",
      "201": "Created",
      "202": "Accepted",
      "203": "Non-Authoritative Information",
      "204": "No Content",
      "205": "Reset Content",
      "206": "Partial Content",
      "207": "Multi-Status",
      "208": "Already Reported",
      "226": "IM Used",
      "300": "Multiple Choices",
      "301": "Moved Permanently",
      "302": "Found",
      "303": "See Other",
      "304": "Not Modified",
      "305": "Use Proxy",
      "307": "Temporary Redirect",
      "308": "Permanent Redirect",
      "400": "Bad Request",
      "401": "Unauthorized",
      "402": "Payment Required",
      "403": "Forbidden",
      "404": "Not Found",
      "405": "Method Not Allowed",
      "406": "Not Acceptable",
      "407": "Proxy Authentication Required",
      "408": "Request Timeout",
      "409": "Conflict",
      "410": "Gone",
      "411": "Length Required",
      "412": "Precondition Failed",
      "413": "Payload Too Large",
      "414": "URI Too Long",
      "415": "Unsupported Media Type",
      "416": "Range Not Satisfiable",
      "417": "Expectation Failed",
      "418": "I'm a Teapot",
      "421": "Misdirected Request",
      "422": "Unprocessable Entity",
      "423": "Locked",
      "424": "Failed Dependency",
      "425": "Too Early",
      "426": "Upgrade Required",
      "428": "Precondition Required",
      "429": "Too Many Requests",
      "431": "Request Header Fields Too Large",
      "451": "Unavailable For Legal Reasons",
      "500": "Internal Server Error",
      "501": "Not Implemented",
      "502": "Bad Gateway",
      "503": "Service Unavailable",
      "504": "Gateway Timeout",
      "505": "HTTP Version Not Supported",
      "506": "Variant Also Negotiates",
      "507": "Insufficient Storage",
      "508": "Loop Detected",
      "509": "Bandwidth Limit Exceeded",
      "510": "Not Extended",
      "511": "Network Authentication Required"
    };
  }
});

// node_modules/.pnpm/statuses@2.0.1/node_modules/statuses/index.js
var require_statuses = __commonJS({
  "node_modules/.pnpm/statuses@2.0.1/node_modules/statuses/index.js"(exports2, module2) {
    "use strict";
    var codes = require_codes();
    module2.exports = status;
    status.message = codes;
    status.code = createMessageToStatusCodeMap(codes);
    status.codes = createStatusCodeList(codes);
    status.redirect = {
      300: true,
      301: true,
      302: true,
      303: true,
      305: true,
      307: true,
      308: true
    };
    status.empty = {
      204: true,
      205: true,
      304: true
    };
    status.retry = {
      502: true,
      503: true,
      504: true
    };
    function createMessageToStatusCodeMap(codes2) {
      var map = {};
      Object.keys(codes2).forEach(function forEachCode(code) {
        var message = codes2[code];
        var status2 = Number(code);
        map[message.toLowerCase()] = status2;
      });
      return map;
    }
    function createStatusCodeList(codes2) {
      return Object.keys(codes2).map(function mapCode(code) {
        return Number(code);
      });
    }
    function getStatusCode(message) {
      var msg = message.toLowerCase();
      if (!Object.prototype.hasOwnProperty.call(status.code, msg)) {
        throw new Error('invalid status message: "' + message + '"');
      }
      return status.code[msg];
    }
    function getStatusMessage(code) {
      if (!Object.prototype.hasOwnProperty.call(status.message, code)) {
        throw new Error("invalid status code: " + code);
      }
      return status.message[code];
    }
    function status(code) {
      if (typeof code === "number") {
        return getStatusMessage(code);
      }
      if (typeof code !== "string") {
        throw new TypeError("code must be a number or string");
      }
      var n = parseInt(code, 10);
      if (!isNaN(n)) {
        return getStatusMessage(n);
      }
      return getStatusCode(code);
    }
  }
});

// node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits_browser.js
var require_inherits_browser = __commonJS({
  "node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits_browser.js"(exports2, module2) {
    "use strict";
    if (typeof Object.create === "function") {
      module2.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        }
      };
    } else {
      module2.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function() {
          };
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }
      };
    }
  }
});

// node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits.js
var require_inherits = __commonJS({
  "node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits.js"(exports2, module2) {
    "use strict";
    try {
      util = require("util");
      if (typeof util.inherits !== "function") throw "";
      module2.exports = util.inherits;
    } catch (e) {
      module2.exports = require_inherits_browser();
    }
    var util;
  }
});

// node_modules/.pnpm/toidentifier@1.0.1/node_modules/toidentifier/index.js
var require_toidentifier = __commonJS({
  "node_modules/.pnpm/toidentifier@1.0.1/node_modules/toidentifier/index.js"(exports2, module2) {
    "use strict";
    module2.exports = toIdentifier;
    function toIdentifier(str) {
      return str.split(" ").map(function(token) {
        return token.slice(0, 1).toUpperCase() + token.slice(1);
      }).join("").replace(/[^ _0-9a-z]/gi, "");
    }
  }
});

// node_modules/.pnpm/http-errors@2.0.0/node_modules/http-errors/index.js
var require_http_errors = __commonJS({
  "node_modules/.pnpm/http-errors@2.0.0/node_modules/http-errors/index.js"(exports2, module2) {
    "use strict";
    var deprecate = require_depd()("http-errors");
    var setPrototypeOf = require_setprototypeof();
    var statuses = require_statuses();
    var inherits = require_inherits();
    var toIdentifier = require_toidentifier();
    module2.exports = createError;
    module2.exports.HttpError = createHttpErrorConstructor();
    module2.exports.isHttpError = createIsHttpErrorFunction(module2.exports.HttpError);
    populateConstructorExports(module2.exports, statuses.codes, module2.exports.HttpError);
    function codeClass(status) {
      return Number(String(status).charAt(0) + "00");
    }
    function createError() {
      var err;
      var msg;
      var status = 500;
      var props = {};
      for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        var type = typeof arg;
        if (type === "object" && arg instanceof Error) {
          err = arg;
          status = err.status || err.statusCode || status;
        } else if (type === "number" && i === 0) {
          status = arg;
        } else if (type === "string") {
          msg = arg;
        } else if (type === "object") {
          props = arg;
        } else {
          throw new TypeError("argument #" + (i + 1) + " unsupported type " + type);
        }
      }
      if (typeof status === "number" && (status < 400 || status >= 600)) {
        deprecate("non-error status code; use only 4xx or 5xx status codes");
      }
      if (typeof status !== "number" || !statuses.message[status] && (status < 400 || status >= 600)) {
        status = 500;
      }
      var HttpError = createError[status] || createError[codeClass(status)];
      if (!err) {
        err = HttpError ? new HttpError(msg) : new Error(msg || statuses.message[status]);
        Error.captureStackTrace(err, createError);
      }
      if (!HttpError || !(err instanceof HttpError) || err.status !== status) {
        err.expose = status < 500;
        err.status = err.statusCode = status;
      }
      for (var key in props) {
        if (key !== "status" && key !== "statusCode") {
          err[key] = props[key];
        }
      }
      return err;
    }
    function createHttpErrorConstructor() {
      function HttpError() {
        throw new TypeError("cannot construct abstract class");
      }
      inherits(HttpError, Error);
      return HttpError;
    }
    function createClientErrorConstructor(HttpError, name, code) {
      var className = toClassName(name);
      function ClientError(message) {
        var msg = message != null ? message : statuses.message[code];
        var err = new Error(msg);
        Error.captureStackTrace(err, ClientError);
        setPrototypeOf(err, ClientError.prototype);
        Object.defineProperty(err, "message", {
          enumerable: true,
          configurable: true,
          value: msg,
          writable: true
        });
        Object.defineProperty(err, "name", {
          enumerable: false,
          configurable: true,
          value: className,
          writable: true
        });
        return err;
      }
      inherits(ClientError, HttpError);
      nameFunc(ClientError, className);
      ClientError.prototype.status = code;
      ClientError.prototype.statusCode = code;
      ClientError.prototype.expose = true;
      return ClientError;
    }
    function createIsHttpErrorFunction(HttpError) {
      return function isHttpError(val) {
        if (!val || typeof val !== "object") {
          return false;
        }
        if (val instanceof HttpError) {
          return true;
        }
        return val instanceof Error && typeof val.expose === "boolean" && typeof val.statusCode === "number" && val.status === val.statusCode;
      };
    }
    function createServerErrorConstructor(HttpError, name, code) {
      var className = toClassName(name);
      function ServerError(message) {
        var msg = message != null ? message : statuses.message[code];
        var err = new Error(msg);
        Error.captureStackTrace(err, ServerError);
        setPrototypeOf(err, ServerError.prototype);
        Object.defineProperty(err, "message", {
          enumerable: true,
          configurable: true,
          value: msg,
          writable: true
        });
        Object.defineProperty(err, "name", {
          enumerable: false,
          configurable: true,
          value: className,
          writable: true
        });
        return err;
      }
      inherits(ServerError, HttpError);
      nameFunc(ServerError, className);
      ServerError.prototype.status = code;
      ServerError.prototype.statusCode = code;
      ServerError.prototype.expose = false;
      return ServerError;
    }
    function nameFunc(func, name) {
      var desc = Object.getOwnPropertyDescriptor(func, "name");
      if (desc && desc.configurable) {
        desc.value = name;
        Object.defineProperty(func, "name", desc);
      }
    }
    function populateConstructorExports(exports3, codes, HttpError) {
      codes.forEach(function forEachCode(code) {
        var CodeError;
        var name = toIdentifier(statuses.message[code]);
        switch (codeClass(code)) {
          case 400:
            CodeError = createClientErrorConstructor(HttpError, name, code);
            break;
          case 500:
            CodeError = createServerErrorConstructor(HttpError, name, code);
            break;
        }
        if (CodeError) {
          exports3[code] = CodeError;
          exports3[name] = CodeError;
        }
      });
    }
    function toClassName(name) {
      return name.substr(-5) !== "Error" ? name + "Error" : name;
    }
  }
});

// node_modules/.pnpm/path-to-regexp@8.2.0/node_modules/path-to-regexp/dist/index.js
var require_dist = __commonJS({
  "node_modules/.pnpm/path-to-regexp@8.2.0/node_modules/path-to-regexp/dist/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TokenData = void 0;
    exports2.parse = parse;
    exports2.compile = compile;
    exports2.match = match;
    exports2.pathToRegexp = pathToRegexp;
    exports2.stringify = stringify;
    var DEFAULT_DELIMITER = "/";
    var NOOP_VALUE = (value) => value;
    var ID_START = /^[$_\p{ID_Start}]$/u;
    var ID_CONTINUE = /^[$\u200c\u200d\p{ID_Continue}]$/u;
    var DEBUG_URL = "https://git.new/pathToRegexpError";
    var SIMPLE_TOKENS = {
      // Groups.
      "{": "{",
      "}": "}",
      // Reserved.
      "(": "(",
      ")": ")",
      "[": "[",
      "]": "]",
      "+": "+",
      "?": "?",
      "!": "!"
    };
    function escapeText(str) {
      return str.replace(/[{}()\[\]+?!:*]/g, "\\$&");
    }
    function escape(str) {
      return str.replace(/[.+*?^${}()[\]|/\\]/g, "\\$&");
    }
    function* lexer(str) {
      const chars = [...str];
      let i = 0;
      function name() {
        let value = "";
        if (ID_START.test(chars[++i])) {
          value += chars[i];
          while (ID_CONTINUE.test(chars[++i])) {
            value += chars[i];
          }
        } else if (chars[i] === '"') {
          let pos = i;
          while (i < chars.length) {
            if (chars[++i] === '"') {
              i++;
              pos = 0;
              break;
            }
            if (chars[i] === "\\") {
              value += chars[++i];
            } else {
              value += chars[i];
            }
          }
          if (pos) {
            throw new TypeError(`Unterminated quote at ${pos}: ${DEBUG_URL}`);
          }
        }
        if (!value) {
          throw new TypeError(`Missing parameter name at ${i}: ${DEBUG_URL}`);
        }
        return value;
      }
      while (i < chars.length) {
        const value = chars[i];
        const type = SIMPLE_TOKENS[value];
        if (type) {
          yield { type, index: i++, value };
        } else if (value === "\\") {
          yield { type: "ESCAPED", index: i++, value: chars[i++] };
        } else if (value === ":") {
          const value2 = name();
          yield { type: "PARAM", index: i, value: value2 };
        } else if (value === "*") {
          const value2 = name();
          yield { type: "WILDCARD", index: i, value: value2 };
        } else {
          yield { type: "CHAR", index: i, value: chars[i++] };
        }
      }
      return { type: "END", index: i, value: "" };
    }
    var Iter = class {
      constructor(tokens) {
        this.tokens = tokens;
      }
      peek() {
        if (!this._peek) {
          const next = this.tokens.next();
          this._peek = next.value;
        }
        return this._peek;
      }
      tryConsume(type) {
        const token = this.peek();
        if (token.type !== type)
          return;
        this._peek = void 0;
        return token.value;
      }
      consume(type) {
        const value = this.tryConsume(type);
        if (value !== void 0)
          return value;
        const { type: nextType, index } = this.peek();
        throw new TypeError(`Unexpected ${nextType} at ${index}, expected ${type}: ${DEBUG_URL}`);
      }
      text() {
        let result = "";
        let value;
        while (value = this.tryConsume("CHAR") || this.tryConsume("ESCAPED")) {
          result += value;
        }
        return result;
      }
    };
    var TokenData = class {
      constructor(tokens) {
        this.tokens = tokens;
      }
    };
    exports2.TokenData = TokenData;
    function parse(str, options = {}) {
      const { encodePath = NOOP_VALUE } = options;
      const it = new Iter(lexer(str));
      function consume(endType) {
        const tokens2 = [];
        while (true) {
          const path = it.text();
          if (path)
            tokens2.push({ type: "text", value: encodePath(path) });
          const param = it.tryConsume("PARAM");
          if (param) {
            tokens2.push({
              type: "param",
              name: param
            });
            continue;
          }
          const wildcard = it.tryConsume("WILDCARD");
          if (wildcard) {
            tokens2.push({
              type: "wildcard",
              name: wildcard
            });
            continue;
          }
          const open = it.tryConsume("{");
          if (open) {
            tokens2.push({
              type: "group",
              tokens: consume("}")
            });
            continue;
          }
          it.consume(endType);
          return tokens2;
        }
      }
      const tokens = consume("END");
      return new TokenData(tokens);
    }
    function compile(path, options = {}) {
      const { encode = encodeURIComponent, delimiter = DEFAULT_DELIMITER } = options;
      const data = path instanceof TokenData ? path : parse(path, options);
      const fn = tokensToFunction(data.tokens, delimiter, encode);
      return function path2(data2 = {}) {
        const [path3, ...missing] = fn(data2);
        if (missing.length) {
          throw new TypeError(`Missing parameters: ${missing.join(", ")}`);
        }
        return path3;
      };
    }
    function tokensToFunction(tokens, delimiter, encode) {
      const encoders = tokens.map((token) => tokenToFunction(token, delimiter, encode));
      return (data) => {
        const result = [""];
        for (const encoder of encoders) {
          const [value, ...extras] = encoder(data);
          result[0] += value;
          result.push(...extras);
        }
        return result;
      };
    }
    function tokenToFunction(token, delimiter, encode) {
      if (token.type === "text")
        return () => [token.value];
      if (token.type === "group") {
        const fn = tokensToFunction(token.tokens, delimiter, encode);
        return (data) => {
          const [value, ...missing] = fn(data);
          if (!missing.length)
            return [value];
          return [""];
        };
      }
      const encodeValue = encode || NOOP_VALUE;
      if (token.type === "wildcard" && encode !== false) {
        return (data) => {
          const value = data[token.name];
          if (value == null)
            return ["", token.name];
          if (!Array.isArray(value) || value.length === 0) {
            throw new TypeError(`Expected "${token.name}" to be a non-empty array`);
          }
          return [
            value.map((value2, index) => {
              if (typeof value2 !== "string") {
                throw new TypeError(`Expected "${token.name}/${index}" to be a string`);
              }
              return encodeValue(value2);
            }).join(delimiter)
          ];
        };
      }
      return (data) => {
        const value = data[token.name];
        if (value == null)
          return ["", token.name];
        if (typeof value !== "string") {
          throw new TypeError(`Expected "${token.name}" to be a string`);
        }
        return [encodeValue(value)];
      };
    }
    function match(path, options = {}) {
      const { decode = decodeURIComponent, delimiter = DEFAULT_DELIMITER } = options;
      const { regexp, keys } = pathToRegexp(path, options);
      const decoders = keys.map((key) => {
        if (decode === false)
          return NOOP_VALUE;
        if (key.type === "param")
          return decode;
        return (value) => value.split(delimiter).map(decode);
      });
      return function match2(input) {
        const m = regexp.exec(input);
        if (!m)
          return false;
        const path2 = m[0];
        const params = /* @__PURE__ */ Object.create(null);
        for (let i = 1; i < m.length; i++) {
          if (m[i] === void 0)
            continue;
          const key = keys[i - 1];
          const decoder = decoders[i - 1];
          params[key.name] = decoder(m[i]);
        }
        return { path: path2, params };
      };
    }
    function pathToRegexp(path, options = {}) {
      const { delimiter = DEFAULT_DELIMITER, end = true, sensitive = false, trailing = true } = options;
      const keys = [];
      const sources = [];
      const flags = sensitive ? "" : "i";
      const paths = Array.isArray(path) ? path : [path];
      const items = paths.map((path2) => path2 instanceof TokenData ? path2 : parse(path2, options));
      for (const { tokens } of items) {
        for (const seq of flatten(tokens, 0, [])) {
          const regexp2 = sequenceToRegExp(seq, delimiter, keys);
          sources.push(regexp2);
        }
      }
      let pattern = `^(?:${sources.join("|")})`;
      if (trailing)
        pattern += `(?:${escape(delimiter)}$)?`;
      pattern += end ? "$" : `(?=${escape(delimiter)}|$)`;
      const regexp = new RegExp(pattern, flags);
      return { regexp, keys };
    }
    function* flatten(tokens, index, init) {
      if (index === tokens.length) {
        return yield init;
      }
      const token = tokens[index];
      if (token.type === "group") {
        const fork = init.slice();
        for (const seq of flatten(token.tokens, 0, fork)) {
          yield* flatten(tokens, index + 1, seq);
        }
      } else {
        init.push(token);
      }
      yield* flatten(tokens, index + 1, init);
    }
    function sequenceToRegExp(tokens, delimiter, keys) {
      let result = "";
      let backtrack = "";
      let isSafeSegmentParam = true;
      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (token.type === "text") {
          result += escape(token.value);
          backtrack += token.value;
          isSafeSegmentParam || (isSafeSegmentParam = token.value.includes(delimiter));
          continue;
        }
        if (token.type === "param" || token.type === "wildcard") {
          if (!isSafeSegmentParam && !backtrack) {
            throw new TypeError(`Missing text after "${token.name}": ${DEBUG_URL}`);
          }
          if (token.type === "param") {
            result += `(${negate(delimiter, isSafeSegmentParam ? "" : backtrack)}+)`;
          } else {
            result += `([\\s\\S]+)`;
          }
          keys.push(token);
          backtrack = "";
          isSafeSegmentParam = false;
          continue;
        }
      }
      return result;
    }
    function negate(delimiter, backtrack) {
      if (backtrack.length < 2) {
        if (delimiter.length < 2)
          return `[^${escape(delimiter + backtrack)}]`;
        return `(?:(?!${escape(delimiter)})[^${escape(backtrack)}])`;
      }
      if (delimiter.length < 2) {
        return `(?:(?!${escape(backtrack)})[^${escape(delimiter)}])`;
      }
      return `(?:(?!${escape(backtrack)}|${escape(delimiter)})[\\s\\S])`;
    }
    function stringify(data) {
      return data.tokens.map(function stringifyToken(token, index, tokens) {
        if (token.type === "text")
          return escapeText(token.value);
        if (token.type === "group") {
          return `{${token.tokens.map(stringifyToken).join("")}}`;
        }
        const isSafe = isNameSafe(token.name) && isNextNameSafe(tokens[index + 1]);
        const key = isSafe ? token.name : JSON.stringify(token.name);
        if (token.type === "param")
          return `:${key}`;
        if (token.type === "wildcard")
          return `*${key}`;
        throw new TypeError(`Unexpected token: ${token}`);
      }).join("");
    }
    function isNameSafe(name) {
      const [first, ...rest] = name;
      if (!ID_START.test(first))
        return false;
      return rest.every((char) => ID_CONTINUE.test(char));
    }
    function isNextNameSafe(token) {
      if ((token === null || token === void 0 ? void 0 : token.type) !== "text")
        return true;
      return !ID_CONTINUE.test(token.value[0]);
    }
  }
});

// node_modules/.pnpm/@koa+router@14.0.0/node_modules/@koa/router/lib/layer.js
var require_layer = __commonJS({
  "node_modules/.pnpm/@koa+router@14.0.0/node_modules/@koa/router/lib/layer.js"(exports2, module2) {
    "use strict";
    var { parse: parseUrl, format: formatUrl } = require("url");
    var { pathToRegexp, compile, parse } = require_dist();
    module2.exports = class Layer {
      /**
       * Initialize a new routing Layer with given `method`, `path`, and `middleware`.
       *
       * @param {String|RegExp} path Path string or regular expression.
       * @param {Array} methods Array of HTTP verbs.
       * @param {Array} middleware Layer callback/middleware or series of.
       * @param {Object=} opts
       * @param {String=} opts.name route name
       * @param {String=} opts.sensitive case sensitive (default: false)
       * @param {String=} opts.strict require the trailing slash (default: false)
       * @param {Boolean=} opts.pathAsRegExp if true, treat `path` as a regular expression
       * @returns {Layer}
       * @private
       */
      constructor(path, methods, middleware, opts = {}) {
        this.opts = opts;
        this.name = this.opts.name || null;
        this.methods = [];
        for (const method of methods) {
          const l = this.methods.push(method.toUpperCase());
          if (this.methods[l - 1] === "GET") this.methods.unshift("HEAD");
        }
        this.stack = Array.isArray(middleware) ? middleware : [middleware];
        for (let i = 0; i < this.stack.length; i++) {
          const fn = this.stack[i];
          const type = typeof fn;
          if (type !== "function")
            throw new Error(
              `${methods.toString()} \`${this.opts.name || path}\`: \`middleware\` must be a function, not \`${type}\``
            );
        }
        this.path = path;
        this.paramNames = [];
        if (this.opts.pathAsRegExp === true) {
          this.regexp = new RegExp(path);
        } else if (this.path) {
          if ("strict" in this.opts) {
            this.opts.trailing = this.opts.strict !== true;
          }
          const { regexp, keys } = pathToRegexp(this.path, this.opts);
          this.regexp = regexp;
          this.paramNames = keys;
        }
      }
      /**
       * Returns whether request `path` matches route.
       *
       * @param {String} path
       * @returns {Boolean}
       * @private
       */
      match(path) {
        return this.regexp.test(path);
      }
      /**
       * Returns map of URL parameters for given `path` and `paramNames`.
       *
       * @param {String} path
       * @param {Array.<String>} captures
       * @param {Object=} params
       * @returns {Object}
       * @private
       */
      params(path, captures, params = {}) {
        for (let len = captures.length, i = 0; i < len; i++) {
          if (this.paramNames[i]) {
            const c = captures[i];
            if (c && c.length > 0)
              params[this.paramNames[i].name] = c ? safeDecodeURIComponent(c) : c;
          }
        }
        return params;
      }
      /**
       * Returns array of regexp url path captures.
       *
       * @param {String} path
       * @returns {Array.<String>}
       * @private
       */
      captures(path) {
        return this.opts.ignoreCaptures ? [] : path.match(this.regexp).slice(1);
      }
      /**
       * Generate URL for route using given `params`.
       *
       * @example
       *
       * ```javascript
       * const route = new Layer('/users/:id', ['GET'], fn);
       *
       * route.url({ id: 123 }); // => "/users/123"
       * ```
       *
       * @param {Object} params url parameters
       * @returns {String}
       * @private
       */
      url(params, options) {
        let args = params;
        const url = this.path.replace(/\(\.\*\)/g, "");
        if (typeof params !== "object") {
          args = Array.prototype.slice.call(arguments);
          if (typeof args[args.length - 1] === "object") {
            options = args[args.length - 1];
            args = args.slice(0, -1);
          }
        }
        const toPath = compile(url, { encode: encodeURIComponent, ...options });
        let replaced;
        const { tokens } = parse(url);
        let replace = {};
        if (Array.isArray(args)) {
          for (let len = tokens.length, i = 0, j = 0; i < len; i++) {
            if (tokens[i].name) {
              replace[tokens[i].name] = args[j++];
            }
          }
        } else if (tokens.some((token) => token.name)) {
          replace = params;
        } else if (!options) {
          options = params;
        }
        for (const [key, value] of Object.entries(replace)) {
          replace[key] = String(value);
        }
        replaced = toPath(replace);
        if (options && options.query) {
          replaced = parseUrl(replaced);
          if (typeof options.query === "string") {
            replaced.search = options.query;
          } else {
            replaced.search = void 0;
            replaced.query = options.query;
          }
          return formatUrl(replaced);
        }
        return replaced;
      }
      /**
       * Run validations on route named parameters.
       *
       * @example
       *
       * ```javascript
       * router
       *   .param('user', function (id, ctx, next) {
       *     ctx.user = users[id];
       *     if (!ctx.user) return ctx.status = 404;
       *     next();
       *   })
       *   .get('/users/:user', function (ctx, next) {
       *     ctx.body = ctx.user;
       *   });
       * ```
       *
       * @param {String} param
       * @param {Function} middleware
       * @returns {Layer}
       * @private
       */
      param(param, fn) {
        const { stack } = this;
        const params = this.paramNames;
        const middleware = function(ctx, next) {
          return fn.call(this, ctx.params[param], ctx, next);
        };
        middleware.param = param;
        const names = params.map(function(p) {
          return p.name;
        });
        const x = names.indexOf(param);
        if (x > -1) {
          stack.some((fn2, i) => {
            if (!fn2.param || names.indexOf(fn2.param) > x) {
              stack.splice(i, 0, middleware);
              return true;
            }
          });
        }
        return this;
      }
      /**
       * Prefix route path.
       *
       * @param {String} prefix
       * @returns {Layer}
       * @private
       */
      setPrefix(prefix) {
        if (this.path) {
          this.path = this.path !== "/" || this.opts.strict === true ? `${prefix}${this.path}` : prefix;
          if (this.opts.pathAsRegExp === true || prefix instanceof RegExp) {
            this.regexp = new RegExp(this.path);
          } else if (this.path) {
            const { regexp, keys } = pathToRegexp(this.path, this.opts);
            this.regexp = regexp;
            this.paramNames = keys;
          }
        }
        return this;
      }
    };
    function safeDecodeURIComponent(text) {
      try {
        return decodeURIComponent(text.replace(/\+/g, " "));
      } catch {
        return text;
      }
    }
  }
});

// node_modules/.pnpm/@koa+router@14.0.0/node_modules/@koa/router/lib/router.js
var require_router = __commonJS({
  "node_modules/.pnpm/@koa+router@14.0.0/node_modules/@koa/router/lib/router.js"(exports2, module2) {
    "use strict";
    var http = require("http");
    var debug = require_src()("koa-router");
    var compose = require_koa_compose();
    var HttpError = require_http_errors();
    var { pathToRegexp } = require_dist();
    var Layer = require_layer();
    var methods = http.METHODS.map((method) => method.toLowerCase());
    var Router3 = class _Router {
      /**
       * Create a new router.
       *
       * @example
       *
       * Basic usage:
       *
       * ```javascript
       * const Koa = require('koa');
       * const Router = require('@koa/router');
       *
       * const app = new Koa();
       * const router = new Router();
       *
       * router.get('/', (ctx, next) => {
       *   // ctx.router available
       * });
       *
       * app
       *   .use(router.routes())
       *   .use(router.allowedMethods());
       * ```
       *
       * @alias module:koa-router
       * @param {Object=} opts
       * @param {Boolean=false} opts.exclusive only run last matched route's controller when there are multiple matches
       * @param {String=} opts.prefix prefix router paths
       * @param {String|RegExp=} opts.host host for router match
       * @constructor
       */
      constructor(opts = {}) {
        if (!(this instanceof _Router)) return new _Router(opts);
        this.opts = opts;
        this.methods = this.opts.methods || [
          "HEAD",
          "OPTIONS",
          "GET",
          "PUT",
          "PATCH",
          "POST",
          "DELETE"
        ];
        this.exclusive = Boolean(this.opts.exclusive);
        this.params = {};
        this.stack = [];
        this.host = this.opts.host;
      }
      /**
       * Generate URL from url pattern and given `params`.
       *
       * @example
       *
       * ```javascript
       * const url = Router.url('/users/:id', {id: 1});
       * // => "/users/1"
       * ```
       *
       * @param {String} path url pattern
       * @param {Object} params url parameters
       * @returns {String}
       */
      static url(path, ...args) {
        return Layer.prototype.url.apply({ path }, args);
      }
      /**
       * Use given middleware.
       *
       * Middleware run in the order they are defined by `.use()`. They are invoked
       * sequentially, requests start at the first middleware and work their way
       * "down" the middleware stack.
       *
       * @example
       *
       * ```javascript
       * // session middleware will run before authorize
       * router
       *   .use(session())
       *   .use(authorize());
       *
       * // use middleware only with given path
       * router.use('/users', userAuth());
       *
       * // or with an array of paths
       * router.use(['/users', '/admin'], userAuth());
       *
       * app.use(router.routes());
       * ```
       *
       * @param {String=} path
       * @param {Function} middleware
       * @param {Function=} ...
       * @returns {Router}
       */
      use(...middleware) {
        const router2 = this;
        let path;
        if (Array.isArray(middleware[0]) && typeof middleware[0][0] === "string") {
          const arrPaths = middleware[0];
          for (const p of arrPaths) {
            router2.use.apply(router2, [p, ...middleware.slice(1)]);
          }
          return this;
        }
        const hasPath = typeof middleware[0] === "string";
        if (hasPath) path = middleware.shift();
        for (const m of middleware) {
          if (m.router) {
            const cloneRouter = Object.assign(
              Object.create(_Router.prototype),
              m.router,
              {
                stack: [...m.router.stack]
              }
            );
            for (let j = 0; j < cloneRouter.stack.length; j++) {
              const nestedLayer = cloneRouter.stack[j];
              const cloneLayer = Object.assign(
                Object.create(Layer.prototype),
                nestedLayer
              );
              if (path) cloneLayer.setPrefix(path);
              if (router2.opts.prefix) cloneLayer.setPrefix(router2.opts.prefix);
              router2.stack.push(cloneLayer);
              cloneRouter.stack[j] = cloneLayer;
            }
            if (router2.params) {
              const routerParams = Object.keys(router2.params);
              for (const key of routerParams) {
                cloneRouter.param(key, router2.params[key]);
              }
            }
          } else {
            const { keys } = pathToRegexp(router2.opts.prefix || "", router2.opts);
            const routerPrefixHasParam = Boolean(
              router2.opts.prefix && keys.length > 0
            );
            router2.register(path || "([^/]*)", [], m, {
              end: false,
              ignoreCaptures: !hasPath && !routerPrefixHasParam,
              pathAsRegExp: true
            });
          }
        }
        return this;
      }
      /**
       * Set the path prefix for a Router instance that was already initialized.
       *
       * @example
       *
       * ```javascript
       * router.prefix('/things/:thing_id')
       * ```
       *
       * @param {String} prefix
       * @returns {Router}
       */
      prefix(prefix) {
        prefix = prefix.replace(/\/$/, "");
        this.opts.prefix = prefix;
        for (let i = 0; i < this.stack.length; i++) {
          const route = this.stack[i];
          route.setPrefix(prefix);
        }
        return this;
      }
      /**
       * Returns router middleware which dispatches a route matching the request.
       *
       * @returns {Function}
       */
      middleware() {
        const router2 = this;
        const dispatch = (ctx, next) => {
          debug("%s %s", ctx.method, ctx.path);
          const hostMatched = router2.matchHost(ctx.host);
          if (!hostMatched) {
            return next();
          }
          const path = router2.opts.routerPath || ctx.newRouterPath || ctx.path || ctx.routerPath;
          const matched = router2.match(path, ctx.method);
          if (ctx.matched) {
            ctx.matched.push.apply(ctx.matched, matched.path);
          } else {
            ctx.matched = matched.path;
          }
          ctx.router = router2;
          if (!matched.route) return next();
          const matchedLayers = matched.pathAndMethod;
          const mostSpecificLayer = matchedLayers[matchedLayers.length - 1];
          ctx._matchedRoute = mostSpecificLayer.path;
          if (mostSpecificLayer.name) {
            ctx._matchedRouteName = mostSpecificLayer.name;
          }
          const layerChain = (router2.exclusive ? [mostSpecificLayer] : matchedLayers).reduce((memo, layer) => {
            memo.push((ctx2, next2) => {
              ctx2.captures = layer.captures(path, ctx2.captures);
              ctx2.request.params = layer.params(path, ctx2.captures, ctx2.params);
              ctx2.params = ctx2.request.params;
              ctx2.routerPath = layer.path;
              ctx2.routerName = layer.name;
              ctx2._matchedRoute = layer.path;
              if (layer.name) {
                ctx2._matchedRouteName = layer.name;
              }
              return next2();
            });
            return [...memo, ...layer.stack];
          }, []);
          return compose(layerChain)(ctx, next);
        };
        dispatch.router = this;
        return dispatch;
      }
      routes() {
        return this.middleware();
      }
      /**
       * Returns separate middleware for responding to `OPTIONS` requests with
       * an `Allow` header containing the allowed methods, as well as responding
       * with `405 Method Not Allowed` and `501 Not Implemented` as appropriate.
       *
       * @example
       *
       * ```javascript
       * const Koa = require('koa');
       * const Router = require('@koa/router');
       *
       * const app = new Koa();
       * const router = new Router();
       *
       * app.use(router.routes());
       * app.use(router.allowedMethods());
       * ```
       *
       * **Example with [Boom](https://github.com/hapijs/boom)**
       *
       * ```javascript
       * const Koa = require('koa');
       * const Router = require('@koa/router');
       * const Boom = require('boom');
       *
       * const app = new Koa();
       * const router = new Router();
       *
       * app.use(router.routes());
       * app.use(router.allowedMethods({
       *   throw: true,
       *   notImplemented: () => new Boom.notImplemented(),
       *   methodNotAllowed: () => new Boom.methodNotAllowed()
       * }));
       * ```
       *
       * @param {Object=} options
       * @param {Boolean=} options.throw throw error instead of setting status and header
       * @param {Function=} options.notImplemented throw the returned value in place of the default NotImplemented error
       * @param {Function=} options.methodNotAllowed throw the returned value in place of the default MethodNotAllowed error
       * @returns {Function}
       */
      allowedMethods(options = {}) {
        const implemented = this.methods;
        return (ctx, next) => {
          return next().then(() => {
            const allowed = {};
            if (ctx.matched && (!ctx.status || ctx.status === 404)) {
              for (let i = 0; i < ctx.matched.length; i++) {
                const route = ctx.matched[i];
                for (let j = 0; j < route.methods.length; j++) {
                  const method = route.methods[j];
                  allowed[method] = method;
                }
              }
              const allowedArr = Object.keys(allowed);
              if (!implemented.includes(ctx.method)) {
                if (options.throw) {
                  const notImplementedThrowable = typeof options.notImplemented === "function" ? options.notImplemented() : new HttpError.NotImplemented();
                  throw notImplementedThrowable;
                } else {
                  ctx.status = 501;
                  ctx.set("Allow", allowedArr.join(", "));
                }
              } else if (allowedArr.length > 0) {
                if (ctx.method === "OPTIONS") {
                  ctx.status = 200;
                  ctx.body = "";
                  ctx.set("Allow", allowedArr.join(", "));
                } else if (!allowed[ctx.method]) {
                  if (options.throw) {
                    const notAllowedThrowable = typeof options.methodNotAllowed === "function" ? options.methodNotAllowed() : new HttpError.MethodNotAllowed();
                    throw notAllowedThrowable;
                  } else {
                    ctx.status = 405;
                    ctx.set("Allow", allowedArr.join(", "));
                  }
                }
              }
            }
          });
        };
      }
      /**
       * Register route with all methods.
       *
       * @param {String} name Optional.
       * @param {String} path
       * @param {Function=} middleware You may also pass multiple middleware.
       * @param {Function} callback
       * @returns {Router}
       */
      all(name, path, middleware) {
        if (typeof path === "string" || path instanceof RegExp) {
          middleware = Array.prototype.slice.call(arguments, 2);
        } else {
          middleware = Array.prototype.slice.call(arguments, 1);
          path = name;
          name = null;
        }
        if (typeof path !== "string" && !(path instanceof RegExp) && (!Array.isArray(path) || path.length === 0))
          throw new Error("You have to provide a path when adding an all handler");
        const opts = {
          name,
          pathAsRegExp: path instanceof RegExp
        };
        this.register(path, methods, middleware, { ...this.opts, ...opts });
        return this;
      }
      /**
       * Redirect `source` to `destination` URL with optional 30x status `code`.
       *
       * Both `source` and `destination` can be route names.
       *
       * ```javascript
       * router.redirect('/login', 'sign-in');
       * ```
       *
       * This is equivalent to:
       *
       * ```javascript
       * router.all('/login', ctx => {
       *   ctx.redirect('/sign-in');
       *   ctx.status = 301;
       * });
       * ```
       *
       * @param {String} source URL or route name.
       * @param {String} destination URL or route name.
       * @param {Number=} code HTTP status code (default: 301).
       * @returns {Router}
       */
      redirect(source, destination, code) {
        if (typeof source === "symbol" || source[0] !== "/") {
          source = this.url(source);
          if (source instanceof Error) throw source;
        }
        if (typeof destination === "symbol" || destination[0] !== "/" && !destination.includes("://")) {
          destination = this.url(destination);
          if (destination instanceof Error) throw destination;
        }
        return this.all(source, (ctx) => {
          ctx.redirect(destination);
          ctx.status = code || 301;
        });
      }
      /**
       * Create and register a route.
       *
       * @param {String} path Path string.
       * @param {Array.<String>} methods Array of HTTP verbs.
       * @param {Function} middleware Multiple middleware also accepted.
       * @returns {Layer}
       * @private
       */
      register(path, methods2, middleware, newOpts = {}) {
        const router2 = this;
        const { stack } = this;
        const opts = { ...this.opts, ...newOpts };
        if (Array.isArray(path)) {
          for (const curPath of path) {
            router2.register.call(router2, curPath, methods2, middleware, opts);
          }
          return this;
        }
        const route = new Layer(path, methods2, middleware, {
          end: opts.end === false ? opts.end : true,
          name: opts.name,
          sensitive: opts.sensitive || false,
          strict: opts.strict || false,
          prefix: opts.prefix || "",
          ignoreCaptures: opts.ignoreCaptures,
          pathAsRegExp: opts.pathAsRegExp
        });
        if (this.opts.prefix) {
          route.setPrefix(this.opts.prefix);
        }
        for (let i = 0; i < Object.keys(this.params).length; i++) {
          const param = Object.keys(this.params)[i];
          route.param(param, this.params[param]);
        }
        stack.push(route);
        debug("defined route %s %s", route.methods, route.path);
        return route;
      }
      /**
       * Lookup route with given `name`.
       *
       * @param {String} name
       * @returns {Layer|false}
       */
      route(name) {
        const routes = this.stack;
        for (let len = routes.length, i = 0; i < len; i++) {
          if (routes[i].name && routes[i].name === name) return routes[i];
        }
        return false;
      }
      /**
       * Generate URL for route. Takes a route name and map of named `params`.
       *
       * @example
       *
       * ```javascript
       * router.get('user', '/users/:id', (ctx, next) => {
       *   // ...
       * });
       *
       * router.url('user', 3);
       * // => "/users/3"
       *
       * router.url('user', { id: 3 });
       * // => "/users/3"
       *
       * router.use((ctx, next) => {
       *   // redirect to named route
       *   ctx.redirect(ctx.router.url('sign-in'));
       * })
       *
       * router.url('user', { id: 3 }, { query: { limit: 1 } });
       * // => "/users/3?limit=1"
       *
       * router.url('user', { id: 3 }, { query: "limit=1" });
       * // => "/users/3?limit=1"
       * ```
       *
       * @param {String} name route name
       * @param {Object} params url parameters
       * @param {Object} [options] options parameter
       * @param {Object|String} [options.query] query options
       * @returns {String|Error}
       */
      url(name, ...args) {
        const route = this.route(name);
        if (route) return route.url.apply(route, args);
        return new Error(`No route found for name: ${String(name)}`);
      }
      /**
       * Match given `path` and return corresponding routes.
       *
       * @param {String} path
       * @param {String} method
       * @returns {Object.<path, pathAndMethod>} returns layers that matched path and
       * path and method.
       * @private
       */
      match(path, method) {
        const layers = this.stack;
        let layer;
        const matched = {
          path: [],
          pathAndMethod: [],
          route: false
        };
        for (let len = layers.length, i = 0; i < len; i++) {
          layer = layers[i];
          debug("test %s %s", layer.path, layer.regexp);
          if (layer.match(path)) {
            matched.path.push(layer);
            if (layer.methods.length === 0 || layer.methods.includes(method)) {
              matched.pathAndMethod.push(layer);
              if (layer.methods.length > 0) matched.route = true;
            }
          }
        }
        return matched;
      }
      /**
       * Match given `input` to allowed host
       * @param {String} input
       * @returns {boolean}
       */
      matchHost(input) {
        const { host } = this;
        if (!host) {
          return true;
        }
        if (!input) {
          return false;
        }
        if (typeof host === "string") {
          return input === host;
        }
        if (typeof host === "object" && host instanceof RegExp) {
          return host.test(input);
        }
      }
      /**
       * Run middleware for named route parameters. Useful for auto-loading or
       * validation.
       *
       * @example
       *
       * ```javascript
       * router
       *   .param('user', (id, ctx, next) => {
       *     ctx.user = users[id];
       *     if (!ctx.user) return ctx.status = 404;
       *     return next();
       *   })
       *   .get('/users/:user', ctx => {
       *     ctx.body = ctx.user;
       *   })
       *   .get('/users/:user/friends', ctx => {
       *     return ctx.user.getFriends().then(function(friends) {
       *       ctx.body = friends;
       *     });
       *   })
       *   // /users/3 => {"id": 3, "name": "Alex"}
       *   // /users/3/friends => [{"id": 4, "name": "TJ"}]
       * ```
       *
       * @param {String} param
       * @param {Function} middleware
       * @returns {Router}
       */
      param(param, middleware) {
        this.params[param] = middleware;
        for (let i = 0; i < this.stack.length; i++) {
          const route = this.stack[i];
          route.param(param, middleware);
        }
        return this;
      }
    };
    for (const method of methods) {
      Router3.prototype[method] = function(name, path, middleware) {
        if (typeof path === "string" || path instanceof RegExp) {
          middleware = Array.prototype.slice.call(arguments, 2);
        } else {
          middleware = Array.prototype.slice.call(arguments, 1);
          path = name;
          name = null;
        }
        if (typeof path !== "string" && !(path instanceof RegExp) && (!Array.isArray(path) || path.length === 0))
          throw new Error(
            `You have to provide a path when adding a ${method} handler`
          );
        const opts = {
          name,
          pathAsRegExp: path instanceof RegExp
        };
        this.register(path, [method], middleware, { ...this.opts, ...opts });
        return this;
      };
    }
    Router3.prototype.del = Router3.prototype["delete"];
    module2.exports = Router3;
  }
});

// src/app.ts
var import_koa = __toESM(require("koa"), 1);

// src/api/index.ts
var import_router2 = __toESM(require_router(), 1);

// src/api/video.ts
var import_router = __toESM(require_router(), 1);

// src/util/index.ts
function isDev() {
  return process.env.NODE_ENV === "development";
}

// src/api/video.mode.ts
var moontvDomain = isDev() ? "xtv.gorap.vip" : "moon-tv-sand-five-73.vercel.app";
console.info("env--", process.env.NODE_ENV);
async function getMovies(start = 0, limit = 20) {
  let res = await fetch(
    `https://${moontvDomain}/api/douban/categories?kind=movie&category=\u70ED\u95E8&type=\u5168\u90E8&limit=${limit}&start=${start}`
  );
  let data = await res.json().catch((err) => ({ code: 500, msg: err.message }));
  let movies = [];
  if (data.code == 200 && data.list && data.list.length > 0) {
    data.list.forEach((item) => {
      movies.push({
        id: item.id,
        poster: item.poster,
        rate: item.rate,
        title: item.title,
        year: item.year
      });
    });
  }
  return movies;
}
async function getTVs(start = 0, limit = 20) {
  let res = await fetch(
    `https://${moontvDomain}/api/douban/categories?kind=tv&category=tv&type=tv&limit=${limit}&start=${start}`
  );
  let data = await res.json().catch((err) => ({ code: 500, msg: err.message }));
  let movies = [];
  if (data.code == 200 && data.list && data.list.length > 0) {
    data.list.forEach((item) => {
      movies.push({
        id: item.id,
        poster: item.poster,
        rate: item.rate,
        title: item.title,
        year: item.year
      });
    });
  }
  return movies;
}
async function getShows(start = 0, limit = 20) {
  start = start || 0;
  let res = await fetch(
    `https://${moontvDomain}/api/douban/categories?kind=tv&category=show&type=show&limit=${limit}&start=${start}`
  );
  let data = await res.json().catch((err) => ({ code: 500, msg: err.message }));
  let list = [];
  if (data.code == 200 && data.list && data.list.length > 0) {
    data.list.forEach((item) => {
      list.push({
        id: item.id,
        poster: item.poster,
        rate: item.rate,
        title: item.title,
        year: item.year
      });
    });
  }
  return list;
}
async function getAnimes(start = 0, limit = 20) {
  start = start || 0;
  let res = await fetch(
    `https://${moontvDomain}/api/douban/categories?kind=tv&category=${encodeURIComponent("\u70ED\u95E8")}&type=tv_animation&limit=${limit}&start=${start}`
  );
  let data = await res.json().catch((err) => ({ code: 500, msg: err.message }));
  let list = [];
  if (data.code == 200 && data.list && data.list.length > 0) {
    data.list.forEach((item) => {
      list.push({
        id: item.id,
        poster: item.poster,
        rate: item.rate,
        title: item.title,
        year: item.year
      });
    });
  }
  return list;
}
async function search(q) {
  let ret = await fetch(`https://${moontvDomain}/api/search?q=${encodeURIComponent(q)}`);
  let data = await ret.json().catch(() => ({ results: [] }));
  let list = [];
  list = data.results.filter((item) => item.episodes && item.episodes.length > 0).map((item) => {
    let episodesx = item.episodes || [];
    return {
      id: item.id,
      title: item.title,
      poster: item.poster,
      year: item.year,
      cata: item.class,
      //rate: item.rate,
      type: item.type_name,
      doubanId: item.doubanId,
      source: item.source,
      sourceName: item.source_name,
      episodes: episodesx
      //douban_id: item.douban_id,
    };
  });
  return list;
}

// src/api/video.ts
var routerVideo = new import_router.default();
routerVideo.get("/home", async (ctx) => {
  let movies = await getMovies(0, 12);
  let tvs = await getTVs(0, 12);
  let shows = await getShows(0, 12);
  let outout = {
    code: 200,
    data: {
      movies,
      tvs,
      //animes: animes,
      shows
    }
  };
  ctx.body = outout;
});
routerVideo.get("/list", async (ctx) => {
  let output = { code: 200 };
  let list = [];
  let type = ctx.query.type || "tv";
  let start = parseInt(ctx.query.start) || 0;
  switch (type) {
    case "movie":
      list = await getMovies(start);
      break;
    case "show":
      list = await getShows(start);
      break;
    case "anime":
      list = await getAnimes(start);
      break;
    default:
      list = await getTVs(start);
      break;
  }
  output.data = {
    list
  };
  ctx.body = output;
});
routerVideo.get("/s", async (ctx) => {
  let q = ctx.query.q || "";
  console.info("search", q);
  let list = await search(q);
  ctx.body = {
    code: 200,
    data: {
      list
    }
  };
});
routerVideo.get("/d", (ctx) => {
});
var video_default = routerVideo;

// src/api/index.ts
var router = new import_router2.default();
router.get("/", (ctx) => {
  ctx.body = { msg: "" };
});
router.get("/ping", (ctx) => {
  ctx.body = { msg: "pong" };
});
router.use("/api/v", video_default.routes()).use(video_default.allowedMethods());
var api_default = router;

// src/app.ts
var import_cors = __toESM(require("@koa/cors"), 1);
var app = new import_koa.default();
app.use(
  (0, import_cors.default)({
    origin: "*",
    // 允许所有域名跨域请求，如果你只想允许某几个域名，请写对应的域名字符串或者函数
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization", "Accept"]
  })
);
app.use(api_default.routes()).use(api_default.allowedMethods());
var app_default = app;

// serverless/vercel.ts
var port = process.env.PORT || 3e3;
app_default.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
/*! Bundled license information:

depd/index.js:
  (*!
   * depd
   * Copyright(c) 2014-2018 Douglas Christopher Wilson
   * MIT Licensed
   *)

statuses/index.js:
  (*!
   * statuses
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2016 Douglas Christopher Wilson
   * MIT Licensed
   *)

toidentifier/index.js:
  (*!
   * toidentifier
   * Copyright(c) 2016 Douglas Christopher Wilson
   * MIT Licensed
   *)

http-errors/index.js:
  (*!
   * http-errors
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2016 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/
//# sourceMappingURL=vercel.cjs.map