var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __commonJS = (callback, module2) => () => {
  if (!module2) {
    module2 = {exports: {}};
    callback(module2.exports, module2);
  }
  return module2.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};
var __exportStar = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  return __exportStar(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? {get: () => module2.default, enumerable: true} : {value: module2, enumerable: true})), module2);
};

// node_modules/@actions/core/lib/utils.js
var require_utils = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  function toCommandValue(input) {
    if (input === null || input === void 0) {
      return "";
    } else if (typeof input === "string" || input instanceof String) {
      return input;
    }
    return JSON.stringify(input);
  }
  exports2.toCommandValue = toCommandValue;
});

// node_modules/@actions/core/lib/command.js
var require_command = __commonJS((exports2) => {
  "use strict";
  var __importStar = exports2 && exports2.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k))
          result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  var os = __importStar(require("os"));
  var utils_1 = require_utils();
  function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
  }
  exports2.issueCommand = issueCommand;
  function issue(name, message = "") {
    issueCommand(name, {}, message);
  }
  exports2.issue = issue;
  var CMD_STRING = "::";
  var Command = class {
    constructor(command, properties, message) {
      if (!command) {
        command = "missing.command";
      }
      this.command = command;
      this.properties = properties;
      this.message = message;
    }
    toString() {
      let cmdStr = CMD_STRING + this.command;
      if (this.properties && Object.keys(this.properties).length > 0) {
        cmdStr += " ";
        let first = true;
        for (const key in this.properties) {
          if (this.properties.hasOwnProperty(key)) {
            const val = this.properties[key];
            if (val) {
              if (first) {
                first = false;
              } else {
                cmdStr += ",";
              }
              cmdStr += `${key}=${escapeProperty(val)}`;
            }
          }
        }
      }
      cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
      return cmdStr;
    }
  };
  function escapeData(s) {
    return utils_1.toCommandValue(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
  }
  function escapeProperty(s) {
    return utils_1.toCommandValue(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A").replace(/:/g, "%3A").replace(/,/g, "%2C");
  }
});

// node_modules/@actions/core/lib/file-command.js
var require_file_command = __commonJS((exports2) => {
  "use strict";
  var __importStar = exports2 && exports2.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k))
          result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  var fs = __importStar(require("fs"));
  var os = __importStar(require("os"));
  var utils_1 = require_utils();
  function issueCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
      throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
      throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
      encoding: "utf8"
    });
  }
  exports2.issueCommand = issueCommand;
});

// node_modules/@actions/core/lib/core.js
var require_core = __commonJS((exports2) => {
  "use strict";
  var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __importStar = exports2 && exports2.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k))
          result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  var command_1 = require_command();
  var file_command_1 = require_file_command();
  var utils_1 = require_utils();
  var os = __importStar(require("os"));
  var path2 = __importStar(require("path"));
  var ExitCode;
  (function(ExitCode2) {
    ExitCode2[ExitCode2["Success"] = 0] = "Success";
    ExitCode2[ExitCode2["Failure"] = 1] = "Failure";
  })(ExitCode = exports2.ExitCode || (exports2.ExitCode = {}));
  function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env["GITHUB_ENV"] || "";
    if (filePath) {
      const delimiter = "_GitHubActionsFileCommandDelimeter_";
      const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
      file_command_1.issueCommand("ENV", commandValue);
    } else {
      command_1.issueCommand("set-env", {name}, convertedVal);
    }
  }
  exports2.exportVariable = exportVariable;
  function setSecret(secret) {
    command_1.issueCommand("add-mask", {}, secret);
  }
  exports2.setSecret = setSecret;
  function addPath(inputPath) {
    const filePath = process.env["GITHUB_PATH"] || "";
    if (filePath) {
      file_command_1.issueCommand("PATH", inputPath);
    } else {
      command_1.issueCommand("add-path", {}, inputPath);
    }
    process.env["PATH"] = `${inputPath}${path2.delimiter}${process.env["PATH"]}`;
  }
  exports2.addPath = addPath;
  function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, "_").toUpperCase()}`] || "";
    if (options && options.required && !val) {
      throw new Error(`Input required and not supplied: ${name}`);
    }
    return val.trim();
  }
  exports2.getInput = getInput;
  function setOutput2(name, value) {
    command_1.issueCommand("set-output", {name}, value);
  }
  exports2.setOutput = setOutput2;
  function setCommandEcho(enabled) {
    command_1.issue("echo", enabled ? "on" : "off");
  }
  exports2.setCommandEcho = setCommandEcho;
  function setFailed2(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
  }
  exports2.setFailed = setFailed2;
  function isDebug() {
    return process.env["RUNNER_DEBUG"] === "1";
  }
  exports2.isDebug = isDebug;
  function debug(message) {
    command_1.issueCommand("debug", {}, message);
  }
  exports2.debug = debug;
  function error(message) {
    command_1.issue("error", message instanceof Error ? message.toString() : message);
  }
  exports2.error = error;
  function warning(message) {
    command_1.issue("warning", message instanceof Error ? message.toString() : message);
  }
  exports2.warning = warning;
  function info2(message) {
    process.stdout.write(message + os.EOL);
  }
  exports2.info = info2;
  function startGroup(name) {
    command_1.issue("group", name);
  }
  exports2.startGroup = startGroup;
  function endGroup() {
    command_1.issue("endgroup");
  }
  exports2.endGroup = endGroup;
  function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
      startGroup(name);
      let result;
      try {
        result = yield fn();
      } finally {
        endGroup();
      }
      return result;
    });
  }
  exports2.group = group;
  function saveState(name, value) {
    command_1.issueCommand("save-state", {name}, value);
  }
  exports2.saveState = saveState;
  function getState(name) {
    return process.env[`STATE_${name}`] || "";
  }
  exports2.getState = getState;
});

// node_modules/node-version/index.js
var require_node_version = __commonJS((exports2, module2) => {
  /*!
   * node-version
   * Copyright(c) 2011-2018 Rodolphe Stoclin
   * MIT Licensed
   */
  module2.exports = function() {
    var version = process.versions.node;
    var split = version.split(".");
    return {
      original: "v" + version,
      short: split[0] + "." + split[1],
      long: version,
      major: split[0],
      minor: split[1],
      build: split[2]
    };
  }();
});

// node_modules/pseudomap/pseudomap.js
var require_pseudomap = __commonJS((exports2, module2) => {
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  module2.exports = PseudoMap;
  function PseudoMap(set2) {
    if (!(this instanceof PseudoMap))
      throw new TypeError("Constructor PseudoMap requires 'new'");
    this.clear();
    if (set2) {
      if (set2 instanceof PseudoMap || typeof Map === "function" && set2 instanceof Map)
        set2.forEach(function(value, key) {
          this.set(key, value);
        }, this);
      else if (Array.isArray(set2))
        set2.forEach(function(kv) {
          this.set(kv[0], kv[1]);
        }, this);
      else
        throw new TypeError("invalid argument");
    }
  }
  PseudoMap.prototype.forEach = function(fn, thisp) {
    thisp = thisp || this;
    Object.keys(this._data).forEach(function(k) {
      if (k !== "size")
        fn.call(thisp, this._data[k].value, this._data[k].key);
    }, this);
  };
  PseudoMap.prototype.has = function(k) {
    return !!find(this._data, k);
  };
  PseudoMap.prototype.get = function(k) {
    var res = find(this._data, k);
    return res && res.value;
  };
  PseudoMap.prototype.set = function(k, v) {
    set(this._data, k, v);
  };
  PseudoMap.prototype.delete = function(k) {
    var res = find(this._data, k);
    if (res) {
      delete this._data[res._index];
      this._data.size--;
    }
  };
  PseudoMap.prototype.clear = function() {
    var data = Object.create(null);
    data.size = 0;
    Object.defineProperty(this, "_data", {
      value: data,
      enumerable: false,
      configurable: true,
      writable: false
    });
  };
  Object.defineProperty(PseudoMap.prototype, "size", {
    get: function() {
      return this._data.size;
    },
    set: function(n) {
    },
    enumerable: true,
    configurable: true
  });
  PseudoMap.prototype.values = PseudoMap.prototype.keys = PseudoMap.prototype.entries = function() {
    throw new Error("iterators are not implemented in this version");
  };
  function same(a, b) {
    return a === b || a !== a && b !== b;
  }
  function Entry(k, v, i) {
    this.key = k;
    this.value = v;
    this._index = i;
  }
  function find(data, k) {
    for (var i = 0, s = "_" + k, key = s; hasOwnProperty.call(data, key); key = s + i++) {
      if (same(data[key].key, k))
        return data[key];
    }
  }
  function set(data, k, v) {
    for (var i = 0, s = "_" + k, key = s; hasOwnProperty.call(data, key); key = s + i++) {
      if (same(data[key].key, k)) {
        data[key].value = v;
        return;
      }
    }
    data.size++;
    data[key] = new Entry(k, v, key);
  }
});

// node_modules/pseudomap/map.js
var require_map = __commonJS((exports2, module2) => {
  if (process.env.npm_package_name === "pseudomap" && process.env.npm_lifecycle_script === "test")
    process.env.TEST_PSEUDOMAP = "true";
  if (typeof Map === "function" && !process.env.TEST_PSEUDOMAP) {
    module2.exports = Map;
  } else {
    module2.exports = require_pseudomap();
  }
});

// node_modules/yallist/yallist.js
var require_yallist = __commonJS((exports2, module2) => {
  module2.exports = Yallist;
  Yallist.Node = Node;
  Yallist.create = Yallist;
  function Yallist(list) {
    var self = this;
    if (!(self instanceof Yallist)) {
      self = new Yallist();
    }
    self.tail = null;
    self.head = null;
    self.length = 0;
    if (list && typeof list.forEach === "function") {
      list.forEach(function(item) {
        self.push(item);
      });
    } else if (arguments.length > 0) {
      for (var i = 0, l = arguments.length; i < l; i++) {
        self.push(arguments[i]);
      }
    }
    return self;
  }
  Yallist.prototype.removeNode = function(node) {
    if (node.list !== this) {
      throw new Error("removing node which does not belong to this list");
    }
    var next = node.next;
    var prev = node.prev;
    if (next) {
      next.prev = prev;
    }
    if (prev) {
      prev.next = next;
    }
    if (node === this.head) {
      this.head = next;
    }
    if (node === this.tail) {
      this.tail = prev;
    }
    node.list.length--;
    node.next = null;
    node.prev = null;
    node.list = null;
  };
  Yallist.prototype.unshiftNode = function(node) {
    if (node === this.head) {
      return;
    }
    if (node.list) {
      node.list.removeNode(node);
    }
    var head = this.head;
    node.list = this;
    node.next = head;
    if (head) {
      head.prev = node;
    }
    this.head = node;
    if (!this.tail) {
      this.tail = node;
    }
    this.length++;
  };
  Yallist.prototype.pushNode = function(node) {
    if (node === this.tail) {
      return;
    }
    if (node.list) {
      node.list.removeNode(node);
    }
    var tail = this.tail;
    node.list = this;
    node.prev = tail;
    if (tail) {
      tail.next = node;
    }
    this.tail = node;
    if (!this.head) {
      this.head = node;
    }
    this.length++;
  };
  Yallist.prototype.push = function() {
    for (var i = 0, l = arguments.length; i < l; i++) {
      push(this, arguments[i]);
    }
    return this.length;
  };
  Yallist.prototype.unshift = function() {
    for (var i = 0, l = arguments.length; i < l; i++) {
      unshift(this, arguments[i]);
    }
    return this.length;
  };
  Yallist.prototype.pop = function() {
    if (!this.tail) {
      return void 0;
    }
    var res = this.tail.value;
    this.tail = this.tail.prev;
    if (this.tail) {
      this.tail.next = null;
    } else {
      this.head = null;
    }
    this.length--;
    return res;
  };
  Yallist.prototype.shift = function() {
    if (!this.head) {
      return void 0;
    }
    var res = this.head.value;
    this.head = this.head.next;
    if (this.head) {
      this.head.prev = null;
    } else {
      this.tail = null;
    }
    this.length--;
    return res;
  };
  Yallist.prototype.forEach = function(fn, thisp) {
    thisp = thisp || this;
    for (var walker = this.head, i = 0; walker !== null; i++) {
      fn.call(thisp, walker.value, i, this);
      walker = walker.next;
    }
  };
  Yallist.prototype.forEachReverse = function(fn, thisp) {
    thisp = thisp || this;
    for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
      fn.call(thisp, walker.value, i, this);
      walker = walker.prev;
    }
  };
  Yallist.prototype.get = function(n) {
    for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
      walker = walker.next;
    }
    if (i === n && walker !== null) {
      return walker.value;
    }
  };
  Yallist.prototype.getReverse = function(n) {
    for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
      walker = walker.prev;
    }
    if (i === n && walker !== null) {
      return walker.value;
    }
  };
  Yallist.prototype.map = function(fn, thisp) {
    thisp = thisp || this;
    var res = new Yallist();
    for (var walker = this.head; walker !== null; ) {
      res.push(fn.call(thisp, walker.value, this));
      walker = walker.next;
    }
    return res;
  };
  Yallist.prototype.mapReverse = function(fn, thisp) {
    thisp = thisp || this;
    var res = new Yallist();
    for (var walker = this.tail; walker !== null; ) {
      res.push(fn.call(thisp, walker.value, this));
      walker = walker.prev;
    }
    return res;
  };
  Yallist.prototype.reduce = function(fn, initial) {
    var acc;
    var walker = this.head;
    if (arguments.length > 1) {
      acc = initial;
    } else if (this.head) {
      walker = this.head.next;
      acc = this.head.value;
    } else {
      throw new TypeError("Reduce of empty list with no initial value");
    }
    for (var i = 0; walker !== null; i++) {
      acc = fn(acc, walker.value, i);
      walker = walker.next;
    }
    return acc;
  };
  Yallist.prototype.reduceReverse = function(fn, initial) {
    var acc;
    var walker = this.tail;
    if (arguments.length > 1) {
      acc = initial;
    } else if (this.tail) {
      walker = this.tail.prev;
      acc = this.tail.value;
    } else {
      throw new TypeError("Reduce of empty list with no initial value");
    }
    for (var i = this.length - 1; walker !== null; i--) {
      acc = fn(acc, walker.value, i);
      walker = walker.prev;
    }
    return acc;
  };
  Yallist.prototype.toArray = function() {
    var arr = new Array(this.length);
    for (var i = 0, walker = this.head; walker !== null; i++) {
      arr[i] = walker.value;
      walker = walker.next;
    }
    return arr;
  };
  Yallist.prototype.toArrayReverse = function() {
    var arr = new Array(this.length);
    for (var i = 0, walker = this.tail; walker !== null; i++) {
      arr[i] = walker.value;
      walker = walker.prev;
    }
    return arr;
  };
  Yallist.prototype.slice = function(from, to) {
    to = to || this.length;
    if (to < 0) {
      to += this.length;
    }
    from = from || 0;
    if (from < 0) {
      from += this.length;
    }
    var ret = new Yallist();
    if (to < from || to < 0) {
      return ret;
    }
    if (from < 0) {
      from = 0;
    }
    if (to > this.length) {
      to = this.length;
    }
    for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
      walker = walker.next;
    }
    for (; walker !== null && i < to; i++, walker = walker.next) {
      ret.push(walker.value);
    }
    return ret;
  };
  Yallist.prototype.sliceReverse = function(from, to) {
    to = to || this.length;
    if (to < 0) {
      to += this.length;
    }
    from = from || 0;
    if (from < 0) {
      from += this.length;
    }
    var ret = new Yallist();
    if (to < from || to < 0) {
      return ret;
    }
    if (from < 0) {
      from = 0;
    }
    if (to > this.length) {
      to = this.length;
    }
    for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
      walker = walker.prev;
    }
    for (; walker !== null && i > from; i--, walker = walker.prev) {
      ret.push(walker.value);
    }
    return ret;
  };
  Yallist.prototype.reverse = function() {
    var head = this.head;
    var tail = this.tail;
    for (var walker = head; walker !== null; walker = walker.prev) {
      var p = walker.prev;
      walker.prev = walker.next;
      walker.next = p;
    }
    this.head = tail;
    this.tail = head;
    return this;
  };
  function push(self, item) {
    self.tail = new Node(item, self.tail, null, self);
    if (!self.head) {
      self.head = self.tail;
    }
    self.length++;
  }
  function unshift(self, item) {
    self.head = new Node(item, null, self.head, self);
    if (!self.tail) {
      self.tail = self.head;
    }
    self.length++;
  }
  function Node(value, prev, next, list) {
    if (!(this instanceof Node)) {
      return new Node(value, prev, next, list);
    }
    this.list = list;
    this.value = value;
    if (prev) {
      prev.next = this;
      this.prev = prev;
    } else {
      this.prev = null;
    }
    if (next) {
      next.prev = this;
      this.next = next;
    } else {
      this.next = null;
    }
  }
});

// node_modules/lru-cache/index.js
var require_lru_cache = __commonJS((exports2, module2) => {
  "use strict";
  module2.exports = LRUCache;
  var Map2 = require_map();
  var util = require("util");
  var Yallist = require_yallist();
  var hasSymbol = typeof Symbol === "function" && process.env._nodeLRUCacheForceNoSymbol !== "1";
  var makeSymbol;
  if (hasSymbol) {
    makeSymbol = function(key) {
      return Symbol(key);
    };
  } else {
    makeSymbol = function(key) {
      return "_" + key;
    };
  }
  var MAX = makeSymbol("max");
  var LENGTH = makeSymbol("length");
  var LENGTH_CALCULATOR = makeSymbol("lengthCalculator");
  var ALLOW_STALE = makeSymbol("allowStale");
  var MAX_AGE = makeSymbol("maxAge");
  var DISPOSE = makeSymbol("dispose");
  var NO_DISPOSE_ON_SET = makeSymbol("noDisposeOnSet");
  var LRU_LIST = makeSymbol("lruList");
  var CACHE = makeSymbol("cache");
  function naiveLength() {
    return 1;
  }
  function LRUCache(options) {
    if (!(this instanceof LRUCache)) {
      return new LRUCache(options);
    }
    if (typeof options === "number") {
      options = {max: options};
    }
    if (!options) {
      options = {};
    }
    var max = this[MAX] = options.max;
    if (!max || !(typeof max === "number") || max <= 0) {
      this[MAX] = Infinity;
    }
    var lc = options.length || naiveLength;
    if (typeof lc !== "function") {
      lc = naiveLength;
    }
    this[LENGTH_CALCULATOR] = lc;
    this[ALLOW_STALE] = options.stale || false;
    this[MAX_AGE] = options.maxAge || 0;
    this[DISPOSE] = options.dispose;
    this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false;
    this.reset();
  }
  Object.defineProperty(LRUCache.prototype, "max", {
    set: function(mL) {
      if (!mL || !(typeof mL === "number") || mL <= 0) {
        mL = Infinity;
      }
      this[MAX] = mL;
      trim(this);
    },
    get: function() {
      return this[MAX];
    },
    enumerable: true
  });
  Object.defineProperty(LRUCache.prototype, "allowStale", {
    set: function(allowStale) {
      this[ALLOW_STALE] = !!allowStale;
    },
    get: function() {
      return this[ALLOW_STALE];
    },
    enumerable: true
  });
  Object.defineProperty(LRUCache.prototype, "maxAge", {
    set: function(mA) {
      if (!mA || !(typeof mA === "number") || mA < 0) {
        mA = 0;
      }
      this[MAX_AGE] = mA;
      trim(this);
    },
    get: function() {
      return this[MAX_AGE];
    },
    enumerable: true
  });
  Object.defineProperty(LRUCache.prototype, "lengthCalculator", {
    set: function(lC) {
      if (typeof lC !== "function") {
        lC = naiveLength;
      }
      if (lC !== this[LENGTH_CALCULATOR]) {
        this[LENGTH_CALCULATOR] = lC;
        this[LENGTH] = 0;
        this[LRU_LIST].forEach(function(hit) {
          hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key);
          this[LENGTH] += hit.length;
        }, this);
      }
      trim(this);
    },
    get: function() {
      return this[LENGTH_CALCULATOR];
    },
    enumerable: true
  });
  Object.defineProperty(LRUCache.prototype, "length", {
    get: function() {
      return this[LENGTH];
    },
    enumerable: true
  });
  Object.defineProperty(LRUCache.prototype, "itemCount", {
    get: function() {
      return this[LRU_LIST].length;
    },
    enumerable: true
  });
  LRUCache.prototype.rforEach = function(fn, thisp) {
    thisp = thisp || this;
    for (var walker = this[LRU_LIST].tail; walker !== null; ) {
      var prev = walker.prev;
      forEachStep(this, fn, walker, thisp);
      walker = prev;
    }
  };
  function forEachStep(self, fn, node, thisp) {
    var hit = node.value;
    if (isStale(self, hit)) {
      del(self, node);
      if (!self[ALLOW_STALE]) {
        hit = void 0;
      }
    }
    if (hit) {
      fn.call(thisp, hit.value, hit.key, self);
    }
  }
  LRUCache.prototype.forEach = function(fn, thisp) {
    thisp = thisp || this;
    for (var walker = this[LRU_LIST].head; walker !== null; ) {
      var next = walker.next;
      forEachStep(this, fn, walker, thisp);
      walker = next;
    }
  };
  LRUCache.prototype.keys = function() {
    return this[LRU_LIST].toArray().map(function(k) {
      return k.key;
    }, this);
  };
  LRUCache.prototype.values = function() {
    return this[LRU_LIST].toArray().map(function(k) {
      return k.value;
    }, this);
  };
  LRUCache.prototype.reset = function() {
    if (this[DISPOSE] && this[LRU_LIST] && this[LRU_LIST].length) {
      this[LRU_LIST].forEach(function(hit) {
        this[DISPOSE](hit.key, hit.value);
      }, this);
    }
    this[CACHE] = new Map2();
    this[LRU_LIST] = new Yallist();
    this[LENGTH] = 0;
  };
  LRUCache.prototype.dump = function() {
    return this[LRU_LIST].map(function(hit) {
      if (!isStale(this, hit)) {
        return {
          k: hit.key,
          v: hit.value,
          e: hit.now + (hit.maxAge || 0)
        };
      }
    }, this).toArray().filter(function(h) {
      return h;
    });
  };
  LRUCache.prototype.dumpLru = function() {
    return this[LRU_LIST];
  };
  LRUCache.prototype.inspect = function(n, opts) {
    var str = "LRUCache {";
    var extras = false;
    var as = this[ALLOW_STALE];
    if (as) {
      str += "\n  allowStale: true";
      extras = true;
    }
    var max = this[MAX];
    if (max && max !== Infinity) {
      if (extras) {
        str += ",";
      }
      str += "\n  max: " + util.inspect(max, opts);
      extras = true;
    }
    var maxAge = this[MAX_AGE];
    if (maxAge) {
      if (extras) {
        str += ",";
      }
      str += "\n  maxAge: " + util.inspect(maxAge, opts);
      extras = true;
    }
    var lc = this[LENGTH_CALCULATOR];
    if (lc && lc !== naiveLength) {
      if (extras) {
        str += ",";
      }
      str += "\n  length: " + util.inspect(this[LENGTH], opts);
      extras = true;
    }
    var didFirst = false;
    this[LRU_LIST].forEach(function(item) {
      if (didFirst) {
        str += ",\n  ";
      } else {
        if (extras) {
          str += ",\n";
        }
        didFirst = true;
        str += "\n  ";
      }
      var key = util.inspect(item.key).split("\n").join("\n  ");
      var val = {value: item.value};
      if (item.maxAge !== maxAge) {
        val.maxAge = item.maxAge;
      }
      if (lc !== naiveLength) {
        val.length = item.length;
      }
      if (isStale(this, item)) {
        val.stale = true;
      }
      val = util.inspect(val, opts).split("\n").join("\n  ");
      str += key + " => " + val;
    });
    if (didFirst || extras) {
      str += "\n";
    }
    str += "}";
    return str;
  };
  LRUCache.prototype.set = function(key, value, maxAge) {
    maxAge = maxAge || this[MAX_AGE];
    var now = maxAge ? Date.now() : 0;
    var len = this[LENGTH_CALCULATOR](value, key);
    if (this[CACHE].has(key)) {
      if (len > this[MAX]) {
        del(this, this[CACHE].get(key));
        return false;
      }
      var node = this[CACHE].get(key);
      var item = node.value;
      if (this[DISPOSE]) {
        if (!this[NO_DISPOSE_ON_SET]) {
          this[DISPOSE](key, item.value);
        }
      }
      item.now = now;
      item.maxAge = maxAge;
      item.value = value;
      this[LENGTH] += len - item.length;
      item.length = len;
      this.get(key);
      trim(this);
      return true;
    }
    var hit = new Entry(key, value, len, now, maxAge);
    if (hit.length > this[MAX]) {
      if (this[DISPOSE]) {
        this[DISPOSE](key, value);
      }
      return false;
    }
    this[LENGTH] += hit.length;
    this[LRU_LIST].unshift(hit);
    this[CACHE].set(key, this[LRU_LIST].head);
    trim(this);
    return true;
  };
  LRUCache.prototype.has = function(key) {
    if (!this[CACHE].has(key))
      return false;
    var hit = this[CACHE].get(key).value;
    if (isStale(this, hit)) {
      return false;
    }
    return true;
  };
  LRUCache.prototype.get = function(key) {
    return get(this, key, true);
  };
  LRUCache.prototype.peek = function(key) {
    return get(this, key, false);
  };
  LRUCache.prototype.pop = function() {
    var node = this[LRU_LIST].tail;
    if (!node)
      return null;
    del(this, node);
    return node.value;
  };
  LRUCache.prototype.del = function(key) {
    del(this, this[CACHE].get(key));
  };
  LRUCache.prototype.load = function(arr) {
    this.reset();
    var now = Date.now();
    for (var l = arr.length - 1; l >= 0; l--) {
      var hit = arr[l];
      var expiresAt = hit.e || 0;
      if (expiresAt === 0) {
        this.set(hit.k, hit.v);
      } else {
        var maxAge = expiresAt - now;
        if (maxAge > 0) {
          this.set(hit.k, hit.v, maxAge);
        }
      }
    }
  };
  LRUCache.prototype.prune = function() {
    var self = this;
    this[CACHE].forEach(function(value, key) {
      get(self, key, false);
    });
  };
  function get(self, key, doUse) {
    var node = self[CACHE].get(key);
    if (node) {
      var hit = node.value;
      if (isStale(self, hit)) {
        del(self, node);
        if (!self[ALLOW_STALE])
          hit = void 0;
      } else {
        if (doUse) {
          self[LRU_LIST].unshiftNode(node);
        }
      }
      if (hit)
        hit = hit.value;
    }
    return hit;
  }
  function isStale(self, hit) {
    if (!hit || !hit.maxAge && !self[MAX_AGE]) {
      return false;
    }
    var stale = false;
    var diff = Date.now() - hit.now;
    if (hit.maxAge) {
      stale = diff > hit.maxAge;
    } else {
      stale = self[MAX_AGE] && diff > self[MAX_AGE];
    }
    return stale;
  }
  function trim(self) {
    if (self[LENGTH] > self[MAX]) {
      for (var walker = self[LRU_LIST].tail; self[LENGTH] > self[MAX] && walker !== null; ) {
        var prev = walker.prev;
        del(self, walker);
        walker = prev;
      }
    }
  }
  function del(self, node) {
    if (node) {
      var hit = node.value;
      if (self[DISPOSE]) {
        self[DISPOSE](hit.key, hit.value);
      }
      self[LENGTH] -= hit.length;
      self[CACHE].delete(hit.key);
      self[LRU_LIST].removeNode(node);
    }
  }
  function Entry(key, value, length, now, maxAge) {
    this.key = key;
    this.value = value;
    this.length = length;
    this.now = now;
    this.maxAge = maxAge || 0;
  }
});

// node_modules/isexe/windows.js
var require_windows = __commonJS((exports2, module2) => {
  module2.exports = isexe;
  isexe.sync = sync;
  var fs = require("fs");
  function checkPathExt(path2, options) {
    var pathext = options.pathExt !== void 0 ? options.pathExt : process.env.PATHEXT;
    if (!pathext) {
      return true;
    }
    pathext = pathext.split(";");
    if (pathext.indexOf("") !== -1) {
      return true;
    }
    for (var i = 0; i < pathext.length; i++) {
      var p = pathext[i].toLowerCase();
      if (p && path2.substr(-p.length).toLowerCase() === p) {
        return true;
      }
    }
    return false;
  }
  function checkStat(stat, path2, options) {
    if (!stat.isSymbolicLink() && !stat.isFile()) {
      return false;
    }
    return checkPathExt(path2, options);
  }
  function isexe(path2, options, cb) {
    fs.stat(path2, function(er, stat) {
      cb(er, er ? false : checkStat(stat, path2, options));
    });
  }
  function sync(path2, options) {
    return checkStat(fs.statSync(path2), path2, options);
  }
});

// node_modules/isexe/mode.js
var require_mode = __commonJS((exports2, module2) => {
  module2.exports = isexe;
  isexe.sync = sync;
  var fs = require("fs");
  function isexe(path2, options, cb) {
    fs.stat(path2, function(er, stat) {
      cb(er, er ? false : checkStat(stat, options));
    });
  }
  function sync(path2, options) {
    return checkStat(fs.statSync(path2), options);
  }
  function checkStat(stat, options) {
    return stat.isFile() && checkMode(stat, options);
  }
  function checkMode(stat, options) {
    var mod = stat.mode;
    var uid = stat.uid;
    var gid = stat.gid;
    var myUid = options.uid !== void 0 ? options.uid : process.getuid && process.getuid();
    var myGid = options.gid !== void 0 ? options.gid : process.getgid && process.getgid();
    var u = parseInt("100", 8);
    var g = parseInt("010", 8);
    var o = parseInt("001", 8);
    var ug = u | g;
    var ret = mod & o || mod & g && gid === myGid || mod & u && uid === myUid || mod & ug && myUid === 0;
    return ret;
  }
});

// node_modules/isexe/index.js
var require_isexe = __commonJS((exports2, module2) => {
  var fs = require("fs");
  var core;
  if (process.platform === "win32" || global.TESTING_WINDOWS) {
    core = require_windows();
  } else {
    core = require_mode();
  }
  module2.exports = isexe;
  isexe.sync = sync;
  function isexe(path2, options, cb) {
    if (typeof options === "function") {
      cb = options;
      options = {};
    }
    if (!cb) {
      if (typeof Promise !== "function") {
        throw new TypeError("callback not provided");
      }
      return new Promise(function(resolve, reject) {
        isexe(path2, options || {}, function(er, is) {
          if (er) {
            reject(er);
          } else {
            resolve(is);
          }
        });
      });
    }
    core(path2, options || {}, function(er, is) {
      if (er) {
        if (er.code === "EACCES" || options && options.ignoreErrors) {
          er = null;
          is = false;
        }
      }
      cb(er, is);
    });
  }
  function sync(path2, options) {
    try {
      return core.sync(path2, options || {});
    } catch (er) {
      if (options && options.ignoreErrors || er.code === "EACCES") {
        return false;
      } else {
        throw er;
      }
    }
  }
});

// node_modules/which/which.js
var require_which = __commonJS((exports2, module2) => {
  module2.exports = which;
  which.sync = whichSync;
  var isWindows = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys";
  var path2 = require("path");
  var COLON = isWindows ? ";" : ":";
  var isexe = require_isexe();
  function getNotFoundError(cmd) {
    var er = new Error("not found: " + cmd);
    er.code = "ENOENT";
    return er;
  }
  function getPathInfo(cmd, opt) {
    var colon = opt.colon || COLON;
    var pathEnv = opt.path || process.env.PATH || "";
    var pathExt = [""];
    pathEnv = pathEnv.split(colon);
    var pathExtExe = "";
    if (isWindows) {
      pathEnv.unshift(process.cwd());
      pathExtExe = opt.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM";
      pathExt = pathExtExe.split(colon);
      if (cmd.indexOf(".") !== -1 && pathExt[0] !== "")
        pathExt.unshift("");
    }
    if (cmd.match(/\//) || isWindows && cmd.match(/\\/))
      pathEnv = [""];
    return {
      env: pathEnv,
      ext: pathExt,
      extExe: pathExtExe
    };
  }
  function which(cmd, opt, cb) {
    if (typeof opt === "function") {
      cb = opt;
      opt = {};
    }
    var info2 = getPathInfo(cmd, opt);
    var pathEnv = info2.env;
    var pathExt = info2.ext;
    var pathExtExe = info2.extExe;
    var found = [];
    (function F(i, l) {
      if (i === l) {
        if (opt.all && found.length)
          return cb(null, found);
        else
          return cb(getNotFoundError(cmd));
      }
      var pathPart = pathEnv[i];
      if (pathPart.charAt(0) === '"' && pathPart.slice(-1) === '"')
        pathPart = pathPart.slice(1, -1);
      var p = path2.join(pathPart, cmd);
      if (!pathPart && /^\.[\\\/]/.test(cmd)) {
        p = cmd.slice(0, 2) + p;
      }
      ;
      (function E(ii, ll) {
        if (ii === ll)
          return F(i + 1, l);
        var ext = pathExt[ii];
        isexe(p + ext, {pathExt: pathExtExe}, function(er, is) {
          if (!er && is) {
            if (opt.all)
              found.push(p + ext);
            else
              return cb(null, p + ext);
          }
          return E(ii + 1, ll);
        });
      })(0, pathExt.length);
    })(0, pathEnv.length);
  }
  function whichSync(cmd, opt) {
    opt = opt || {};
    var info2 = getPathInfo(cmd, opt);
    var pathEnv = info2.env;
    var pathExt = info2.ext;
    var pathExtExe = info2.extExe;
    var found = [];
    for (var i = 0, l = pathEnv.length; i < l; i++) {
      var pathPart = pathEnv[i];
      if (pathPart.charAt(0) === '"' && pathPart.slice(-1) === '"')
        pathPart = pathPart.slice(1, -1);
      var p = path2.join(pathPart, cmd);
      if (!pathPart && /^\.[\\\/]/.test(cmd)) {
        p = cmd.slice(0, 2) + p;
      }
      for (var j = 0, ll = pathExt.length; j < ll; j++) {
        var cur = p + pathExt[j];
        var is;
        try {
          is = isexe.sync(cur, {pathExt: pathExtExe});
          if (is) {
            if (opt.all)
              found.push(cur);
            else
              return cur;
          }
        } catch (ex) {
        }
      }
    }
    if (opt.all && found.length)
      return found;
    if (opt.nothrow)
      return null;
    throw getNotFoundError(cmd);
  }
});

// node_modules/cross-spawn/lib/resolveCommand.js
var require_resolveCommand = __commonJS((exports2, module2) => {
  "use strict";
  var path2 = require("path");
  var which = require_which();
  var LRU = require_lru_cache();
  var commandCache = new LRU({max: 50, maxAge: 30 * 1e3});
  function resolveCommand(command, noExtension) {
    var resolved;
    noExtension = !!noExtension;
    resolved = commandCache.get(command + "!" + noExtension);
    if (commandCache.has(command)) {
      return commandCache.get(command);
    }
    try {
      resolved = !noExtension ? which.sync(command) : which.sync(command, {pathExt: path2.delimiter + (process.env.PATHEXT || "")});
    } catch (e) {
    }
    commandCache.set(command + "!" + noExtension, resolved);
    return resolved;
  }
  module2.exports = resolveCommand;
});

// node_modules/cross-spawn/lib/hasBrokenSpawn.js
var require_hasBrokenSpawn = __commonJS((exports2, module2) => {
  "use strict";
  module2.exports = function() {
    if (process.platform !== "win32") {
      return false;
    }
    var nodeVer = process.version.substr(1).split(".").map(function(num) {
      return parseInt(num, 10);
    });
    return nodeVer[0] === 0 && nodeVer[1] < 12;
  }();
});

// node_modules/cross-spawn/lib/parse.js
var require_parse = __commonJS((exports2, module2) => {
  "use strict";
  var fs = require("fs");
  var LRU = require_lru_cache();
  var resolveCommand = require_resolveCommand();
  var hasBrokenSpawn = require_hasBrokenSpawn();
  var isWin = process.platform === "win32";
  var shebangCache = new LRU({max: 50, maxAge: 30 * 1e3});
  function readShebang(command) {
    var buffer;
    var fd;
    var match;
    var shebang;
    if (shebangCache.has(command)) {
      return shebangCache.get(command);
    }
    buffer = new Buffer(150);
    try {
      fd = fs.openSync(command, "r");
      fs.readSync(fd, buffer, 0, 150, 0);
      fs.closeSync(fd);
    } catch (e) {
    }
    match = buffer.toString().trim().match(/#!(.+)/i);
    if (match) {
      shebang = match[1].replace(/\/usr\/bin\/env\s+/i, "");
    }
    shebangCache.set(command, shebang);
    return shebang;
  }
  function escapeArg(arg, quote) {
    arg = "" + arg;
    if (!quote) {
      arg = arg.replace(/([\(\)%!\^<>&|;,"'\s])/g, "^$1");
    } else {
      arg = arg.replace(/(\\*)"/g, '$1$1\\"');
      arg = arg.replace(/(\\*)$/, "$1$1");
      arg = '"' + arg + '"';
    }
    return arg;
  }
  function escapeCommand(command) {
    return /^[a-z0-9_-]+$/i.test(command) ? command : escapeArg(command, true);
  }
  function requiresShell(command) {
    return !/\.(?:com|exe)$/i.test(command);
  }
  function parse(command, args, options) {
    var shebang;
    var applyQuotes;
    var file;
    var original;
    var shell;
    if (args && !Array.isArray(args)) {
      options = args;
      args = null;
    }
    args = args ? args.slice(0) : [];
    options = options || {};
    original = command;
    if (isWin) {
      file = resolveCommand(command);
      file = file || resolveCommand(command, true);
      shebang = file && readShebang(file);
      shell = options.shell || hasBrokenSpawn;
      if (shebang) {
        args.unshift(file);
        command = shebang;
        shell = shell || requiresShell(resolveCommand(shebang) || resolveCommand(shebang, true));
      } else {
        shell = shell || requiresShell(file);
      }
      if (shell) {
        applyQuotes = command !== "echo";
        command = escapeCommand(command);
        args = args.map(function(arg) {
          return escapeArg(arg, applyQuotes);
        });
        args = ["/s", "/c", '"' + command + (args.length ? " " + args.join(" ") : "") + '"'];
        command = process.env.comspec || "cmd.exe";
        options.windowsVerbatimArguments = true;
      }
    }
    return {
      command,
      args,
      options,
      file,
      original
    };
  }
  module2.exports = parse;
});

// node_modules/cross-spawn/lib/enoent.js
var require_enoent = __commonJS((exports2, module2) => {
  "use strict";
  var isWin = process.platform === "win32";
  var resolveCommand = require_resolveCommand();
  var isNode10 = process.version.indexOf("v0.10.") === 0;
  function notFoundError(command, syscall) {
    var err;
    err = new Error(syscall + " " + command + " ENOENT");
    err.code = err.errno = "ENOENT";
    err.syscall = syscall + " " + command;
    return err;
  }
  function hookChildProcess(cp, parsed) {
    var originalEmit;
    if (!isWin) {
      return;
    }
    originalEmit = cp.emit;
    cp.emit = function(name, arg1) {
      var err;
      if (name === "exit") {
        err = verifyENOENT(arg1, parsed, "spawn");
        if (err) {
          return originalEmit.call(cp, "error", err);
        }
      }
      return originalEmit.apply(cp, arguments);
    };
  }
  function verifyENOENT(status, parsed) {
    if (isWin && status === 1 && !parsed.file) {
      return notFoundError(parsed.original, "spawn");
    }
    return null;
  }
  function verifyENOENTSync(status, parsed) {
    if (isWin && status === 1 && !parsed.file) {
      return notFoundError(parsed.original, "spawnSync");
    }
    if (isNode10 && status === -1) {
      parsed.file = isWin ? parsed.file : resolveCommand(parsed.original);
      if (!parsed.file) {
        return notFoundError(parsed.original, "spawnSync");
      }
    }
    return null;
  }
  module2.exports.hookChildProcess = hookChildProcess;
  module2.exports.verifyENOENT = verifyENOENT;
  module2.exports.verifyENOENTSync = verifyENOENTSync;
  module2.exports.notFoundError = notFoundError;
});

// node_modules/cross-spawn/index.js
var require_cross_spawn = __commonJS((exports2, module2) => {
  "use strict";
  var cp = require("child_process");
  var parse = require_parse();
  var enoent = require_enoent();
  var cpSpawnSync = cp.spawnSync;
  function spawn(command, args, options) {
    var parsed;
    var spawned;
    parsed = parse(command, args, options);
    spawned = cp.spawn(parsed.command, parsed.args, parsed.options);
    enoent.hookChildProcess(spawned, parsed);
    return spawned;
  }
  function spawnSync(command, args, options) {
    var parsed;
    var result;
    if (!cpSpawnSync) {
      try {
        cpSpawnSync = require("spawn-sync");
      } catch (ex) {
        throw new Error("In order to use spawnSync on node 0.10 or older, you must install spawn-sync:\n\n  npm install spawn-sync --save");
      }
    }
    parsed = parse(command, args, options);
    result = cpSpawnSync(parsed.command, parsed.args, parsed.options);
    result.error = result.error || enoent.verifyENOENTSync(result.status, parsed);
    return result;
  }
  module2.exports = spawn;
  module2.exports.spawn = spawn;
  module2.exports.sync = spawnSync;
  module2.exports._parse = parse;
  module2.exports._enoent = enoent;
});

// node_modules/promise-polyfill/promise.js
var require_promise = __commonJS((exports2, module2) => {
  (function(root) {
    var setTimeoutFunc = setTimeout;
    function noop() {
    }
    function bind(fn, thisArg) {
      return function() {
        fn.apply(thisArg, arguments);
      };
    }
    function Promise2(fn) {
      if (!(this instanceof Promise2))
        throw new TypeError("Promises must be constructed via new");
      if (typeof fn !== "function")
        throw new TypeError("not a function");
      this._state = 0;
      this._handled = false;
      this._value = void 0;
      this._deferreds = [];
      doResolve(fn, this);
    }
    function handle(self, deferred) {
      while (self._state === 3) {
        self = self._value;
      }
      if (self._state === 0) {
        self._deferreds.push(deferred);
        return;
      }
      self._handled = true;
      Promise2._immediateFn(function() {
        var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
        if (cb === null) {
          (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
          return;
        }
        var ret;
        try {
          ret = cb(self._value);
        } catch (e) {
          reject(deferred.promise, e);
          return;
        }
        resolve(deferred.promise, ret);
      });
    }
    function resolve(self, newValue) {
      try {
        if (newValue === self)
          throw new TypeError("A promise cannot be resolved with itself.");
        if (newValue && (typeof newValue === "object" || typeof newValue === "function")) {
          var then = newValue.then;
          if (newValue instanceof Promise2) {
            self._state = 3;
            self._value = newValue;
            finale(self);
            return;
          } else if (typeof then === "function") {
            doResolve(bind(then, newValue), self);
            return;
          }
        }
        self._state = 1;
        self._value = newValue;
        finale(self);
      } catch (e) {
        reject(self, e);
      }
    }
    function reject(self, newValue) {
      self._state = 2;
      self._value = newValue;
      finale(self);
    }
    function finale(self) {
      if (self._state === 2 && self._deferreds.length === 0) {
        Promise2._immediateFn(function() {
          if (!self._handled) {
            Promise2._unhandledRejectionFn(self._value);
          }
        });
      }
      for (var i = 0, len = self._deferreds.length; i < len; i++) {
        handle(self, self._deferreds[i]);
      }
      self._deferreds = null;
    }
    function Handler(onFulfilled, onRejected, promise) {
      this.onFulfilled = typeof onFulfilled === "function" ? onFulfilled : null;
      this.onRejected = typeof onRejected === "function" ? onRejected : null;
      this.promise = promise;
    }
    function doResolve(fn, self) {
      var done = false;
      try {
        fn(function(value) {
          if (done)
            return;
          done = true;
          resolve(self, value);
        }, function(reason) {
          if (done)
            return;
          done = true;
          reject(self, reason);
        });
      } catch (ex) {
        if (done)
          return;
        done = true;
        reject(self, ex);
      }
    }
    Promise2.prototype["catch"] = function(onRejected) {
      return this.then(null, onRejected);
    };
    Promise2.prototype.then = function(onFulfilled, onRejected) {
      var prom = new this.constructor(noop);
      handle(this, new Handler(onFulfilled, onRejected, prom));
      return prom;
    };
    Promise2.all = function(arr) {
      return new Promise2(function(resolve2, reject2) {
        if (!arr || typeof arr.length === "undefined")
          throw new TypeError("Promise.all accepts an array");
        var args = Array.prototype.slice.call(arr);
        if (args.length === 0)
          return resolve2([]);
        var remaining = args.length;
        function res(i2, val) {
          try {
            if (val && (typeof val === "object" || typeof val === "function")) {
              var then = val.then;
              if (typeof then === "function") {
                then.call(val, function(val2) {
                  res(i2, val2);
                }, reject2);
                return;
              }
            }
            args[i2] = val;
            if (--remaining === 0) {
              resolve2(args);
            }
          } catch (ex) {
            reject2(ex);
          }
        }
        for (var i = 0; i < args.length; i++) {
          res(i, args[i]);
        }
      });
    };
    Promise2.resolve = function(value) {
      if (value && typeof value === "object" && value.constructor === Promise2) {
        return value;
      }
      return new Promise2(function(resolve2) {
        resolve2(value);
      });
    };
    Promise2.reject = function(value) {
      return new Promise2(function(resolve2, reject2) {
        reject2(value);
      });
    };
    Promise2.race = function(values) {
      return new Promise2(function(resolve2, reject2) {
        for (var i = 0, len = values.length; i < len; i++) {
          values[i].then(resolve2, reject2);
        }
      });
    };
    Promise2._immediateFn = typeof setImmediate === "function" && function(fn) {
      setImmediate(fn);
    } || function(fn) {
      setTimeoutFunc(fn, 0);
    };
    Promise2._unhandledRejectionFn = function _unhandledRejectionFn(err) {
      if (typeof console !== "undefined" && console) {
        console.warn("Possible Unhandled Promise Rejection:", err);
      }
    };
    Promise2._setImmediateFn = function _setImmediateFn(fn) {
      Promise2._immediateFn = fn;
    };
    Promise2._setUnhandledRejectionFn = function _setUnhandledRejectionFn(fn) {
      Promise2._unhandledRejectionFn = fn;
    };
    if (typeof module2 !== "undefined" && module2.exports) {
      module2.exports = Promise2;
    } else if (!root.Promise) {
      root.Promise = Promise2;
    }
  })(exports2);
});

// node_modules/child-process-promise/lib/ChildProcessPromise.js
var require_ChildProcessPromise = __commonJS((exports2, module2) => {
  "use strict";
  var Promise2;
  if (require_node_version().major >= 4) {
    Promise2 = global.Promise;
  } else {
    Promise2 = require_promise();
  }
  var ChildProcessPromise = class extends Promise2 {
    constructor(executor) {
      var resolve;
      var reject;
      super((_resolve, _reject) => {
        resolve = _resolve;
        reject = _reject;
        if (executor) {
          executor(resolve, reject);
        }
      });
      this._cpResolve = resolve;
      this._cpReject = reject;
      this.childProcess = void 0;
    }
    progress(callback) {
      process.nextTick(() => {
        callback(this.childProcess);
      });
      return this;
    }
    then(onFulfilled, onRejected) {
      var newPromise = super.then(onFulfilled, onRejected);
      newPromise.childProcess = this.childProcess;
      return newPromise;
    }
    catch(onRejected) {
      var newPromise = super.catch(onRejected);
      newPromise.childProcess = this.childProcess;
      return newPromise;
    }
    done() {
      this.catch((e) => {
        process.nextTick(() => {
          throw e;
        });
      });
    }
  };
  ChildProcessPromise.prototype.fail = ChildProcessPromise.prototype.catch;
  module2.exports = ChildProcessPromise;
});

// node_modules/child-process-promise/lib/ChildProcessError.js
var require_ChildProcessError = __commonJS((exports2, module2) => {
  "use strict";
  var ChildProcessError = class extends Error {
    constructor(message, code, childProcess, stdout, stderr) {
      super(message);
      Error.captureStackTrace(this, this.constructor);
      this.name = this.constructor.name;
      this.code = code;
      this.childProcess = childProcess;
      this.stdout = stdout;
      this.stderr = stderr;
    }
  };
  module2.exports = ChildProcessError;
});

// node_modules/child-process-promise/lib/index.js
var require_lib = __commonJS((exports2) => {
  "use strict";
  var child_process = require("child_process");
  var crossSpawn = require_cross_spawn();
  var ChildProcessPromise = require_ChildProcessPromise();
  var ChildProcessError = require_ChildProcessError();
  var slice = Array.prototype.slice;
  function doExec(method, args) {
    var cp;
    var cpPromise = new ChildProcessPromise();
    var reject = cpPromise._cpReject;
    var resolve = cpPromise._cpResolve;
    var finalArgs = slice.call(args, 0);
    finalArgs.push(callback);
    cp = child_process[method].apply(child_process, finalArgs);
    function callback(err, stdout, stderr) {
      if (err) {
        var commandStr = args[0] + (Array.isArray(args[1]) ? " " + args[1].join(" ") : "");
        err.message += " `" + commandStr + "` (exited with error code " + err.code + ")";
        err.stdout = stdout;
        err.stderr = stderr;
        var cpError = new ChildProcessError(err.message, err.code, child_process, stdout, stderr);
        reject(cpError);
      } else {
        resolve({
          childProcess: cp,
          stdout,
          stderr
        });
      }
    }
    cpPromise.childProcess = cp;
    return cpPromise;
  }
  function exec2() {
    return doExec("exec", arguments);
  }
  function execFile() {
    return doExec("execFile", arguments);
  }
  function doSpawn(method, command, args, options) {
    var result = {};
    var cp;
    var cpPromise = new ChildProcessPromise();
    var reject = cpPromise._cpReject;
    var resolve = cpPromise._cpResolve;
    var successfulExitCodes = options && options.successfulExitCodes || [0];
    cp = method(command, args, options);
    var captureStdout = false;
    var captureStderr = false;
    var capture = options && options.capture;
    if (capture) {
      for (var i = 0, len = capture.length; i < len; i++) {
        var cur = capture[i];
        if (cur === "stdout") {
          captureStdout = true;
        } else if (cur === "stderr") {
          captureStderr = true;
        }
      }
    }
    result.childProcess = cp;
    if (captureStdout) {
      result.stdout = "";
      cp.stdout.on("data", function(data) {
        result.stdout += data;
      });
    }
    if (captureStderr) {
      result.stderr = "";
      cp.stderr.on("data", function(data) {
        result.stderr += data;
      });
    }
    cp.on("error", reject);
    cp.on("close", function(code) {
      if (successfulExitCodes.indexOf(code) === -1) {
        var commandStr = command + (args.length ? " " + args.join(" ") : "");
        var message = "`" + commandStr + "` failed with code " + code;
        var err = new ChildProcessError(message, code, cp);
        if (captureStderr) {
          err.stderr = result.stderr.toString();
        }
        if (captureStdout) {
          err.stdout = result.stdout.toString();
        }
        reject(err);
      } else {
        result.code = code;
        resolve(result);
      }
    });
    cpPromise.childProcess = cp;
    return cpPromise;
  }
  function spawn(command, args, options) {
    return doSpawn(crossSpawn, command, args, options);
  }
  function fork(modulePath, args, options) {
    return doSpawn(child_process.fork, modulePath, args, options);
  }
  exports2.exec = exec2;
  exports2.execFile = execFile;
  exports2.spawn = spawn;
  exports2.fork = fork;
});

// node_modules/child-process-promise/lib-es5/ChildProcessPromise.js
var require_ChildProcessPromise2 = __commonJS((exports2, module2) => {
  "use strict";
  var _createClass = function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  var _get = function get(object, property, receiver) {
    if (object === null)
      object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);
    if (desc === void 0) {
      var parent = Object.getPrototypeOf(object);
      if (parent === null) {
        return void 0;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;
      if (getter === void 0) {
        return void 0;
      }
      return getter.call(receiver);
    }
  };
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {value: subClass, enumerable: false, writable: true, configurable: true}});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  var Promise2;
  if (require_node_version().major >= 4) {
    Promise2 = global.Promise;
  } else {
    Promise2 = require_promise();
  }
  var ChildProcessPromise = function(_Promise) {
    _inherits(ChildProcessPromise2, _Promise);
    function ChildProcessPromise2(executor) {
      _classCallCheck(this, ChildProcessPromise2);
      var resolve;
      var reject;
      var _this = _possibleConstructorReturn(this, (ChildProcessPromise2.__proto__ || Object.getPrototypeOf(ChildProcessPromise2)).call(this, function(_resolve, _reject) {
        resolve = _resolve;
        reject = _reject;
        if (executor) {
          executor(resolve, reject);
        }
      }));
      _this._cpResolve = resolve;
      _this._cpReject = reject;
      _this.childProcess = void 0;
      return _this;
    }
    _createClass(ChildProcessPromise2, [{
      key: "progress",
      value: function progress(callback) {
        var _this2 = this;
        process.nextTick(function() {
          callback(_this2.childProcess);
        });
        return this;
      }
    }, {
      key: "then",
      value: function then(onFulfilled, onRejected) {
        var newPromise = _get(ChildProcessPromise2.prototype.__proto__ || Object.getPrototypeOf(ChildProcessPromise2.prototype), "then", this).call(this, onFulfilled, onRejected);
        newPromise.childProcess = this.childProcess;
        return newPromise;
      }
    }, {
      key: "catch",
      value: function _catch(onRejected) {
        var newPromise = _get(ChildProcessPromise2.prototype.__proto__ || Object.getPrototypeOf(ChildProcessPromise2.prototype), "catch", this).call(this, onRejected);
        newPromise.childProcess = this.childProcess;
        return newPromise;
      }
    }, {
      key: "done",
      value: function done() {
        this.catch(function(e) {
          process.nextTick(function() {
            throw e;
          });
        });
      }
    }]);
    return ChildProcessPromise2;
  }(Promise2);
  ChildProcessPromise.prototype.fail = ChildProcessPromise.prototype.catch;
  module2.exports = ChildProcessPromise;
});

// node_modules/child-process-promise/lib-es5/ChildProcessError.js
var require_ChildProcessError2 = __commonJS((exports2, module2) => {
  "use strict";
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {value: subClass, enumerable: false, writable: true, configurable: true}});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  var ChildProcessError = function(_Error) {
    _inherits(ChildProcessError2, _Error);
    function ChildProcessError2(message, code, childProcess, stdout, stderr) {
      _classCallCheck(this, ChildProcessError2);
      var _this = _possibleConstructorReturn(this, (ChildProcessError2.__proto__ || Object.getPrototypeOf(ChildProcessError2)).call(this, message));
      Error.captureStackTrace(_this, _this.constructor);
      _this.name = _this.constructor.name;
      _this.code = code;
      _this.childProcess = childProcess;
      _this.stdout = stdout;
      _this.stderr = stderr;
      return _this;
    }
    return ChildProcessError2;
  }(Error);
  module2.exports = ChildProcessError;
});

// node_modules/child-process-promise/lib-es5/index.js
var require_lib_es5 = __commonJS((exports2) => {
  "use strict";
  var child_process = require("child_process");
  var crossSpawn = require_cross_spawn();
  var ChildProcessPromise = require_ChildProcessPromise2();
  var ChildProcessError = require_ChildProcessError2();
  var slice = Array.prototype.slice;
  function doExec(method, args) {
    var cp;
    var cpPromise = new ChildProcessPromise();
    var reject = cpPromise._cpReject;
    var resolve = cpPromise._cpResolve;
    var finalArgs = slice.call(args, 0);
    finalArgs.push(callback);
    cp = child_process[method].apply(child_process, finalArgs);
    function callback(err, stdout, stderr) {
      if (err) {
        var commandStr = args[0] + (Array.isArray(args[1]) ? " " + args[1].join(" ") : "");
        err.message += " `" + commandStr + "` (exited with error code " + err.code + ")";
        err.stdout = stdout;
        err.stderr = stderr;
        var cpError = new ChildProcessError(err.message, err.code, child_process, stdout, stderr);
        reject(cpError);
      } else {
        resolve({
          childProcess: cp,
          stdout,
          stderr
        });
      }
    }
    cpPromise.childProcess = cp;
    return cpPromise;
  }
  function exec2() {
    return doExec("exec", arguments);
  }
  function execFile() {
    return doExec("execFile", arguments);
  }
  function doSpawn(method, command, args, options) {
    var result = {};
    var cp;
    var cpPromise = new ChildProcessPromise();
    var reject = cpPromise._cpReject;
    var resolve = cpPromise._cpResolve;
    var successfulExitCodes = options && options.successfulExitCodes || [0];
    cp = method(command, args, options);
    var captureStdout = false;
    var captureStderr = false;
    var capture = options && options.capture;
    if (capture) {
      for (var i = 0, len = capture.length; i < len; i++) {
        var cur = capture[i];
        if (cur === "stdout") {
          captureStdout = true;
        } else if (cur === "stderr") {
          captureStderr = true;
        }
      }
    }
    result.childProcess = cp;
    if (captureStdout) {
      result.stdout = "";
      cp.stdout.on("data", function(data) {
        result.stdout += data;
      });
    }
    if (captureStderr) {
      result.stderr = "";
      cp.stderr.on("data", function(data) {
        result.stderr += data;
      });
    }
    cp.on("error", reject);
    cp.on("close", function(code) {
      if (successfulExitCodes.indexOf(code) === -1) {
        var commandStr = command + (args.length ? " " + args.join(" ") : "");
        var message = "`" + commandStr + "` failed with code " + code;
        var err = new ChildProcessError(message, code, cp);
        if (captureStderr) {
          err.stderr = result.stderr.toString();
        }
        if (captureStdout) {
          err.stdout = result.stdout.toString();
        }
        reject(err);
      } else {
        result.code = code;
        resolve(result);
      }
    });
    cpPromise.childProcess = cp;
    return cpPromise;
  }
  function spawn(command, args, options) {
    return doSpawn(crossSpawn, command, args, options);
  }
  function fork(modulePath, args, options) {
    return doSpawn(child_process.fork, modulePath, args, options);
  }
  exports2.exec = exec2;
  exports2.execFile = execFile;
  exports2.spawn = spawn;
  exports2.fork = fork;
});

// node_modules/child-process-promise/index.js
var require_child_process_promise = __commonJS((exports2, module2) => {
  "use strict";
  if (require_node_version().major >= 4) {
    module2.exports = require_lib();
  } else {
    module2.exports = require_lib_es5();
  }
});

// node_modules/wildcard/index.js
var require_wildcard = __commonJS((exports2, module2) => {
  "use strict";
  var REGEXP_PARTS = /(\*|\?)/g;
  function WildcardMatcher(text, separator) {
    this.text = text = text || "";
    this.hasWild = text.indexOf("*") >= 0;
    this.separator = separator;
    this.parts = text.split(separator).map(this.classifyPart.bind(this));
  }
  WildcardMatcher.prototype.match = function(input) {
    var matches = true;
    var parts = this.parts;
    var ii;
    var partsCount = parts.length;
    var testParts;
    if (typeof input == "string" || input instanceof String) {
      if (!this.hasWild && this.text != input) {
        matches = false;
      } else {
        testParts = (input || "").split(this.separator);
        for (ii = 0; matches && ii < partsCount; ii++) {
          if (parts[ii] === "*") {
            continue;
          } else if (ii < testParts.length) {
            matches = parts[ii] instanceof RegExp ? parts[ii].test(testParts[ii]) : parts[ii] === testParts[ii];
          } else {
            matches = false;
          }
        }
        matches = matches && testParts;
      }
    } else if (typeof input.splice == "function") {
      matches = [];
      for (ii = input.length; ii--; ) {
        if (this.match(input[ii])) {
          matches[matches.length] = input[ii];
        }
      }
    } else if (typeof input == "object") {
      matches = {};
      for (var key in input) {
        if (this.match(key)) {
          matches[key] = input[key];
        }
      }
    }
    return matches;
  };
  WildcardMatcher.prototype.classifyPart = function(part) {
    if (part === "*") {
      return part;
    } else if (part.indexOf("*") >= 0 || part.indexOf("?") >= 0) {
      return new RegExp(part.replace(REGEXP_PARTS, ".$1"));
    }
    return part;
  };
  module2.exports = function(text, test, separator) {
    var matcher = new WildcardMatcher(text, separator || /[\/\.]/);
    if (typeof test != "undefined") {
      return matcher.match(test);
    }
    return matcher;
  };
});

// node_modules/webpack-merge/dist/merge-with.js
var require_merge_with = __commonJS((exports2) => {
  "use strict";
  var __read = exports2 && exports2.__read || function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
      return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
        ar.push(r.value);
    } catch (error) {
      e = {error};
    } finally {
      try {
        if (r && !r.done && (m = i["return"]))
          m.call(i);
      } finally {
        if (e)
          throw e.error;
      }
    }
    return ar;
  };
  exports2.__esModule = true;
  function mergeWith(objects, customizer) {
    var _a = __read(objects), first = _a[0], rest = _a.slice(1);
    var ret = first;
    rest.forEach(function(a) {
      ret = mergeTo(ret, a, customizer);
    });
    return ret;
  }
  function mergeTo(a, b, customizer) {
    var ret = {};
    Object.keys(a).concat(Object.keys(b)).forEach(function(k) {
      var v = customizer(a[k], b[k], k);
      ret[k] = typeof v === "undefined" ? a[k] : v;
    });
    return ret;
  }
  exports2["default"] = mergeWith;
});

// node_modules/kind-of/index.js
var require_kind_of = __commonJS((exports2, module2) => {
  var toString = Object.prototype.toString;
  module2.exports = function kindOf(val) {
    if (val === void 0)
      return "undefined";
    if (val === null)
      return "null";
    var type = typeof val;
    if (type === "boolean")
      return "boolean";
    if (type === "string")
      return "string";
    if (type === "number")
      return "number";
    if (type === "symbol")
      return "symbol";
    if (type === "function") {
      return isGeneratorFn(val) ? "generatorfunction" : "function";
    }
    if (isArray(val))
      return "array";
    if (isBuffer(val))
      return "buffer";
    if (isArguments(val))
      return "arguments";
    if (isDate(val))
      return "date";
    if (isError(val))
      return "error";
    if (isRegexp(val))
      return "regexp";
    switch (ctorName(val)) {
      case "Symbol":
        return "symbol";
      case "Promise":
        return "promise";
      case "WeakMap":
        return "weakmap";
      case "WeakSet":
        return "weakset";
      case "Map":
        return "map";
      case "Set":
        return "set";
      case "Int8Array":
        return "int8array";
      case "Uint8Array":
        return "uint8array";
      case "Uint8ClampedArray":
        return "uint8clampedarray";
      case "Int16Array":
        return "int16array";
      case "Uint16Array":
        return "uint16array";
      case "Int32Array":
        return "int32array";
      case "Uint32Array":
        return "uint32array";
      case "Float32Array":
        return "float32array";
      case "Float64Array":
        return "float64array";
    }
    if (isGeneratorObj(val)) {
      return "generator";
    }
    type = toString.call(val);
    switch (type) {
      case "[object Object]":
        return "object";
      case "[object Map Iterator]":
        return "mapiterator";
      case "[object Set Iterator]":
        return "setiterator";
      case "[object String Iterator]":
        return "stringiterator";
      case "[object Array Iterator]":
        return "arrayiterator";
    }
    return type.slice(8, -1).toLowerCase().replace(/\s/g, "");
  };
  function ctorName(val) {
    return typeof val.constructor === "function" ? val.constructor.name : null;
  }
  function isArray(val) {
    if (Array.isArray)
      return Array.isArray(val);
    return val instanceof Array;
  }
  function isError(val) {
    return val instanceof Error || typeof val.message === "string" && val.constructor && typeof val.constructor.stackTraceLimit === "number";
  }
  function isDate(val) {
    if (val instanceof Date)
      return true;
    return typeof val.toDateString === "function" && typeof val.getDate === "function" && typeof val.setDate === "function";
  }
  function isRegexp(val) {
    if (val instanceof RegExp)
      return true;
    return typeof val.flags === "string" && typeof val.ignoreCase === "boolean" && typeof val.multiline === "boolean" && typeof val.global === "boolean";
  }
  function isGeneratorFn(name, val) {
    return ctorName(name) === "GeneratorFunction";
  }
  function isGeneratorObj(val) {
    return typeof val.throw === "function" && typeof val.return === "function" && typeof val.next === "function";
  }
  function isArguments(val) {
    try {
      if (typeof val.length === "number" && typeof val.callee === "function") {
        return true;
      }
    } catch (err) {
      if (err.message.indexOf("callee") !== -1) {
        return true;
      }
    }
    return false;
  }
  function isBuffer(val) {
    if (val.constructor && typeof val.constructor.isBuffer === "function") {
      return val.constructor.isBuffer(val);
    }
    return false;
  }
});

// node_modules/shallow-clone/index.js
var require_shallow_clone = __commonJS((exports2, module2) => {
  /*!
   * shallow-clone <https://github.com/jonschlinkert/shallow-clone>
   *
   * Copyright (c) 2015-present, Jon Schlinkert.
   * Released under the MIT License.
   */
  "use strict";
  var valueOf = Symbol.prototype.valueOf;
  var typeOf = require_kind_of();
  function clone(val, deep) {
    switch (typeOf(val)) {
      case "array":
        return val.slice();
      case "object":
        return Object.assign({}, val);
      case "date":
        return new val.constructor(Number(val));
      case "map":
        return new Map(val);
      case "set":
        return new Set(val);
      case "buffer":
        return cloneBuffer(val);
      case "symbol":
        return cloneSymbol(val);
      case "arraybuffer":
        return cloneArrayBuffer(val);
      case "float32array":
      case "float64array":
      case "int16array":
      case "int32array":
      case "int8array":
      case "uint16array":
      case "uint32array":
      case "uint8clampedarray":
      case "uint8array":
        return cloneTypedArray(val);
      case "regexp":
        return cloneRegExp(val);
      case "error":
        return Object.create(val);
      default: {
        return val;
      }
    }
  }
  function cloneRegExp(val) {
    const flags = val.flags !== void 0 ? val.flags : /\w+$/.exec(val) || void 0;
    const re = new val.constructor(val.source, flags);
    re.lastIndex = val.lastIndex;
    return re;
  }
  function cloneArrayBuffer(val) {
    const res = new val.constructor(val.byteLength);
    new Uint8Array(res).set(new Uint8Array(val));
    return res;
  }
  function cloneTypedArray(val, deep) {
    return new val.constructor(val.buffer, val.byteOffset, val.length);
  }
  function cloneBuffer(val) {
    const len = val.length;
    const buf = Buffer.allocUnsafe ? Buffer.allocUnsafe(len) : Buffer.from(len);
    val.copy(buf);
    return buf;
  }
  function cloneSymbol(val) {
    return valueOf ? Object(valueOf.call(val)) : {};
  }
  module2.exports = clone;
});

// node_modules/isobject/index.js
var require_isobject = __commonJS((exports2, module2) => {
  /*!
   * isobject <https://github.com/jonschlinkert/isobject>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   */
  "use strict";
  module2.exports = function isObject(val) {
    return val != null && typeof val === "object" && Array.isArray(val) === false;
  };
});

// node_modules/is-plain-object/index.js
var require_is_plain_object = __commonJS((exports2, module2) => {
  /*!
   * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   */
  "use strict";
  var isObject = require_isobject();
  function isObjectObject(o) {
    return isObject(o) === true && Object.prototype.toString.call(o) === "[object Object]";
  }
  module2.exports = function isPlainObject(o) {
    var ctor, prot;
    if (isObjectObject(o) === false)
      return false;
    ctor = o.constructor;
    if (typeof ctor !== "function")
      return false;
    prot = ctor.prototype;
    if (isObjectObject(prot) === false)
      return false;
    if (prot.hasOwnProperty("isPrototypeOf") === false) {
      return false;
    }
    return true;
  };
});

// node_modules/clone-deep/index.js
var require_clone_deep = __commonJS((exports2, module2) => {
  "use strict";
  var clone = require_shallow_clone();
  var typeOf = require_kind_of();
  var isPlainObject = require_is_plain_object();
  function cloneDeep(val, instanceClone) {
    switch (typeOf(val)) {
      case "object":
        return cloneObjectDeep(val, instanceClone);
      case "array":
        return cloneArrayDeep(val, instanceClone);
      default: {
        return clone(val);
      }
    }
  }
  function cloneObjectDeep(val, instanceClone) {
    if (typeof instanceClone === "function") {
      return instanceClone(val);
    }
    if (instanceClone || isPlainObject(val)) {
      const res = new val.constructor();
      for (let key in val) {
        res[key] = cloneDeep(val[key], instanceClone);
      }
      return res;
    }
    return val;
  }
  function cloneArrayDeep(val, instanceClone) {
    const res = new val.constructor(val.length);
    for (let i = 0; i < val.length; i++) {
      res[i] = cloneDeep(val[i], instanceClone);
    }
    return res;
  }
  module2.exports = cloneDeep;
});

// node_modules/webpack-merge/dist/utils.js
var require_utils2 = __commonJS((exports2) => {
  "use strict";
  exports2.__esModule = true;
  exports2.isUndefined = exports2.isPlainObject = exports2.isFunction = exports2.isRegex = void 0;
  function isRegex(o) {
    return o instanceof RegExp;
  }
  exports2.isRegex = isRegex;
  function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === "[object Function]";
  }
  exports2.isFunction = isFunction;
  function isPlainObject(a) {
    if (a === null || Array.isArray(a)) {
      return false;
    }
    return typeof a === "object";
  }
  exports2.isPlainObject = isPlainObject;
  function isUndefined(a) {
    return typeof a === "undefined";
  }
  exports2.isUndefined = isUndefined;
});

// node_modules/webpack-merge/dist/join-arrays.js
var require_join_arrays = __commonJS((exports2) => {
  "use strict";
  var __read = exports2 && exports2.__read || function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
      return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
        ar.push(r.value);
    } catch (error) {
      e = {error};
    } finally {
      try {
        if (r && !r.done && (m = i["return"]))
          m.call(i);
      } finally {
        if (e)
          throw e.error;
      }
    }
    return ar;
  };
  var __spread = exports2 && exports2.__spread || function() {
    for (var ar = [], i = 0; i < arguments.length; i++)
      ar = ar.concat(__read(arguments[i]));
    return ar;
  };
  var __importDefault = exports2 && exports2.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
  exports2.__esModule = true;
  var clone_deep_1 = __importDefault(require_clone_deep());
  var merge_with_1 = __importDefault(require_merge_with());
  var utils_1 = require_utils2();
  var isArray = Array.isArray;
  function joinArrays(_a) {
    var _b = _a === void 0 ? {} : _a, customizeArray = _b.customizeArray, customizeObject = _b.customizeObject, key = _b.key;
    return function _joinArrays(a, b, k) {
      var newKey = key ? key + "." + k : k;
      if (utils_1.isFunction(a) && utils_1.isFunction(b)) {
        return function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          return _joinArrays(a.apply(void 0, __spread(args)), b.apply(void 0, __spread(args)), k);
        };
      }
      if (isArray(a) && isArray(b)) {
        var customResult = customizeArray && customizeArray(a, b, newKey);
        return customResult || __spread(a, b);
      }
      if (utils_1.isRegex(b)) {
        return b;
      }
      if (utils_1.isPlainObject(a) && utils_1.isPlainObject(b)) {
        var customResult = customizeObject && customizeObject(a, b, newKey);
        return customResult || merge_with_1["default"]([a, b], joinArrays({
          customizeArray,
          customizeObject,
          key: newKey
        }));
      }
      if (utils_1.isPlainObject(b)) {
        return clone_deep_1["default"](b);
      }
      if (isArray(b)) {
        return __spread(b);
      }
      return b;
    };
  }
  exports2["default"] = joinArrays;
});

// node_modules/webpack-merge/dist/unique.js
var require_unique = __commonJS((exports2) => {
  "use strict";
  var __read = exports2 && exports2.__read || function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
      return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
        ar.push(r.value);
    } catch (error) {
      e = {error};
    } finally {
      try {
        if (r && !r.done && (m = i["return"]))
          m.call(i);
      } finally {
        if (e)
          throw e.error;
      }
    }
    return ar;
  };
  var __spread = exports2 && exports2.__spread || function() {
    for (var ar = [], i = 0; i < arguments.length; i++)
      ar = ar.concat(__read(arguments[i]));
    return ar;
  };
  exports2.__esModule = true;
  function mergeUnique(key, uniques, getter) {
    var uniquesSet = new Set(uniques);
    return function(a, b, k) {
      return k === key && Array.from(__spread(a, b).map(function(it) {
        return {key: getter(it), value: it};
      }).map(function(_a) {
        var key2 = _a.key, value = _a.value;
        return {key: uniquesSet.has(key2) ? key2 : value, value};
      }).reduce(function(m, _a) {
        var key2 = _a.key, value = _a.value;
        m["delete"](key2);
        return m.set(key2, value);
      }, new Map()).values());
    };
  }
  exports2["default"] = mergeUnique;
});

// node_modules/webpack-merge/dist/types.js
var require_types = __commonJS((exports2) => {
  "use strict";
  exports2.__esModule = true;
  exports2.CustomizeRule = void 0;
  var CustomizeRule;
  (function(CustomizeRule2) {
    CustomizeRule2["Match"] = "match";
    CustomizeRule2["Merge"] = "merge";
    CustomizeRule2["Append"] = "append";
    CustomizeRule2["Prepend"] = "prepend";
    CustomizeRule2["Replace"] = "replace";
  })(CustomizeRule = exports2.CustomizeRule || (exports2.CustomizeRule = {}));
});

// node_modules/webpack-merge/dist/index.js
var require_dist = __commonJS((exports2) => {
  "use strict";
  var __assign = exports2 && exports2.__assign || function() {
    __assign = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
      }
      return t;
    };
    return __assign.apply(this, arguments);
  };
  var __read = exports2 && exports2.__read || function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
      return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
        ar.push(r.value);
    } catch (error) {
      e = {error};
    } finally {
      try {
        if (r && !r.done && (m = i["return"]))
          m.call(i);
      } finally {
        if (e)
          throw e.error;
      }
    }
    return ar;
  };
  var __spread = exports2 && exports2.__spread || function() {
    for (var ar = [], i = 0; i < arguments.length; i++)
      ar = ar.concat(__read(arguments[i]));
    return ar;
  };
  var __importDefault = exports2 && exports2.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
  exports2.__esModule = true;
  exports2.unique = exports2.mergeWithRules = exports2.mergeWithCustomize = exports2["default"] = exports2.merge = exports2.CustomizeRule = exports2.customizeObject = exports2.customizeArray = void 0;
  var wildcard_1 = __importDefault(require_wildcard());
  var merge_with_1 = __importDefault(require_merge_with());
  var join_arrays_1 = __importDefault(require_join_arrays());
  var unique_1 = __importDefault(require_unique());
  exports2.unique = unique_1["default"];
  var types_1 = require_types();
  exports2.CustomizeRule = types_1.CustomizeRule;
  var utils_1 = require_utils2();
  function merge(firstConfiguration) {
    var configurations = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      configurations[_i - 1] = arguments[_i];
    }
    return mergeWithCustomize({}).apply(void 0, __spread([firstConfiguration], configurations));
  }
  exports2.merge = merge;
  exports2["default"] = merge;
  function mergeWithCustomize(options) {
    return function mergeWithOptions(firstConfiguration) {
      var configurations = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        configurations[_i - 1] = arguments[_i];
      }
      if (utils_1.isUndefined(firstConfiguration) || configurations.some(utils_1.isUndefined)) {
        throw new TypeError("Merging undefined is not supported");
      }
      if (firstConfiguration.then) {
        throw new TypeError("Promises are not supported");
      }
      if (!firstConfiguration) {
        return {};
      }
      if (configurations.length === 0) {
        if (Array.isArray(firstConfiguration)) {
          if (firstConfiguration.length === 0) {
            return {};
          }
          if (firstConfiguration.some(utils_1.isUndefined)) {
            throw new TypeError("Merging undefined is not supported");
          }
          if (firstConfiguration[0].then) {
            throw new TypeError("Promises are not supported");
          }
          return merge_with_1["default"](firstConfiguration, join_arrays_1["default"](options));
        }
        return firstConfiguration;
      }
      return merge_with_1["default"]([firstConfiguration].concat(configurations), join_arrays_1["default"](options));
    };
  }
  exports2.mergeWithCustomize = mergeWithCustomize;
  function customizeArray(rules) {
    return function(a, b, key) {
      var matchedRule = Object.keys(rules).find(function(rule) {
        return wildcard_1["default"](rule, key);
      }) || "";
      if (matchedRule) {
        switch (rules[matchedRule]) {
          case types_1.CustomizeRule.Prepend:
            return __spread(b, a);
          case types_1.CustomizeRule.Replace:
            return b;
          case types_1.CustomizeRule.Append:
          default:
            return __spread(a, b);
        }
      }
    };
  }
  exports2.customizeArray = customizeArray;
  function mergeWithRules(rules) {
    return mergeWithCustomize({
      customizeArray: function(a, b, key) {
        var currentRule = rules;
        key.split(".").forEach(function(k) {
          if (!currentRule) {
            return;
          }
          currentRule = currentRule[k];
        });
        if (utils_1.isPlainObject(currentRule)) {
          return mergeWithRule({currentRule, a, b});
        }
        if (typeof currentRule === "string") {
          return mergeIndividualRule({currentRule, a, b});
        }
        return void 0;
      }
    });
  }
  exports2.mergeWithRules = mergeWithRules;
  var isArray = Array.isArray;
  function mergeWithRule(_a) {
    var currentRule = _a.currentRule, a = _a.a, b = _a.b;
    if (!isArray(a)) {
      return a;
    }
    var bAllMatches = [];
    var ret = a.map(function(ao) {
      if (!utils_1.isPlainObject(currentRule)) {
        return ao;
      }
      var ret2 = {};
      var rulesToMatch = [];
      var operations = {};
      Object.entries(currentRule).forEach(function(_a2) {
        var _b = __read(_a2, 2), k = _b[0], v = _b[1];
        if (v === types_1.CustomizeRule.Match) {
          rulesToMatch.push(k);
        } else {
          operations[k] = v;
        }
      });
      var bMatches = b.filter(function(o) {
        var matches = rulesToMatch.every(function(rule) {
          var _a2, _b;
          return ((_a2 = ao[rule]) === null || _a2 === void 0 ? void 0 : _a2.toString()) === ((_b = o[rule]) === null || _b === void 0 ? void 0 : _b.toString());
        });
        if (matches) {
          bAllMatches.push(o);
        }
        return matches;
      });
      if (!utils_1.isPlainObject(ao)) {
        return ao;
      }
      Object.entries(ao).forEach(function(_a2) {
        var _b = __read(_a2, 2), k = _b[0], v = _b[1];
        var rule = currentRule;
        switch (currentRule[k]) {
          case types_1.CustomizeRule.Match:
            ret2[k] = v;
            Object.entries(rule).forEach(function(_a3) {
              var _b2 = __read(_a3, 2), k2 = _b2[0], v2 = _b2[1];
              if (v2 === types_1.CustomizeRule.Replace && bMatches.length > 0) {
                var val = last(bMatches)[k2];
                if (typeof val !== "undefined") {
                  ret2[k2] = val;
                }
              }
            });
            break;
          case types_1.CustomizeRule.Append:
            if (!bMatches.length) {
              ret2[k] = v;
              break;
            }
            var appendValue = last(bMatches)[k];
            if (!isArray(v) || !isArray(appendValue)) {
              throw new TypeError("Trying to append non-arrays");
            }
            ret2[k] = v.concat(appendValue);
            break;
          case types_1.CustomizeRule.Merge:
            if (!bMatches.length) {
              ret2[k] = v;
              break;
            }
            var lastValue = last(bMatches)[k];
            if (!utils_1.isPlainObject(v) || !utils_1.isPlainObject(lastValue)) {
              throw new TypeError("Trying to merge non-objects");
            }
            ret2[k] = __assign(__assign({}, v), lastValue);
            break;
          case types_1.CustomizeRule.Prepend:
            if (!bMatches.length) {
              ret2[k] = v;
              break;
            }
            var prependValue = last(bMatches)[k];
            if (!isArray(v) || !isArray(prependValue)) {
              throw new TypeError("Trying to prepend non-arrays");
            }
            ret2[k] = prependValue.concat(v);
            break;
          case types_1.CustomizeRule.Replace:
            ret2[k] = bMatches.length > 0 ? last(bMatches)[k] : v;
            break;
          default:
            var currentRule_1 = operations[k];
            var b_1 = bMatches.map(function(o) {
              return o[k];
            }).reduce(function(acc, val) {
              return isArray(acc) && isArray(val) ? __spread(acc, val) : acc;
            }, []);
            ret2[k] = mergeWithRule({currentRule: currentRule_1, a: v, b: b_1});
            break;
        }
      });
      return ret2;
    });
    return ret.concat(b.filter(function(o) {
      return !bAllMatches.includes(o);
    }));
  }
  function mergeIndividualRule(_a) {
    var currentRule = _a.currentRule, a = _a.a, b = _a.b;
    switch (currentRule) {
      case types_1.CustomizeRule.Append:
        return a.concat(b);
      case types_1.CustomizeRule.Prepend:
        return b.concat(a);
      case types_1.CustomizeRule.Replace:
        return b;
    }
    return a;
  }
  function last(arr) {
    return arr[arr.length - 1];
  }
  function customizeObject(rules) {
    return function(a, b, key) {
      switch (rules[key]) {
        case types_1.CustomizeRule.Prepend:
          return merge_with_1["default"]([b, a], join_arrays_1["default"]());
        case types_1.CustomizeRule.Replace:
          return b;
        case types_1.CustomizeRule.Append:
          return merge_with_1["default"]([a, b], join_arrays_1["default"]());
      }
    };
  }
  exports2.customizeObject = customizeObject;
});

// src/config.ts
var require_config = __commonJS((exports2) => {
  __markAsModule(exports2);
  __export(exports2, {
    makeConfig: () => makeConfig
  });
  var import_path2 = __toModule(require("path"));
  var import_core2 = __toModule(require_core());
  var import_webpack_merge = __toModule(require_dist());
  var FederatedStatsPlugin = require("webpack-federated-stats-plugin");
  async function loadExposes() {
    const exposesInput = (0, import_core2.getInput)("exposes") || "./exposes.js";
    const exposesPath = import_path2.default.resolve(exposesInput);
    const exposesModule = require(exposesPath);
    return [
      await (typeof exposesModule === "function" ? exposesModule() : exposesModule),
      import_path2.default.dirname(exposesPath)
    ];
  }
  async function loadShared() {
    try {
      const sharedInput = (0, import_core2.getInput)("shared") || "./shared.js";
      const sharedPath = import_path2.default.resolve(sharedInput);
      const sharedModule = require(sharedPath);
      return [
        await (typeof sharedModule === "function" ? sharedModule() : sharedModule),
        import_path2.default.dirname(sharedPath)
      ];
    } catch (err) {
      (0, import_core2.warning)("Failed to load shared");
      (0, import_core2.warning)(err);
    }
    return [[]];
  }
  async function makeConfig() {
    const webpack = require("webpack");
    const [exposes, context] = await loadExposes();
    const [shared] = await loadShared();
    const configInput = (0, import_core2.getInput)("config") || "./webpack.config.js";
    const configPath = import_path2.default.resolve(configInput);
    let userConfig = {};
    try {
      userConfig = require(configPath);
    } catch (err) {
      (0, import_core2.warning)("No webpack config found");
      (0, import_core2.warning)(err);
    }
    const defaultConfig = {
      context,
      entry: {noop: import_path2.default.resolve(__dirname, "../noop.js")},
      output: {
        path: import_path2.default.resolve(".container/client")
      },
      mode: "production"
    };
    if (!Array.isArray(userConfig)) {
      userConfig = [userConfig];
    }
    return userConfig.map((config) => {
      const baseConfig = (0, import_webpack_merge.merge)(defaultConfig, config, {});
      const federationConfig = {
        name: "test",
        exposes,
        shared
      };
      if (baseConfig.target !== "node") {
        baseConfig.plugins = baseConfig.plugins || [];
        baseConfig.plugins.push(new FederatedStatsPlugin({filename: "federation-stats.json"}));
      } else {
        baseConfig.output = baseConfig.output || {};
        baseConfig.output.path = import_path2.default.resolve(".container/server");
        if (!baseConfig.output.library) {
          baseConfig.output.library = {type: "commonjs"};
        }
        federationConfig.library = {type: "commonjs"};
      }
      baseConfig.plugins = baseConfig.plugins || [];
      baseConfig.plugins.push(new webpack.container.ModuleFederationPlugin(federationConfig));
      return baseConfig;
    });
  }
});

// src/action.ts
var import_path = __toModule(require("path"));
var import_core = __toModule(require_core());
var {exec} = require_child_process_promise();
async function run() {
  const packageJson = require(import_path.default.resolve(__dirname, "../package.json"));
  (0, import_core.info)("Installing Dependencies");
  await exec(`npm install ${Object.entries(packageJson.dependencies).map(([pkg, version]) => `${pkg}@${version}`).join(" ")} --no-save`);
  (0, import_core.info)("Resolving Configuration");
  const config = await require_config().makeConfig();
  (0, import_core.info)("Building Container");
  const webpack = require("webpack");
  const runBuild = async (config2, idx) => {
    const stats = await new Promise((resolve, reject) => {
      webpack(config2, (err, stats2) => {
        if (err || stats2.hasErrors()) {
          stats2 && (0, import_core.info)(stats2.toString({colors: true}) + "\n\n");
          return reject(err || new Error("Build Failed"));
        }
        return resolve(stats2);
      });
    });
    (0, import_core.setOutput)(`path${idx}`, stats.compilation.outputOptions.path);
    (0, import_core.info)(stats.toString({colors: true}));
  };
  await Promise.all(config.map((cfg, idx) => runBuild(cfg, idx)));
}
run().catch((err) => {
  (0, import_core.setFailed)(err);
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL0BhY3Rpb25zL2NvcmUvc3JjL3V0aWxzLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9AYWN0aW9ucy9jb3JlL3NyYy9jb21tYW5kLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9AYWN0aW9ucy9jb3JlL3NyYy9maWxlLWNvbW1hbmQudHMiLCAiLi4vbm9kZV9tb2R1bGVzL0BhY3Rpb25zL2NvcmUvc3JjL2NvcmUudHMiLCAiLi4vbm9kZV9tb2R1bGVzL25vZGUtdmVyc2lvbi9pbmRleC5qcyIsICIuLi9ub2RlX21vZHVsZXMvcHNldWRvbWFwL3BzZXVkb21hcC5qcyIsICIuLi9ub2RlX21vZHVsZXMvcHNldWRvbWFwL21hcC5qcyIsICIuLi9ub2RlX21vZHVsZXMveWFsbGlzdC95YWxsaXN0LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9scnUtY2FjaGUvaW5kZXguanMiLCAiLi4vbm9kZV9tb2R1bGVzL2lzZXhlL3dpbmRvd3MuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2lzZXhlL21vZGUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2lzZXhlL2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy93aGljaC93aGljaC5qcyIsICIuLi9ub2RlX21vZHVsZXMvY3Jvc3Mtc3Bhd24vbGliL3Jlc29sdmVDb21tYW5kLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jcm9zcy1zcGF3bi9saWIvaGFzQnJva2VuU3Bhd24uanMiLCAiLi4vbm9kZV9tb2R1bGVzL2Nyb3NzLXNwYXduL2xpYi9wYXJzZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvY3Jvc3Mtc3Bhd24vbGliL2Vub2VudC5qcyIsICIuLi9ub2RlX21vZHVsZXMvY3Jvc3Mtc3Bhd24vaW5kZXguanMiLCAiLi4vbm9kZV9tb2R1bGVzL3Byb21pc2UtcG9seWZpbGwvcHJvbWlzZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvY2hpbGQtcHJvY2Vzcy1wcm9taXNlL2xpYi9DaGlsZFByb2Nlc3NQcm9taXNlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jaGlsZC1wcm9jZXNzLXByb21pc2UvbGliL0NoaWxkUHJvY2Vzc0Vycm9yLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jaGlsZC1wcm9jZXNzLXByb21pc2UvbGliL2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jaGlsZC1wcm9jZXNzLXByb21pc2UvbGliLWVzNS9DaGlsZFByb2Nlc3NQcm9taXNlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jaGlsZC1wcm9jZXNzLXByb21pc2UvbGliLWVzNS9DaGlsZFByb2Nlc3NFcnJvci5qcyIsICIuLi9ub2RlX21vZHVsZXMvY2hpbGQtcHJvY2Vzcy1wcm9taXNlL2xpYi1lczUvaW5kZXguanMiLCAiLi4vbm9kZV9tb2R1bGVzL2NoaWxkLXByb2Nlc3MtcHJvbWlzZS9pbmRleC5qcyIsICIuLi9ub2RlX21vZHVsZXMvd2lsZGNhcmQvaW5kZXguanMiLCAiLi4vbm9kZV9tb2R1bGVzL3dlYnBhY2stbWVyZ2Uvc3JjL21lcmdlLXdpdGgudHMiLCAiLi4vbm9kZV9tb2R1bGVzL2tpbmQtb2YvaW5kZXguanMiLCAiLi4vbm9kZV9tb2R1bGVzL3NoYWxsb3ctY2xvbmUvaW5kZXguanMiLCAiLi4vbm9kZV9tb2R1bGVzL2lzb2JqZWN0L2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9pcy1wbGFpbi1vYmplY3QvaW5kZXguanMiLCAiLi4vbm9kZV9tb2R1bGVzL2Nsb25lLWRlZXAvaW5kZXguanMiLCAiLi4vbm9kZV9tb2R1bGVzL3dlYnBhY2stbWVyZ2Uvc3JjL3V0aWxzLnRzIiwgIi4uL25vZGVfbW9kdWxlcy93ZWJwYWNrLW1lcmdlL3NyYy9qb2luLWFycmF5cy50cyIsICIuLi9ub2RlX21vZHVsZXMvd2VicGFjay1tZXJnZS9zcmMvdW5pcXVlLnRzIiwgIi4uL25vZGVfbW9kdWxlcy93ZWJwYWNrLW1lcmdlL3NyYy90eXBlcy50cyIsICIuLi9ub2RlX21vZHVsZXMvd2VicGFjay1tZXJnZS9zcmMvaW5kZXgudHMiLCAiLi4vc3JjL2NvbmZpZy50cyIsICIuLi9zcmMvYWN0aW9uLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogW251bGwsIG51bGwsIG51bGwsIG51bGwsICIvKiFcbiAqIG5vZGUtdmVyc2lvblxuICogQ29weXJpZ2h0KGMpIDIwMTEtMjAxOCBSb2RvbHBoZSBTdG9jbGluXG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcbiAgdmFyIHZlcnNpb24gPSBwcm9jZXNzLnZlcnNpb25zLm5vZGU7XG5cbiAgdmFyIHNwbGl0ID0gdmVyc2lvbi5zcGxpdCgnLicpO1xuXG4gIHJldHVybiB7XG4gICAgb3JpZ2luYWw6ICd2JyArIHZlcnNpb24sXG4gICAgc2hvcnQ6IHNwbGl0WzBdICsgJy4nICsgc3BsaXRbMV0sXG4gICAgbG9uZzogdmVyc2lvbixcbiAgICBtYWpvcjogc3BsaXRbMF0sXG4gICAgbWlub3I6IHNwbGl0WzFdLFxuICAgIGJ1aWxkOiBzcGxpdFsyXVxuICB9O1xufSkoKTtcbiIsICJ2YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5XG5cbm1vZHVsZS5leHBvcnRzID0gUHNldWRvTWFwXG5cbmZ1bmN0aW9uIFBzZXVkb01hcCAoc2V0KSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBQc2V1ZG9NYXApKSAvLyB3aHl5eXl5eXlcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ29uc3RydWN0b3IgUHNldWRvTWFwIHJlcXVpcmVzICduZXcnXCIpXG5cbiAgdGhpcy5jbGVhcigpXG5cbiAgaWYgKHNldCkge1xuICAgIGlmICgoc2V0IGluc3RhbmNlb2YgUHNldWRvTWFwKSB8fFxuICAgICAgICAodHlwZW9mIE1hcCA9PT0gJ2Z1bmN0aW9uJyAmJiBzZXQgaW5zdGFuY2VvZiBNYXApKVxuICAgICAgc2V0LmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgdGhpcy5zZXQoa2V5LCB2YWx1ZSlcbiAgICAgIH0sIHRoaXMpXG4gICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShzZXQpKVxuICAgICAgc2V0LmZvckVhY2goZnVuY3Rpb24gKGt2KSB7XG4gICAgICAgIHRoaXMuc2V0KGt2WzBdLCBrdlsxXSlcbiAgICAgIH0sIHRoaXMpXG4gICAgZWxzZVxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignaW52YWxpZCBhcmd1bWVudCcpXG4gIH1cbn1cblxuUHNldWRvTWFwLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGZuLCB0aGlzcCkge1xuICB0aGlzcCA9IHRoaXNwIHx8IHRoaXNcbiAgT2JqZWN0LmtleXModGhpcy5fZGF0YSkuZm9yRWFjaChmdW5jdGlvbiAoaykge1xuICAgIGlmIChrICE9PSAnc2l6ZScpXG4gICAgICBmbi5jYWxsKHRoaXNwLCB0aGlzLl9kYXRhW2tdLnZhbHVlLCB0aGlzLl9kYXRhW2tdLmtleSlcbiAgfSwgdGhpcylcbn1cblxuUHNldWRvTWFwLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAoaykge1xuICByZXR1cm4gISFmaW5kKHRoaXMuX2RhdGEsIGspXG59XG5cblBzZXVkb01hcC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGspIHtcbiAgdmFyIHJlcyA9IGZpbmQodGhpcy5fZGF0YSwgaylcbiAgcmV0dXJuIHJlcyAmJiByZXMudmFsdWVcbn1cblxuUHNldWRvTWFwLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAoaywgdikge1xuICBzZXQodGhpcy5fZGF0YSwgaywgdilcbn1cblxuUHNldWRvTWFwLnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbiAoaykge1xuICB2YXIgcmVzID0gZmluZCh0aGlzLl9kYXRhLCBrKVxuICBpZiAocmVzKSB7XG4gICAgZGVsZXRlIHRoaXMuX2RhdGFbcmVzLl9pbmRleF1cbiAgICB0aGlzLl9kYXRhLnNpemUtLVxuICB9XG59XG5cblBzZXVkb01hcC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBkYXRhID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuICBkYXRhLnNpemUgPSAwXG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdfZGF0YScsIHtcbiAgICB2YWx1ZTogZGF0YSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgd3JpdGFibGU6IGZhbHNlXG4gIH0pXG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShQc2V1ZG9NYXAucHJvdG90eXBlLCAnc2l6ZScsIHtcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGEuc2l6ZVxuICB9LFxuICBzZXQ6IGZ1bmN0aW9uIChuKSB7fSxcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgY29uZmlndXJhYmxlOiB0cnVlXG59KVxuXG5Qc2V1ZG9NYXAucHJvdG90eXBlLnZhbHVlcyA9XG5Qc2V1ZG9NYXAucHJvdG90eXBlLmtleXMgPVxuUHNldWRvTWFwLnByb3RvdHlwZS5lbnRyaWVzID0gZnVuY3Rpb24gKCkge1xuICB0aHJvdyBuZXcgRXJyb3IoJ2l0ZXJhdG9ycyBhcmUgbm90IGltcGxlbWVudGVkIGluIHRoaXMgdmVyc2lvbicpXG59XG5cbi8vIEVpdGhlciBpZGVudGljYWwsIG9yIGJvdGggTmFOXG5mdW5jdGlvbiBzYW1lIChhLCBiKSB7XG4gIHJldHVybiBhID09PSBiIHx8IGEgIT09IGEgJiYgYiAhPT0gYlxufVxuXG5mdW5jdGlvbiBFbnRyeSAoaywgdiwgaSkge1xuICB0aGlzLmtleSA9IGtcbiAgdGhpcy52YWx1ZSA9IHZcbiAgdGhpcy5faW5kZXggPSBpXG59XG5cbmZ1bmN0aW9uIGZpbmQgKGRhdGEsIGspIHtcbiAgZm9yICh2YXIgaSA9IDAsIHMgPSAnXycgKyBrLCBrZXkgPSBzO1xuICAgICAgIGhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KTtcbiAgICAgICBrZXkgPSBzICsgaSsrKSB7XG4gICAgaWYgKHNhbWUoZGF0YVtrZXldLmtleSwgaykpXG4gICAgICByZXR1cm4gZGF0YVtrZXldXG4gIH1cbn1cblxuZnVuY3Rpb24gc2V0IChkYXRhLCBrLCB2KSB7XG4gIGZvciAodmFyIGkgPSAwLCBzID0gJ18nICsgaywga2V5ID0gcztcbiAgICAgICBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSk7XG4gICAgICAga2V5ID0gcyArIGkrKykge1xuICAgIGlmIChzYW1lKGRhdGFba2V5XS5rZXksIGspKSB7XG4gICAgICBkYXRhW2tleV0udmFsdWUgPSB2XG4gICAgICByZXR1cm5cbiAgICB9XG4gIH1cbiAgZGF0YS5zaXplKytcbiAgZGF0YVtrZXldID0gbmV3IEVudHJ5KGssIHYsIGtleSlcbn1cbiIsICJpZiAocHJvY2Vzcy5lbnYubnBtX3BhY2thZ2VfbmFtZSA9PT0gJ3BzZXVkb21hcCcgJiZcbiAgICBwcm9jZXNzLmVudi5ucG1fbGlmZWN5Y2xlX3NjcmlwdCA9PT0gJ3Rlc3QnKVxuICBwcm9jZXNzLmVudi5URVNUX1BTRVVET01BUCA9ICd0cnVlJ1xuXG5pZiAodHlwZW9mIE1hcCA9PT0gJ2Z1bmN0aW9uJyAmJiAhcHJvY2Vzcy5lbnYuVEVTVF9QU0VVRE9NQVApIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBNYXBcbn0gZWxzZSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9wc2V1ZG9tYXAnKVxufVxuIiwgIm1vZHVsZS5leHBvcnRzID0gWWFsbGlzdFxuXG5ZYWxsaXN0Lk5vZGUgPSBOb2RlXG5ZYWxsaXN0LmNyZWF0ZSA9IFlhbGxpc3RcblxuZnVuY3Rpb24gWWFsbGlzdCAobGlzdCkge1xuICB2YXIgc2VsZiA9IHRoaXNcbiAgaWYgKCEoc2VsZiBpbnN0YW5jZW9mIFlhbGxpc3QpKSB7XG4gICAgc2VsZiA9IG5ldyBZYWxsaXN0KClcbiAgfVxuXG4gIHNlbGYudGFpbCA9IG51bGxcbiAgc2VsZi5oZWFkID0gbnVsbFxuICBzZWxmLmxlbmd0aCA9IDBcblxuICBpZiAobGlzdCAmJiB0eXBlb2YgbGlzdC5mb3JFYWNoID09PSAnZnVuY3Rpb24nKSB7XG4gICAgbGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICBzZWxmLnB1c2goaXRlbSlcbiAgICB9KVxuICB9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBzZWxmLnB1c2goYXJndW1lbnRzW2ldKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzZWxmXG59XG5cbllhbGxpc3QucHJvdG90eXBlLnJlbW92ZU5vZGUgPSBmdW5jdGlvbiAobm9kZSkge1xuICBpZiAobm9kZS5saXN0ICE9PSB0aGlzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdyZW1vdmluZyBub2RlIHdoaWNoIGRvZXMgbm90IGJlbG9uZyB0byB0aGlzIGxpc3QnKVxuICB9XG5cbiAgdmFyIG5leHQgPSBub2RlLm5leHRcbiAgdmFyIHByZXYgPSBub2RlLnByZXZcblxuICBpZiAobmV4dCkge1xuICAgIG5leHQucHJldiA9IHByZXZcbiAgfVxuXG4gIGlmIChwcmV2KSB7XG4gICAgcHJldi5uZXh0ID0gbmV4dFxuICB9XG5cbiAgaWYgKG5vZGUgPT09IHRoaXMuaGVhZCkge1xuICAgIHRoaXMuaGVhZCA9IG5leHRcbiAgfVxuICBpZiAobm9kZSA9PT0gdGhpcy50YWlsKSB7XG4gICAgdGhpcy50YWlsID0gcHJldlxuICB9XG5cbiAgbm9kZS5saXN0Lmxlbmd0aC0tXG4gIG5vZGUubmV4dCA9IG51bGxcbiAgbm9kZS5wcmV2ID0gbnVsbFxuICBub2RlLmxpc3QgPSBudWxsXG59XG5cbllhbGxpc3QucHJvdG90eXBlLnVuc2hpZnROb2RlID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgaWYgKG5vZGUgPT09IHRoaXMuaGVhZCkge1xuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKG5vZGUubGlzdCkge1xuICAgIG5vZGUubGlzdC5yZW1vdmVOb2RlKG5vZGUpXG4gIH1cblxuICB2YXIgaGVhZCA9IHRoaXMuaGVhZFxuICBub2RlLmxpc3QgPSB0aGlzXG4gIG5vZGUubmV4dCA9IGhlYWRcbiAgaWYgKGhlYWQpIHtcbiAgICBoZWFkLnByZXYgPSBub2RlXG4gIH1cblxuICB0aGlzLmhlYWQgPSBub2RlXG4gIGlmICghdGhpcy50YWlsKSB7XG4gICAgdGhpcy50YWlsID0gbm9kZVxuICB9XG4gIHRoaXMubGVuZ3RoKytcbn1cblxuWWFsbGlzdC5wcm90b3R5cGUucHVzaE5vZGUgPSBmdW5jdGlvbiAobm9kZSkge1xuICBpZiAobm9kZSA9PT0gdGhpcy50YWlsKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBpZiAobm9kZS5saXN0KSB7XG4gICAgbm9kZS5saXN0LnJlbW92ZU5vZGUobm9kZSlcbiAgfVxuXG4gIHZhciB0YWlsID0gdGhpcy50YWlsXG4gIG5vZGUubGlzdCA9IHRoaXNcbiAgbm9kZS5wcmV2ID0gdGFpbFxuICBpZiAodGFpbCkge1xuICAgIHRhaWwubmV4dCA9IG5vZGVcbiAgfVxuXG4gIHRoaXMudGFpbCA9IG5vZGVcbiAgaWYgKCF0aGlzLmhlYWQpIHtcbiAgICB0aGlzLmhlYWQgPSBub2RlXG4gIH1cbiAgdGhpcy5sZW5ndGgrK1xufVxuXG5ZYWxsaXN0LnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKCkge1xuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBwdXNoKHRoaXMsIGFyZ3VtZW50c1tpXSlcbiAgfVxuICByZXR1cm4gdGhpcy5sZW5ndGhcbn1cblxuWWFsbGlzdC5wcm90b3R5cGUudW5zaGlmdCA9IGZ1bmN0aW9uICgpIHtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgdW5zaGlmdCh0aGlzLCBhcmd1bWVudHNbaV0pXG4gIH1cbiAgcmV0dXJuIHRoaXMubGVuZ3RoXG59XG5cbllhbGxpc3QucHJvdG90eXBlLnBvcCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCF0aGlzLnRhaWwpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkXG4gIH1cblxuICB2YXIgcmVzID0gdGhpcy50YWlsLnZhbHVlXG4gIHRoaXMudGFpbCA9IHRoaXMudGFpbC5wcmV2XG4gIGlmICh0aGlzLnRhaWwpIHtcbiAgICB0aGlzLnRhaWwubmV4dCA9IG51bGxcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmhlYWQgPSBudWxsXG4gIH1cbiAgdGhpcy5sZW5ndGgtLVxuICByZXR1cm4gcmVzXG59XG5cbllhbGxpc3QucHJvdG90eXBlLnNoaWZ0ID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIXRoaXMuaGVhZCkge1xuICAgIHJldHVybiB1bmRlZmluZWRcbiAgfVxuXG4gIHZhciByZXMgPSB0aGlzLmhlYWQudmFsdWVcbiAgdGhpcy5oZWFkID0gdGhpcy5oZWFkLm5leHRcbiAgaWYgKHRoaXMuaGVhZCkge1xuICAgIHRoaXMuaGVhZC5wcmV2ID0gbnVsbFxuICB9IGVsc2Uge1xuICAgIHRoaXMudGFpbCA9IG51bGxcbiAgfVxuICB0aGlzLmxlbmd0aC0tXG4gIHJldHVybiByZXNcbn1cblxuWWFsbGlzdC5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChmbiwgdGhpc3ApIHtcbiAgdGhpc3AgPSB0aGlzcCB8fCB0aGlzXG4gIGZvciAodmFyIHdhbGtlciA9IHRoaXMuaGVhZCwgaSA9IDA7IHdhbGtlciAhPT0gbnVsbDsgaSsrKSB7XG4gICAgZm4uY2FsbCh0aGlzcCwgd2Fsa2VyLnZhbHVlLCBpLCB0aGlzKVxuICAgIHdhbGtlciA9IHdhbGtlci5uZXh0XG4gIH1cbn1cblxuWWFsbGlzdC5wcm90b3R5cGUuZm9yRWFjaFJldmVyc2UgPSBmdW5jdGlvbiAoZm4sIHRoaXNwKSB7XG4gIHRoaXNwID0gdGhpc3AgfHwgdGhpc1xuICBmb3IgKHZhciB3YWxrZXIgPSB0aGlzLnRhaWwsIGkgPSB0aGlzLmxlbmd0aCAtIDE7IHdhbGtlciAhPT0gbnVsbDsgaS0tKSB7XG4gICAgZm4uY2FsbCh0aGlzcCwgd2Fsa2VyLnZhbHVlLCBpLCB0aGlzKVxuICAgIHdhbGtlciA9IHdhbGtlci5wcmV2XG4gIH1cbn1cblxuWWFsbGlzdC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKG4pIHtcbiAgZm9yICh2YXIgaSA9IDAsIHdhbGtlciA9IHRoaXMuaGVhZDsgd2Fsa2VyICE9PSBudWxsICYmIGkgPCBuOyBpKyspIHtcbiAgICAvLyBhYm9ydCBvdXQgb2YgdGhlIGxpc3QgZWFybHkgaWYgd2UgaGl0IGEgY3ljbGVcbiAgICB3YWxrZXIgPSB3YWxrZXIubmV4dFxuICB9XG4gIGlmIChpID09PSBuICYmIHdhbGtlciAhPT0gbnVsbCkge1xuICAgIHJldHVybiB3YWxrZXIudmFsdWVcbiAgfVxufVxuXG5ZYWxsaXN0LnByb3RvdHlwZS5nZXRSZXZlcnNlID0gZnVuY3Rpb24gKG4pIHtcbiAgZm9yICh2YXIgaSA9IDAsIHdhbGtlciA9IHRoaXMudGFpbDsgd2Fsa2VyICE9PSBudWxsICYmIGkgPCBuOyBpKyspIHtcbiAgICAvLyBhYm9ydCBvdXQgb2YgdGhlIGxpc3QgZWFybHkgaWYgd2UgaGl0IGEgY3ljbGVcbiAgICB3YWxrZXIgPSB3YWxrZXIucHJldlxuICB9XG4gIGlmIChpID09PSBuICYmIHdhbGtlciAhPT0gbnVsbCkge1xuICAgIHJldHVybiB3YWxrZXIudmFsdWVcbiAgfVxufVxuXG5ZYWxsaXN0LnByb3RvdHlwZS5tYXAgPSBmdW5jdGlvbiAoZm4sIHRoaXNwKSB7XG4gIHRoaXNwID0gdGhpc3AgfHwgdGhpc1xuICB2YXIgcmVzID0gbmV3IFlhbGxpc3QoKVxuICBmb3IgKHZhciB3YWxrZXIgPSB0aGlzLmhlYWQ7IHdhbGtlciAhPT0gbnVsbDspIHtcbiAgICByZXMucHVzaChmbi5jYWxsKHRoaXNwLCB3YWxrZXIudmFsdWUsIHRoaXMpKVxuICAgIHdhbGtlciA9IHdhbGtlci5uZXh0XG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5ZYWxsaXN0LnByb3RvdHlwZS5tYXBSZXZlcnNlID0gZnVuY3Rpb24gKGZuLCB0aGlzcCkge1xuICB0aGlzcCA9IHRoaXNwIHx8IHRoaXNcbiAgdmFyIHJlcyA9IG5ldyBZYWxsaXN0KClcbiAgZm9yICh2YXIgd2Fsa2VyID0gdGhpcy50YWlsOyB3YWxrZXIgIT09IG51bGw7KSB7XG4gICAgcmVzLnB1c2goZm4uY2FsbCh0aGlzcCwgd2Fsa2VyLnZhbHVlLCB0aGlzKSlcbiAgICB3YWxrZXIgPSB3YWxrZXIucHJldlxuICB9XG4gIHJldHVybiByZXNcbn1cblxuWWFsbGlzdC5wcm90b3R5cGUucmVkdWNlID0gZnVuY3Rpb24gKGZuLCBpbml0aWFsKSB7XG4gIHZhciBhY2NcbiAgdmFyIHdhbGtlciA9IHRoaXMuaGVhZFxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICBhY2MgPSBpbml0aWFsXG4gIH0gZWxzZSBpZiAodGhpcy5oZWFkKSB7XG4gICAgd2Fsa2VyID0gdGhpcy5oZWFkLm5leHRcbiAgICBhY2MgPSB0aGlzLmhlYWQudmFsdWVcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdSZWR1Y2Ugb2YgZW1wdHkgbGlzdCB3aXRoIG5vIGluaXRpYWwgdmFsdWUnKVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IHdhbGtlciAhPT0gbnVsbDsgaSsrKSB7XG4gICAgYWNjID0gZm4oYWNjLCB3YWxrZXIudmFsdWUsIGkpXG4gICAgd2Fsa2VyID0gd2Fsa2VyLm5leHRcbiAgfVxuXG4gIHJldHVybiBhY2Ncbn1cblxuWWFsbGlzdC5wcm90b3R5cGUucmVkdWNlUmV2ZXJzZSA9IGZ1bmN0aW9uIChmbiwgaW5pdGlhbCkge1xuICB2YXIgYWNjXG4gIHZhciB3YWxrZXIgPSB0aGlzLnRhaWxcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgYWNjID0gaW5pdGlhbFxuICB9IGVsc2UgaWYgKHRoaXMudGFpbCkge1xuICAgIHdhbGtlciA9IHRoaXMudGFpbC5wcmV2XG4gICAgYWNjID0gdGhpcy50YWlsLnZhbHVlXG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUmVkdWNlIG9mIGVtcHR5IGxpc3Qgd2l0aCBubyBpbml0aWFsIHZhbHVlJylcbiAgfVxuXG4gIGZvciAodmFyIGkgPSB0aGlzLmxlbmd0aCAtIDE7IHdhbGtlciAhPT0gbnVsbDsgaS0tKSB7XG4gICAgYWNjID0gZm4oYWNjLCB3YWxrZXIudmFsdWUsIGkpXG4gICAgd2Fsa2VyID0gd2Fsa2VyLnByZXZcbiAgfVxuXG4gIHJldHVybiBhY2Ncbn1cblxuWWFsbGlzdC5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGFyciA9IG5ldyBBcnJheSh0aGlzLmxlbmd0aClcbiAgZm9yICh2YXIgaSA9IDAsIHdhbGtlciA9IHRoaXMuaGVhZDsgd2Fsa2VyICE9PSBudWxsOyBpKyspIHtcbiAgICBhcnJbaV0gPSB3YWxrZXIudmFsdWVcbiAgICB3YWxrZXIgPSB3YWxrZXIubmV4dFxuICB9XG4gIHJldHVybiBhcnJcbn1cblxuWWFsbGlzdC5wcm90b3R5cGUudG9BcnJheVJldmVyc2UgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBhcnIgPSBuZXcgQXJyYXkodGhpcy5sZW5ndGgpXG4gIGZvciAodmFyIGkgPSAwLCB3YWxrZXIgPSB0aGlzLnRhaWw7IHdhbGtlciAhPT0gbnVsbDsgaSsrKSB7XG4gICAgYXJyW2ldID0gd2Fsa2VyLnZhbHVlXG4gICAgd2Fsa2VyID0gd2Fsa2VyLnByZXZcbiAgfVxuICByZXR1cm4gYXJyXG59XG5cbllhbGxpc3QucHJvdG90eXBlLnNsaWNlID0gZnVuY3Rpb24gKGZyb20sIHRvKSB7XG4gIHRvID0gdG8gfHwgdGhpcy5sZW5ndGhcbiAgaWYgKHRvIDwgMCkge1xuICAgIHRvICs9IHRoaXMubGVuZ3RoXG4gIH1cbiAgZnJvbSA9IGZyb20gfHwgMFxuICBpZiAoZnJvbSA8IDApIHtcbiAgICBmcm9tICs9IHRoaXMubGVuZ3RoXG4gIH1cbiAgdmFyIHJldCA9IG5ldyBZYWxsaXN0KClcbiAgaWYgKHRvIDwgZnJvbSB8fCB0byA8IDApIHtcbiAgICByZXR1cm4gcmV0XG4gIH1cbiAgaWYgKGZyb20gPCAwKSB7XG4gICAgZnJvbSA9IDBcbiAgfVxuICBpZiAodG8gPiB0aGlzLmxlbmd0aCkge1xuICAgIHRvID0gdGhpcy5sZW5ndGhcbiAgfVxuICBmb3IgKHZhciBpID0gMCwgd2Fsa2VyID0gdGhpcy5oZWFkOyB3YWxrZXIgIT09IG51bGwgJiYgaSA8IGZyb207IGkrKykge1xuICAgIHdhbGtlciA9IHdhbGtlci5uZXh0XG4gIH1cbiAgZm9yICg7IHdhbGtlciAhPT0gbnVsbCAmJiBpIDwgdG87IGkrKywgd2Fsa2VyID0gd2Fsa2VyLm5leHQpIHtcbiAgICByZXQucHVzaCh3YWxrZXIudmFsdWUpXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5ZYWxsaXN0LnByb3RvdHlwZS5zbGljZVJldmVyc2UgPSBmdW5jdGlvbiAoZnJvbSwgdG8pIHtcbiAgdG8gPSB0byB8fCB0aGlzLmxlbmd0aFxuICBpZiAodG8gPCAwKSB7XG4gICAgdG8gKz0gdGhpcy5sZW5ndGhcbiAgfVxuICBmcm9tID0gZnJvbSB8fCAwXG4gIGlmIChmcm9tIDwgMCkge1xuICAgIGZyb20gKz0gdGhpcy5sZW5ndGhcbiAgfVxuICB2YXIgcmV0ID0gbmV3IFlhbGxpc3QoKVxuICBpZiAodG8gPCBmcm9tIHx8IHRvIDwgMCkge1xuICAgIHJldHVybiByZXRcbiAgfVxuICBpZiAoZnJvbSA8IDApIHtcbiAgICBmcm9tID0gMFxuICB9XG4gIGlmICh0byA+IHRoaXMubGVuZ3RoKSB7XG4gICAgdG8gPSB0aGlzLmxlbmd0aFxuICB9XG4gIGZvciAodmFyIGkgPSB0aGlzLmxlbmd0aCwgd2Fsa2VyID0gdGhpcy50YWlsOyB3YWxrZXIgIT09IG51bGwgJiYgaSA+IHRvOyBpLS0pIHtcbiAgICB3YWxrZXIgPSB3YWxrZXIucHJldlxuICB9XG4gIGZvciAoOyB3YWxrZXIgIT09IG51bGwgJiYgaSA+IGZyb207IGktLSwgd2Fsa2VyID0gd2Fsa2VyLnByZXYpIHtcbiAgICByZXQucHVzaCh3YWxrZXIudmFsdWUpXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5ZYWxsaXN0LnByb3RvdHlwZS5yZXZlcnNlID0gZnVuY3Rpb24gKCkge1xuICB2YXIgaGVhZCA9IHRoaXMuaGVhZFxuICB2YXIgdGFpbCA9IHRoaXMudGFpbFxuICBmb3IgKHZhciB3YWxrZXIgPSBoZWFkOyB3YWxrZXIgIT09IG51bGw7IHdhbGtlciA9IHdhbGtlci5wcmV2KSB7XG4gICAgdmFyIHAgPSB3YWxrZXIucHJldlxuICAgIHdhbGtlci5wcmV2ID0gd2Fsa2VyLm5leHRcbiAgICB3YWxrZXIubmV4dCA9IHBcbiAgfVxuICB0aGlzLmhlYWQgPSB0YWlsXG4gIHRoaXMudGFpbCA9IGhlYWRcbiAgcmV0dXJuIHRoaXNcbn1cblxuZnVuY3Rpb24gcHVzaCAoc2VsZiwgaXRlbSkge1xuICBzZWxmLnRhaWwgPSBuZXcgTm9kZShpdGVtLCBzZWxmLnRhaWwsIG51bGwsIHNlbGYpXG4gIGlmICghc2VsZi5oZWFkKSB7XG4gICAgc2VsZi5oZWFkID0gc2VsZi50YWlsXG4gIH1cbiAgc2VsZi5sZW5ndGgrK1xufVxuXG5mdW5jdGlvbiB1bnNoaWZ0IChzZWxmLCBpdGVtKSB7XG4gIHNlbGYuaGVhZCA9IG5ldyBOb2RlKGl0ZW0sIG51bGwsIHNlbGYuaGVhZCwgc2VsZilcbiAgaWYgKCFzZWxmLnRhaWwpIHtcbiAgICBzZWxmLnRhaWwgPSBzZWxmLmhlYWRcbiAgfVxuICBzZWxmLmxlbmd0aCsrXG59XG5cbmZ1bmN0aW9uIE5vZGUgKHZhbHVlLCBwcmV2LCBuZXh0LCBsaXN0KSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBOb2RlKSkge1xuICAgIHJldHVybiBuZXcgTm9kZSh2YWx1ZSwgcHJldiwgbmV4dCwgbGlzdClcbiAgfVxuXG4gIHRoaXMubGlzdCA9IGxpc3RcbiAgdGhpcy52YWx1ZSA9IHZhbHVlXG5cbiAgaWYgKHByZXYpIHtcbiAgICBwcmV2Lm5leHQgPSB0aGlzXG4gICAgdGhpcy5wcmV2ID0gcHJldlxuICB9IGVsc2Uge1xuICAgIHRoaXMucHJldiA9IG51bGxcbiAgfVxuXG4gIGlmIChuZXh0KSB7XG4gICAgbmV4dC5wcmV2ID0gdGhpc1xuICAgIHRoaXMubmV4dCA9IG5leHRcbiAgfSBlbHNlIHtcbiAgICB0aGlzLm5leHQgPSBudWxsXG4gIH1cbn1cbiIsICIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBMUlVDYWNoZVxuXG4vLyBUaGlzIHdpbGwgYmUgYSBwcm9wZXIgaXRlcmFibGUgJ01hcCcgaW4gZW5naW5lcyB0aGF0IHN1cHBvcnQgaXQsXG4vLyBvciBhIGZha2V5LWZha2UgUHNldWRvTWFwIGluIG9sZGVyIHZlcnNpb25zLlxudmFyIE1hcCA9IHJlcXVpcmUoJ3BzZXVkb21hcCcpXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKVxuXG4vLyBBIGxpbmtlZCBsaXN0IHRvIGtlZXAgdHJhY2sgb2YgcmVjZW50bHktdXNlZC1uZXNzXG52YXIgWWFsbGlzdCA9IHJlcXVpcmUoJ3lhbGxpc3QnKVxuXG4vLyB1c2Ugc3ltYm9scyBpZiBwb3NzaWJsZSwgb3RoZXJ3aXNlIGp1c3QgX3Byb3BzXG52YXIgaGFzU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBwcm9jZXNzLmVudi5fbm9kZUxSVUNhY2hlRm9yY2VOb1N5bWJvbCAhPT0gJzEnXG52YXIgbWFrZVN5bWJvbFxuaWYgKGhhc1N5bWJvbCkge1xuICBtYWtlU3ltYm9sID0gZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiBTeW1ib2woa2V5KVxuICB9XG59IGVsc2Uge1xuICBtYWtlU3ltYm9sID0gZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiAnXycgKyBrZXlcbiAgfVxufVxuXG52YXIgTUFYID0gbWFrZVN5bWJvbCgnbWF4JylcbnZhciBMRU5HVEggPSBtYWtlU3ltYm9sKCdsZW5ndGgnKVxudmFyIExFTkdUSF9DQUxDVUxBVE9SID0gbWFrZVN5bWJvbCgnbGVuZ3RoQ2FsY3VsYXRvcicpXG52YXIgQUxMT1dfU1RBTEUgPSBtYWtlU3ltYm9sKCdhbGxvd1N0YWxlJylcbnZhciBNQVhfQUdFID0gbWFrZVN5bWJvbCgnbWF4QWdlJylcbnZhciBESVNQT1NFID0gbWFrZVN5bWJvbCgnZGlzcG9zZScpXG52YXIgTk9fRElTUE9TRV9PTl9TRVQgPSBtYWtlU3ltYm9sKCdub0Rpc3Bvc2VPblNldCcpXG52YXIgTFJVX0xJU1QgPSBtYWtlU3ltYm9sKCdscnVMaXN0JylcbnZhciBDQUNIRSA9IG1ha2VTeW1ib2woJ2NhY2hlJylcblxuZnVuY3Rpb24gbmFpdmVMZW5ndGggKCkgeyByZXR1cm4gMSB9XG5cbi8vIGxydUxpc3QgaXMgYSB5YWxsaXN0IHdoZXJlIHRoZSBoZWFkIGlzIHRoZSB5b3VuZ2VzdFxuLy8gaXRlbSwgYW5kIHRoZSB0YWlsIGlzIHRoZSBvbGRlc3QuICB0aGUgbGlzdCBjb250YWlucyB0aGUgSGl0XG4vLyBvYmplY3RzIGFzIHRoZSBlbnRyaWVzLlxuLy8gRWFjaCBIaXQgb2JqZWN0IGhhcyBhIHJlZmVyZW5jZSB0byBpdHMgWWFsbGlzdC5Ob2RlLiAgVGhpc1xuLy8gbmV2ZXIgY2hhbmdlcy5cbi8vXG4vLyBjYWNoZSBpcyBhIE1hcCAob3IgUHNldWRvTWFwKSB0aGF0IG1hdGNoZXMgdGhlIGtleXMgdG9cbi8vIHRoZSBZYWxsaXN0Lk5vZGUgb2JqZWN0LlxuZnVuY3Rpb24gTFJVQ2FjaGUgKG9wdGlvbnMpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIExSVUNhY2hlKSkge1xuICAgIHJldHVybiBuZXcgTFJVQ2FjaGUob3B0aW9ucylcbiAgfVxuXG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ251bWJlcicpIHtcbiAgICBvcHRpb25zID0geyBtYXg6IG9wdGlvbnMgfVxuICB9XG5cbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9XG4gIH1cblxuICB2YXIgbWF4ID0gdGhpc1tNQVhdID0gb3B0aW9ucy5tYXhcbiAgLy8gS2luZCBvZiB3ZWlyZCB0byBoYXZlIGEgZGVmYXVsdCBtYXggb2YgSW5maW5pdHksIGJ1dCBvaCB3ZWxsLlxuICBpZiAoIW1heCB8fFxuICAgICAgISh0eXBlb2YgbWF4ID09PSAnbnVtYmVyJykgfHxcbiAgICAgIG1heCA8PSAwKSB7XG4gICAgdGhpc1tNQVhdID0gSW5maW5pdHlcbiAgfVxuXG4gIHZhciBsYyA9IG9wdGlvbnMubGVuZ3RoIHx8IG5haXZlTGVuZ3RoXG4gIGlmICh0eXBlb2YgbGMgIT09ICdmdW5jdGlvbicpIHtcbiAgICBsYyA9IG5haXZlTGVuZ3RoXG4gIH1cbiAgdGhpc1tMRU5HVEhfQ0FMQ1VMQVRPUl0gPSBsY1xuXG4gIHRoaXNbQUxMT1dfU1RBTEVdID0gb3B0aW9ucy5zdGFsZSB8fCBmYWxzZVxuICB0aGlzW01BWF9BR0VdID0gb3B0aW9ucy5tYXhBZ2UgfHwgMFxuICB0aGlzW0RJU1BPU0VdID0gb3B0aW9ucy5kaXNwb3NlXG4gIHRoaXNbTk9fRElTUE9TRV9PTl9TRVRdID0gb3B0aW9ucy5ub0Rpc3Bvc2VPblNldCB8fCBmYWxzZVxuICB0aGlzLnJlc2V0KClcbn1cblxuLy8gcmVzaXplIHRoZSBjYWNoZSB3aGVuIHRoZSBtYXggY2hhbmdlcy5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShMUlVDYWNoZS5wcm90b3R5cGUsICdtYXgnLCB7XG4gIHNldDogZnVuY3Rpb24gKG1MKSB7XG4gICAgaWYgKCFtTCB8fCAhKHR5cGVvZiBtTCA9PT0gJ251bWJlcicpIHx8IG1MIDw9IDApIHtcbiAgICAgIG1MID0gSW5maW5pdHlcbiAgICB9XG4gICAgdGhpc1tNQVhdID0gbUxcbiAgICB0cmltKHRoaXMpXG4gIH0sXG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzW01BWF1cbiAgfSxcbiAgZW51bWVyYWJsZTogdHJ1ZVxufSlcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KExSVUNhY2hlLnByb3RvdHlwZSwgJ2FsbG93U3RhbGUnLCB7XG4gIHNldDogZnVuY3Rpb24gKGFsbG93U3RhbGUpIHtcbiAgICB0aGlzW0FMTE9XX1NUQUxFXSA9ICEhYWxsb3dTdGFsZVxuICB9LFxuICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpc1tBTExPV19TVEFMRV1cbiAgfSxcbiAgZW51bWVyYWJsZTogdHJ1ZVxufSlcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KExSVUNhY2hlLnByb3RvdHlwZSwgJ21heEFnZScsIHtcbiAgc2V0OiBmdW5jdGlvbiAobUEpIHtcbiAgICBpZiAoIW1BIHx8ICEodHlwZW9mIG1BID09PSAnbnVtYmVyJykgfHwgbUEgPCAwKSB7XG4gICAgICBtQSA9IDBcbiAgICB9XG4gICAgdGhpc1tNQVhfQUdFXSA9IG1BXG4gICAgdHJpbSh0aGlzKVxuICB9LFxuICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpc1tNQVhfQUdFXVxuICB9LFxuICBlbnVtZXJhYmxlOiB0cnVlXG59KVxuXG4vLyByZXNpemUgdGhlIGNhY2hlIHdoZW4gdGhlIGxlbmd0aENhbGN1bGF0b3IgY2hhbmdlcy5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShMUlVDYWNoZS5wcm90b3R5cGUsICdsZW5ndGhDYWxjdWxhdG9yJywge1xuICBzZXQ6IGZ1bmN0aW9uIChsQykge1xuICAgIGlmICh0eXBlb2YgbEMgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGxDID0gbmFpdmVMZW5ndGhcbiAgICB9XG4gICAgaWYgKGxDICE9PSB0aGlzW0xFTkdUSF9DQUxDVUxBVE9SXSkge1xuICAgICAgdGhpc1tMRU5HVEhfQ0FMQ1VMQVRPUl0gPSBsQ1xuICAgICAgdGhpc1tMRU5HVEhdID0gMFxuICAgICAgdGhpc1tMUlVfTElTVF0uZm9yRWFjaChmdW5jdGlvbiAoaGl0KSB7XG4gICAgICAgIGhpdC5sZW5ndGggPSB0aGlzW0xFTkdUSF9DQUxDVUxBVE9SXShoaXQudmFsdWUsIGhpdC5rZXkpXG4gICAgICAgIHRoaXNbTEVOR1RIXSArPSBoaXQubGVuZ3RoXG4gICAgICB9LCB0aGlzKVxuICAgIH1cbiAgICB0cmltKHRoaXMpXG4gIH0sXG4gIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpc1tMRU5HVEhfQ0FMQ1VMQVRPUl0gfSxcbiAgZW51bWVyYWJsZTogdHJ1ZVxufSlcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KExSVUNhY2hlLnByb3RvdHlwZSwgJ2xlbmd0aCcsIHtcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzW0xFTkdUSF0gfSxcbiAgZW51bWVyYWJsZTogdHJ1ZVxufSlcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KExSVUNhY2hlLnByb3RvdHlwZSwgJ2l0ZW1Db3VudCcsIHtcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzW0xSVV9MSVNUXS5sZW5ndGggfSxcbiAgZW51bWVyYWJsZTogdHJ1ZVxufSlcblxuTFJVQ2FjaGUucHJvdG90eXBlLnJmb3JFYWNoID0gZnVuY3Rpb24gKGZuLCB0aGlzcCkge1xuICB0aGlzcCA9IHRoaXNwIHx8IHRoaXNcbiAgZm9yICh2YXIgd2Fsa2VyID0gdGhpc1tMUlVfTElTVF0udGFpbDsgd2Fsa2VyICE9PSBudWxsOykge1xuICAgIHZhciBwcmV2ID0gd2Fsa2VyLnByZXZcbiAgICBmb3JFYWNoU3RlcCh0aGlzLCBmbiwgd2Fsa2VyLCB0aGlzcClcbiAgICB3YWxrZXIgPSBwcmV2XG4gIH1cbn1cblxuZnVuY3Rpb24gZm9yRWFjaFN0ZXAgKHNlbGYsIGZuLCBub2RlLCB0aGlzcCkge1xuICB2YXIgaGl0ID0gbm9kZS52YWx1ZVxuICBpZiAoaXNTdGFsZShzZWxmLCBoaXQpKSB7XG4gICAgZGVsKHNlbGYsIG5vZGUpXG4gICAgaWYgKCFzZWxmW0FMTE9XX1NUQUxFXSkge1xuICAgICAgaGl0ID0gdW5kZWZpbmVkXG4gICAgfVxuICB9XG4gIGlmIChoaXQpIHtcbiAgICBmbi5jYWxsKHRoaXNwLCBoaXQudmFsdWUsIGhpdC5rZXksIHNlbGYpXG4gIH1cbn1cblxuTFJVQ2FjaGUucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoZm4sIHRoaXNwKSB7XG4gIHRoaXNwID0gdGhpc3AgfHwgdGhpc1xuICBmb3IgKHZhciB3YWxrZXIgPSB0aGlzW0xSVV9MSVNUXS5oZWFkOyB3YWxrZXIgIT09IG51bGw7KSB7XG4gICAgdmFyIG5leHQgPSB3YWxrZXIubmV4dFxuICAgIGZvckVhY2hTdGVwKHRoaXMsIGZuLCB3YWxrZXIsIHRoaXNwKVxuICAgIHdhbGtlciA9IG5leHRcbiAgfVxufVxuXG5MUlVDYWNoZS5wcm90b3R5cGUua2V5cyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXNbTFJVX0xJU1RdLnRvQXJyYXkoKS5tYXAoZnVuY3Rpb24gKGspIHtcbiAgICByZXR1cm4gay5rZXlcbiAgfSwgdGhpcylcbn1cblxuTFJVQ2FjaGUucHJvdG90eXBlLnZhbHVlcyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXNbTFJVX0xJU1RdLnRvQXJyYXkoKS5tYXAoZnVuY3Rpb24gKGspIHtcbiAgICByZXR1cm4gay52YWx1ZVxuICB9LCB0aGlzKVxufVxuXG5MUlVDYWNoZS5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzW0RJU1BPU0VdICYmXG4gICAgICB0aGlzW0xSVV9MSVNUXSAmJlxuICAgICAgdGhpc1tMUlVfTElTVF0ubGVuZ3RoKSB7XG4gICAgdGhpc1tMUlVfTElTVF0uZm9yRWFjaChmdW5jdGlvbiAoaGl0KSB7XG4gICAgICB0aGlzW0RJU1BPU0VdKGhpdC5rZXksIGhpdC52YWx1ZSlcbiAgICB9LCB0aGlzKVxuICB9XG5cbiAgdGhpc1tDQUNIRV0gPSBuZXcgTWFwKCkgLy8gaGFzaCBvZiBpdGVtcyBieSBrZXlcbiAgdGhpc1tMUlVfTElTVF0gPSBuZXcgWWFsbGlzdCgpIC8vIGxpc3Qgb2YgaXRlbXMgaW4gb3JkZXIgb2YgdXNlIHJlY2VuY3lcbiAgdGhpc1tMRU5HVEhdID0gMCAvLyBsZW5ndGggb2YgaXRlbXMgaW4gdGhlIGxpc3Rcbn1cblxuTFJVQ2FjaGUucHJvdG90eXBlLmR1bXAgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzW0xSVV9MSVNUXS5tYXAoZnVuY3Rpb24gKGhpdCkge1xuICAgIGlmICghaXNTdGFsZSh0aGlzLCBoaXQpKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBrOiBoaXQua2V5LFxuICAgICAgICB2OiBoaXQudmFsdWUsXG4gICAgICAgIGU6IGhpdC5ub3cgKyAoaGl0Lm1heEFnZSB8fCAwKVxuICAgICAgfVxuICAgIH1cbiAgfSwgdGhpcykudG9BcnJheSgpLmZpbHRlcihmdW5jdGlvbiAoaCkge1xuICAgIHJldHVybiBoXG4gIH0pXG59XG5cbkxSVUNhY2hlLnByb3RvdHlwZS5kdW1wTHJ1ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpc1tMUlVfTElTVF1cbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbkxSVUNhY2hlLnByb3RvdHlwZS5pbnNwZWN0ID0gZnVuY3Rpb24gKG4sIG9wdHMpIHtcbiAgdmFyIHN0ciA9ICdMUlVDYWNoZSB7J1xuICB2YXIgZXh0cmFzID0gZmFsc2VcblxuICB2YXIgYXMgPSB0aGlzW0FMTE9XX1NUQUxFXVxuICBpZiAoYXMpIHtcbiAgICBzdHIgKz0gJ1xcbiAgYWxsb3dTdGFsZTogdHJ1ZSdcbiAgICBleHRyYXMgPSB0cnVlXG4gIH1cblxuICB2YXIgbWF4ID0gdGhpc1tNQVhdXG4gIGlmIChtYXggJiYgbWF4ICE9PSBJbmZpbml0eSkge1xuICAgIGlmIChleHRyYXMpIHtcbiAgICAgIHN0ciArPSAnLCdcbiAgICB9XG4gICAgc3RyICs9ICdcXG4gIG1heDogJyArIHV0aWwuaW5zcGVjdChtYXgsIG9wdHMpXG4gICAgZXh0cmFzID0gdHJ1ZVxuICB9XG5cbiAgdmFyIG1heEFnZSA9IHRoaXNbTUFYX0FHRV1cbiAgaWYgKG1heEFnZSkge1xuICAgIGlmIChleHRyYXMpIHtcbiAgICAgIHN0ciArPSAnLCdcbiAgICB9XG4gICAgc3RyICs9ICdcXG4gIG1heEFnZTogJyArIHV0aWwuaW5zcGVjdChtYXhBZ2UsIG9wdHMpXG4gICAgZXh0cmFzID0gdHJ1ZVxuICB9XG5cbiAgdmFyIGxjID0gdGhpc1tMRU5HVEhfQ0FMQ1VMQVRPUl1cbiAgaWYgKGxjICYmIGxjICE9PSBuYWl2ZUxlbmd0aCkge1xuICAgIGlmIChleHRyYXMpIHtcbiAgICAgIHN0ciArPSAnLCdcbiAgICB9XG4gICAgc3RyICs9ICdcXG4gIGxlbmd0aDogJyArIHV0aWwuaW5zcGVjdCh0aGlzW0xFTkdUSF0sIG9wdHMpXG4gICAgZXh0cmFzID0gdHJ1ZVxuICB9XG5cbiAgdmFyIGRpZEZpcnN0ID0gZmFsc2VcbiAgdGhpc1tMUlVfTElTVF0uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgIGlmIChkaWRGaXJzdCkge1xuICAgICAgc3RyICs9ICcsXFxuICAnXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChleHRyYXMpIHtcbiAgICAgICAgc3RyICs9ICcsXFxuJ1xuICAgICAgfVxuICAgICAgZGlkRmlyc3QgPSB0cnVlXG4gICAgICBzdHIgKz0gJ1xcbiAgJ1xuICAgIH1cbiAgICB2YXIga2V5ID0gdXRpbC5pbnNwZWN0KGl0ZW0ua2V5KS5zcGxpdCgnXFxuJykuam9pbignXFxuICAnKVxuICAgIHZhciB2YWwgPSB7IHZhbHVlOiBpdGVtLnZhbHVlIH1cbiAgICBpZiAoaXRlbS5tYXhBZ2UgIT09IG1heEFnZSkge1xuICAgICAgdmFsLm1heEFnZSA9IGl0ZW0ubWF4QWdlXG4gICAgfVxuICAgIGlmIChsYyAhPT0gbmFpdmVMZW5ndGgpIHtcbiAgICAgIHZhbC5sZW5ndGggPSBpdGVtLmxlbmd0aFxuICAgIH1cbiAgICBpZiAoaXNTdGFsZSh0aGlzLCBpdGVtKSkge1xuICAgICAgdmFsLnN0YWxlID0gdHJ1ZVxuICAgIH1cblxuICAgIHZhbCA9IHV0aWwuaW5zcGVjdCh2YWwsIG9wdHMpLnNwbGl0KCdcXG4nKS5qb2luKCdcXG4gICcpXG4gICAgc3RyICs9IGtleSArICcgPT4gJyArIHZhbFxuICB9KVxuXG4gIGlmIChkaWRGaXJzdCB8fCBleHRyYXMpIHtcbiAgICBzdHIgKz0gJ1xcbidcbiAgfVxuICBzdHIgKz0gJ30nXG5cbiAgcmV0dXJuIHN0clxufVxuXG5MUlVDYWNoZS5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKGtleSwgdmFsdWUsIG1heEFnZSkge1xuICBtYXhBZ2UgPSBtYXhBZ2UgfHwgdGhpc1tNQVhfQUdFXVxuXG4gIHZhciBub3cgPSBtYXhBZ2UgPyBEYXRlLm5vdygpIDogMFxuICB2YXIgbGVuID0gdGhpc1tMRU5HVEhfQ0FMQ1VMQVRPUl0odmFsdWUsIGtleSlcblxuICBpZiAodGhpc1tDQUNIRV0uaGFzKGtleSkpIHtcbiAgICBpZiAobGVuID4gdGhpc1tNQVhdKSB7XG4gICAgICBkZWwodGhpcywgdGhpc1tDQUNIRV0uZ2V0KGtleSkpXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICB2YXIgbm9kZSA9IHRoaXNbQ0FDSEVdLmdldChrZXkpXG4gICAgdmFyIGl0ZW0gPSBub2RlLnZhbHVlXG5cbiAgICAvLyBkaXNwb3NlIG9mIHRoZSBvbGQgb25lIGJlZm9yZSBvdmVyd3JpdGluZ1xuICAgIC8vIHNwbGl0IG91dCBpbnRvIDIgaWZzIGZvciBiZXR0ZXIgY292ZXJhZ2UgdHJhY2tpbmdcbiAgICBpZiAodGhpc1tESVNQT1NFXSkge1xuICAgICAgaWYgKCF0aGlzW05PX0RJU1BPU0VfT05fU0VUXSkge1xuICAgICAgICB0aGlzW0RJU1BPU0VdKGtleSwgaXRlbS52YWx1ZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpdGVtLm5vdyA9IG5vd1xuICAgIGl0ZW0ubWF4QWdlID0gbWF4QWdlXG4gICAgaXRlbS52YWx1ZSA9IHZhbHVlXG4gICAgdGhpc1tMRU5HVEhdICs9IGxlbiAtIGl0ZW0ubGVuZ3RoXG4gICAgaXRlbS5sZW5ndGggPSBsZW5cbiAgICB0aGlzLmdldChrZXkpXG4gICAgdHJpbSh0aGlzKVxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICB2YXIgaGl0ID0gbmV3IEVudHJ5KGtleSwgdmFsdWUsIGxlbiwgbm93LCBtYXhBZ2UpXG5cbiAgLy8gb3ZlcnNpemVkIG9iamVjdHMgZmFsbCBvdXQgb2YgY2FjaGUgYXV0b21hdGljYWxseS5cbiAgaWYgKGhpdC5sZW5ndGggPiB0aGlzW01BWF0pIHtcbiAgICBpZiAodGhpc1tESVNQT1NFXSkge1xuICAgICAgdGhpc1tESVNQT1NFXShrZXksIHZhbHVlKVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHRoaXNbTEVOR1RIXSArPSBoaXQubGVuZ3RoXG4gIHRoaXNbTFJVX0xJU1RdLnVuc2hpZnQoaGl0KVxuICB0aGlzW0NBQ0hFXS5zZXQoa2V5LCB0aGlzW0xSVV9MSVNUXS5oZWFkKVxuICB0cmltKHRoaXMpXG4gIHJldHVybiB0cnVlXG59XG5cbkxSVUNhY2hlLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIGlmICghdGhpc1tDQUNIRV0uaGFzKGtleSkpIHJldHVybiBmYWxzZVxuICB2YXIgaGl0ID0gdGhpc1tDQUNIRV0uZ2V0KGtleSkudmFsdWVcbiAgaWYgKGlzU3RhbGUodGhpcywgaGl0KSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIHJldHVybiB0cnVlXG59XG5cbkxSVUNhY2hlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBnZXQodGhpcywga2V5LCB0cnVlKVxufVxuXG5MUlVDYWNoZS5wcm90b3R5cGUucGVlayA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIGdldCh0aGlzLCBrZXksIGZhbHNlKVxufVxuXG5MUlVDYWNoZS5wcm90b3R5cGUucG9wID0gZnVuY3Rpb24gKCkge1xuICB2YXIgbm9kZSA9IHRoaXNbTFJVX0xJU1RdLnRhaWxcbiAgaWYgKCFub2RlKSByZXR1cm4gbnVsbFxuICBkZWwodGhpcywgbm9kZSlcbiAgcmV0dXJuIG5vZGUudmFsdWVcbn1cblxuTFJVQ2FjaGUucHJvdG90eXBlLmRlbCA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgZGVsKHRoaXMsIHRoaXNbQ0FDSEVdLmdldChrZXkpKVxufVxuXG5MUlVDYWNoZS5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgLy8gcmVzZXQgdGhlIGNhY2hlXG4gIHRoaXMucmVzZXQoKVxuXG4gIHZhciBub3cgPSBEYXRlLm5vdygpXG4gIC8vIEEgcHJldmlvdXMgc2VyaWFsaXplZCBjYWNoZSBoYXMgdGhlIG1vc3QgcmVjZW50IGl0ZW1zIGZpcnN0XG4gIGZvciAodmFyIGwgPSBhcnIubGVuZ3RoIC0gMTsgbCA+PSAwOyBsLS0pIHtcbiAgICB2YXIgaGl0ID0gYXJyW2xdXG4gICAgdmFyIGV4cGlyZXNBdCA9IGhpdC5lIHx8IDBcbiAgICBpZiAoZXhwaXJlc0F0ID09PSAwKSB7XG4gICAgICAvLyB0aGUgaXRlbSB3YXMgY3JlYXRlZCB3aXRob3V0IGV4cGlyYXRpb24gaW4gYSBub24gYWdlZCBjYWNoZVxuICAgICAgdGhpcy5zZXQoaGl0LmssIGhpdC52KVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgbWF4QWdlID0gZXhwaXJlc0F0IC0gbm93XG4gICAgICAvLyBkb250IGFkZCBhbHJlYWR5IGV4cGlyZWQgaXRlbXNcbiAgICAgIGlmIChtYXhBZ2UgPiAwKSB7XG4gICAgICAgIHRoaXMuc2V0KGhpdC5rLCBoaXQudiwgbWF4QWdlKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5MUlVDYWNoZS5wcm90b3R5cGUucHJ1bmUgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzZWxmID0gdGhpc1xuICB0aGlzW0NBQ0hFXS5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgZ2V0KHNlbGYsIGtleSwgZmFsc2UpXG4gIH0pXG59XG5cbmZ1bmN0aW9uIGdldCAoc2VsZiwga2V5LCBkb1VzZSkge1xuICB2YXIgbm9kZSA9IHNlbGZbQ0FDSEVdLmdldChrZXkpXG4gIGlmIChub2RlKSB7XG4gICAgdmFyIGhpdCA9IG5vZGUudmFsdWVcbiAgICBpZiAoaXNTdGFsZShzZWxmLCBoaXQpKSB7XG4gICAgICBkZWwoc2VsZiwgbm9kZSlcbiAgICAgIGlmICghc2VsZltBTExPV19TVEFMRV0pIGhpdCA9IHVuZGVmaW5lZFxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoZG9Vc2UpIHtcbiAgICAgICAgc2VsZltMUlVfTElTVF0udW5zaGlmdE5vZGUobm9kZSlcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGhpdCkgaGl0ID0gaGl0LnZhbHVlXG4gIH1cbiAgcmV0dXJuIGhpdFxufVxuXG5mdW5jdGlvbiBpc1N0YWxlIChzZWxmLCBoaXQpIHtcbiAgaWYgKCFoaXQgfHwgKCFoaXQubWF4QWdlICYmICFzZWxmW01BWF9BR0VdKSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIHZhciBzdGFsZSA9IGZhbHNlXG4gIHZhciBkaWZmID0gRGF0ZS5ub3coKSAtIGhpdC5ub3dcbiAgaWYgKGhpdC5tYXhBZ2UpIHtcbiAgICBzdGFsZSA9IGRpZmYgPiBoaXQubWF4QWdlXG4gIH0gZWxzZSB7XG4gICAgc3RhbGUgPSBzZWxmW01BWF9BR0VdICYmIChkaWZmID4gc2VsZltNQVhfQUdFXSlcbiAgfVxuICByZXR1cm4gc3RhbGVcbn1cblxuZnVuY3Rpb24gdHJpbSAoc2VsZikge1xuICBpZiAoc2VsZltMRU5HVEhdID4gc2VsZltNQVhdKSB7XG4gICAgZm9yICh2YXIgd2Fsa2VyID0gc2VsZltMUlVfTElTVF0udGFpbDtcbiAgICAgIHNlbGZbTEVOR1RIXSA+IHNlbGZbTUFYXSAmJiB3YWxrZXIgIT09IG51bGw7KSB7XG4gICAgICAvLyBXZSBrbm93IHRoYXQgd2UncmUgYWJvdXQgdG8gZGVsZXRlIHRoaXMgb25lLCBhbmQgYWxzb1xuICAgICAgLy8gd2hhdCB0aGUgbmV4dCBsZWFzdCByZWNlbnRseSB1c2VkIGtleSB3aWxsIGJlLCBzbyBqdXN0XG4gICAgICAvLyBnbyBhaGVhZCBhbmQgc2V0IGl0IG5vdy5cbiAgICAgIHZhciBwcmV2ID0gd2Fsa2VyLnByZXZcbiAgICAgIGRlbChzZWxmLCB3YWxrZXIpXG4gICAgICB3YWxrZXIgPSBwcmV2XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGRlbCAoc2VsZiwgbm9kZSkge1xuICBpZiAobm9kZSkge1xuICAgIHZhciBoaXQgPSBub2RlLnZhbHVlXG4gICAgaWYgKHNlbGZbRElTUE9TRV0pIHtcbiAgICAgIHNlbGZbRElTUE9TRV0oaGl0LmtleSwgaGl0LnZhbHVlKVxuICAgIH1cbiAgICBzZWxmW0xFTkdUSF0gLT0gaGl0Lmxlbmd0aFxuICAgIHNlbGZbQ0FDSEVdLmRlbGV0ZShoaXQua2V5KVxuICAgIHNlbGZbTFJVX0xJU1RdLnJlbW92ZU5vZGUobm9kZSlcbiAgfVxufVxuXG4vLyBjbGFzc3ksIHNpbmNlIFY4IHByZWZlcnMgcHJlZGljdGFibGUgb2JqZWN0cy5cbmZ1bmN0aW9uIEVudHJ5IChrZXksIHZhbHVlLCBsZW5ndGgsIG5vdywgbWF4QWdlKSB7XG4gIHRoaXMua2V5ID0ga2V5XG4gIHRoaXMudmFsdWUgPSB2YWx1ZVxuICB0aGlzLmxlbmd0aCA9IGxlbmd0aFxuICB0aGlzLm5vdyA9IG5vd1xuICB0aGlzLm1heEFnZSA9IG1heEFnZSB8fCAwXG59XG4iLCAibW9kdWxlLmV4cG9ydHMgPSBpc2V4ZVxuaXNleGUuc3luYyA9IHN5bmNcblxudmFyIGZzID0gcmVxdWlyZSgnZnMnKVxuXG5mdW5jdGlvbiBjaGVja1BhdGhFeHQgKHBhdGgsIG9wdGlvbnMpIHtcbiAgdmFyIHBhdGhleHQgPSBvcHRpb25zLnBhdGhFeHQgIT09IHVuZGVmaW5lZCA/XG4gICAgb3B0aW9ucy5wYXRoRXh0IDogcHJvY2Vzcy5lbnYuUEFUSEVYVFxuXG4gIGlmICghcGF0aGV4dCkge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBwYXRoZXh0ID0gcGF0aGV4dC5zcGxpdCgnOycpXG4gIGlmIChwYXRoZXh0LmluZGV4T2YoJycpICE9PSAtMSkge1xuICAgIHJldHVybiB0cnVlXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXRoZXh0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHAgPSBwYXRoZXh0W2ldLnRvTG93ZXJDYXNlKClcbiAgICBpZiAocCAmJiBwYXRoLnN1YnN0cigtcC5sZW5ndGgpLnRvTG93ZXJDYXNlKCkgPT09IHApIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG5mdW5jdGlvbiBjaGVja1N0YXQgKHN0YXQsIHBhdGgsIG9wdGlvbnMpIHtcbiAgaWYgKCFzdGF0LmlzU3ltYm9saWNMaW5rKCkgJiYgIXN0YXQuaXNGaWxlKCkpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICByZXR1cm4gY2hlY2tQYXRoRXh0KHBhdGgsIG9wdGlvbnMpXG59XG5cbmZ1bmN0aW9uIGlzZXhlIChwYXRoLCBvcHRpb25zLCBjYikge1xuICBmcy5zdGF0KHBhdGgsIGZ1bmN0aW9uIChlciwgc3RhdCkge1xuICAgIGNiKGVyLCBlciA/IGZhbHNlIDogY2hlY2tTdGF0KHN0YXQsIHBhdGgsIG9wdGlvbnMpKVxuICB9KVxufVxuXG5mdW5jdGlvbiBzeW5jIChwYXRoLCBvcHRpb25zKSB7XG4gIHJldHVybiBjaGVja1N0YXQoZnMuc3RhdFN5bmMocGF0aCksIHBhdGgsIG9wdGlvbnMpXG59XG4iLCAibW9kdWxlLmV4cG9ydHMgPSBpc2V4ZVxuaXNleGUuc3luYyA9IHN5bmNcblxudmFyIGZzID0gcmVxdWlyZSgnZnMnKVxuXG5mdW5jdGlvbiBpc2V4ZSAocGF0aCwgb3B0aW9ucywgY2IpIHtcbiAgZnMuc3RhdChwYXRoLCBmdW5jdGlvbiAoZXIsIHN0YXQpIHtcbiAgICBjYihlciwgZXIgPyBmYWxzZSA6IGNoZWNrU3RhdChzdGF0LCBvcHRpb25zKSlcbiAgfSlcbn1cblxuZnVuY3Rpb24gc3luYyAocGF0aCwgb3B0aW9ucykge1xuICByZXR1cm4gY2hlY2tTdGF0KGZzLnN0YXRTeW5jKHBhdGgpLCBvcHRpb25zKVxufVxuXG5mdW5jdGlvbiBjaGVja1N0YXQgKHN0YXQsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIHN0YXQuaXNGaWxlKCkgJiYgY2hlY2tNb2RlKHN0YXQsIG9wdGlvbnMpXG59XG5cbmZ1bmN0aW9uIGNoZWNrTW9kZSAoc3RhdCwgb3B0aW9ucykge1xuICB2YXIgbW9kID0gc3RhdC5tb2RlXG4gIHZhciB1aWQgPSBzdGF0LnVpZFxuICB2YXIgZ2lkID0gc3RhdC5naWRcblxuICB2YXIgbXlVaWQgPSBvcHRpb25zLnVpZCAhPT0gdW5kZWZpbmVkID9cbiAgICBvcHRpb25zLnVpZCA6IHByb2Nlc3MuZ2V0dWlkICYmIHByb2Nlc3MuZ2V0dWlkKClcbiAgdmFyIG15R2lkID0gb3B0aW9ucy5naWQgIT09IHVuZGVmaW5lZCA/XG4gICAgb3B0aW9ucy5naWQgOiBwcm9jZXNzLmdldGdpZCAmJiBwcm9jZXNzLmdldGdpZCgpXG5cbiAgdmFyIHUgPSBwYXJzZUludCgnMTAwJywgOClcbiAgdmFyIGcgPSBwYXJzZUludCgnMDEwJywgOClcbiAgdmFyIG8gPSBwYXJzZUludCgnMDAxJywgOClcbiAgdmFyIHVnID0gdSB8IGdcblxuICB2YXIgcmV0ID0gKG1vZCAmIG8pIHx8XG4gICAgKG1vZCAmIGcpICYmIGdpZCA9PT0gbXlHaWQgfHxcbiAgICAobW9kICYgdSkgJiYgdWlkID09PSBteVVpZCB8fFxuICAgIChtb2QgJiB1ZykgJiYgbXlVaWQgPT09IDBcblxuICByZXR1cm4gcmV0XG59XG4iLCAidmFyIGZzID0gcmVxdWlyZSgnZnMnKVxudmFyIGNvcmVcbmlmIChwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInIHx8IGdsb2JhbC5URVNUSU5HX1dJTkRPV1MpIHtcbiAgY29yZSA9IHJlcXVpcmUoJy4vd2luZG93cy5qcycpXG59IGVsc2Uge1xuICBjb3JlID0gcmVxdWlyZSgnLi9tb2RlLmpzJylcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc2V4ZVxuaXNleGUuc3luYyA9IHN5bmNcblxuZnVuY3Rpb24gaXNleGUgKHBhdGgsIG9wdGlvbnMsIGNiKSB7XG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNiID0gb3B0aW9uc1xuICAgIG9wdGlvbnMgPSB7fVxuICB9XG5cbiAgaWYgKCFjYikge1xuICAgIGlmICh0eXBlb2YgUHJvbWlzZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignY2FsbGJhY2sgbm90IHByb3ZpZGVkJylcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgaXNleGUocGF0aCwgb3B0aW9ucyB8fCB7fSwgZnVuY3Rpb24gKGVyLCBpcykge1xuICAgICAgICBpZiAoZXIpIHtcbiAgICAgICAgICByZWplY3QoZXIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZShpcylcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgY29yZShwYXRoLCBvcHRpb25zIHx8IHt9LCBmdW5jdGlvbiAoZXIsIGlzKSB7XG4gICAgLy8gaWdub3JlIEVBQ0NFUyBiZWNhdXNlIHRoYXQganVzdCBtZWFucyB3ZSBhcmVuJ3QgYWxsb3dlZCB0byBydW4gaXRcbiAgICBpZiAoZXIpIHtcbiAgICAgIGlmIChlci5jb2RlID09PSAnRUFDQ0VTJyB8fCBvcHRpb25zICYmIG9wdGlvbnMuaWdub3JlRXJyb3JzKSB7XG4gICAgICAgIGVyID0gbnVsbFxuICAgICAgICBpcyA9IGZhbHNlXG4gICAgICB9XG4gICAgfVxuICAgIGNiKGVyLCBpcylcbiAgfSlcbn1cblxuZnVuY3Rpb24gc3luYyAocGF0aCwgb3B0aW9ucykge1xuICAvLyBteSBraW5nZG9tIGZvciBhIGZpbHRlcmVkIGNhdGNoXG4gIHRyeSB7XG4gICAgcmV0dXJuIGNvcmUuc3luYyhwYXRoLCBvcHRpb25zIHx8IHt9KVxuICB9IGNhdGNoIChlcikge1xuICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMuaWdub3JlRXJyb3JzIHx8IGVyLmNvZGUgPT09ICdFQUNDRVMnKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgZXJcbiAgICB9XG4gIH1cbn1cbiIsICJtb2R1bGUuZXhwb3J0cyA9IHdoaWNoXG53aGljaC5zeW5jID0gd2hpY2hTeW5jXG5cbnZhciBpc1dpbmRvd3MgPSBwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInIHx8XG4gICAgcHJvY2Vzcy5lbnYuT1NUWVBFID09PSAnY3lnd2luJyB8fFxuICAgIHByb2Nlc3MuZW52Lk9TVFlQRSA9PT0gJ21zeXMnXG5cbnZhciBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG52YXIgQ09MT04gPSBpc1dpbmRvd3MgPyAnOycgOiAnOidcbnZhciBpc2V4ZSA9IHJlcXVpcmUoJ2lzZXhlJylcblxuZnVuY3Rpb24gZ2V0Tm90Rm91bmRFcnJvciAoY21kKSB7XG4gIHZhciBlciA9IG5ldyBFcnJvcignbm90IGZvdW5kOiAnICsgY21kKVxuICBlci5jb2RlID0gJ0VOT0VOVCdcblxuICByZXR1cm4gZXJcbn1cblxuZnVuY3Rpb24gZ2V0UGF0aEluZm8gKGNtZCwgb3B0KSB7XG4gIHZhciBjb2xvbiA9IG9wdC5jb2xvbiB8fCBDT0xPTlxuICB2YXIgcGF0aEVudiA9IG9wdC5wYXRoIHx8IHByb2Nlc3MuZW52LlBBVEggfHwgJydcbiAgdmFyIHBhdGhFeHQgPSBbJyddXG5cbiAgcGF0aEVudiA9IHBhdGhFbnYuc3BsaXQoY29sb24pXG5cbiAgdmFyIHBhdGhFeHRFeGUgPSAnJ1xuICBpZiAoaXNXaW5kb3dzKSB7XG4gICAgcGF0aEVudi51bnNoaWZ0KHByb2Nlc3MuY3dkKCkpXG4gICAgcGF0aEV4dEV4ZSA9IChvcHQucGF0aEV4dCB8fCBwcm9jZXNzLmVudi5QQVRIRVhUIHx8ICcuRVhFOy5DTUQ7LkJBVDsuQ09NJylcbiAgICBwYXRoRXh0ID0gcGF0aEV4dEV4ZS5zcGxpdChjb2xvbilcblxuXG4gICAgLy8gQWx3YXlzIHRlc3QgdGhlIGNtZCBpdHNlbGYgZmlyc3QuICBpc2V4ZSB3aWxsIGNoZWNrIHRvIG1ha2Ugc3VyZVxuICAgIC8vIGl0J3MgZm91bmQgaW4gdGhlIHBhdGhFeHQgc2V0LlxuICAgIGlmIChjbWQuaW5kZXhPZignLicpICE9PSAtMSAmJiBwYXRoRXh0WzBdICE9PSAnJylcbiAgICAgIHBhdGhFeHQudW5zaGlmdCgnJylcbiAgfVxuXG4gIC8vIElmIGl0IGhhcyBhIHNsYXNoLCB0aGVuIHdlIGRvbid0IGJvdGhlciBzZWFyY2hpbmcgdGhlIHBhdGhlbnYuXG4gIC8vIGp1c3QgY2hlY2sgdGhlIGZpbGUgaXRzZWxmLCBhbmQgdGhhdCdzIGl0LlxuICBpZiAoY21kLm1hdGNoKC9cXC8vKSB8fCBpc1dpbmRvd3MgJiYgY21kLm1hdGNoKC9cXFxcLykpXG4gICAgcGF0aEVudiA9IFsnJ11cblxuICByZXR1cm4ge1xuICAgIGVudjogcGF0aEVudixcbiAgICBleHQ6IHBhdGhFeHQsXG4gICAgZXh0RXhlOiBwYXRoRXh0RXhlXG4gIH1cbn1cblxuZnVuY3Rpb24gd2hpY2ggKGNtZCwgb3B0LCBjYikge1xuICBpZiAodHlwZW9mIG9wdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNiID0gb3B0XG4gICAgb3B0ID0ge31cbiAgfVxuXG4gIHZhciBpbmZvID0gZ2V0UGF0aEluZm8oY21kLCBvcHQpXG4gIHZhciBwYXRoRW52ID0gaW5mby5lbnZcbiAgdmFyIHBhdGhFeHQgPSBpbmZvLmV4dFxuICB2YXIgcGF0aEV4dEV4ZSA9IGluZm8uZXh0RXhlXG4gIHZhciBmb3VuZCA9IFtdXG5cbiAgOyhmdW5jdGlvbiBGIChpLCBsKSB7XG4gICAgaWYgKGkgPT09IGwpIHtcbiAgICAgIGlmIChvcHQuYWxsICYmIGZvdW5kLmxlbmd0aClcbiAgICAgICAgcmV0dXJuIGNiKG51bGwsIGZvdW5kKVxuICAgICAgZWxzZVxuICAgICAgICByZXR1cm4gY2IoZ2V0Tm90Rm91bmRFcnJvcihjbWQpKVxuICAgIH1cblxuICAgIHZhciBwYXRoUGFydCA9IHBhdGhFbnZbaV1cbiAgICBpZiAocGF0aFBhcnQuY2hhckF0KDApID09PSAnXCInICYmIHBhdGhQYXJ0LnNsaWNlKC0xKSA9PT0gJ1wiJylcbiAgICAgIHBhdGhQYXJ0ID0gcGF0aFBhcnQuc2xpY2UoMSwgLTEpXG5cbiAgICB2YXIgcCA9IHBhdGguam9pbihwYXRoUGFydCwgY21kKVxuICAgIGlmICghcGF0aFBhcnQgJiYgKC9eXFwuW1xcXFxcXC9dLykudGVzdChjbWQpKSB7XG4gICAgICBwID0gY21kLnNsaWNlKDAsIDIpICsgcFxuICAgIH1cbiAgICA7KGZ1bmN0aW9uIEUgKGlpLCBsbCkge1xuICAgICAgaWYgKGlpID09PSBsbCkgcmV0dXJuIEYoaSArIDEsIGwpXG4gICAgICB2YXIgZXh0ID0gcGF0aEV4dFtpaV1cbiAgICAgIGlzZXhlKHAgKyBleHQsIHsgcGF0aEV4dDogcGF0aEV4dEV4ZSB9LCBmdW5jdGlvbiAoZXIsIGlzKSB7XG4gICAgICAgIGlmICghZXIgJiYgaXMpIHtcbiAgICAgICAgICBpZiAob3B0LmFsbClcbiAgICAgICAgICAgIGZvdW5kLnB1c2gocCArIGV4dClcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gY2IobnVsbCwgcCArIGV4dClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gRShpaSArIDEsIGxsKVxuICAgICAgfSlcbiAgICB9KSgwLCBwYXRoRXh0Lmxlbmd0aClcbiAgfSkoMCwgcGF0aEVudi5sZW5ndGgpXG59XG5cbmZ1bmN0aW9uIHdoaWNoU3luYyAoY21kLCBvcHQpIHtcbiAgb3B0ID0gb3B0IHx8IHt9XG5cbiAgdmFyIGluZm8gPSBnZXRQYXRoSW5mbyhjbWQsIG9wdClcbiAgdmFyIHBhdGhFbnYgPSBpbmZvLmVudlxuICB2YXIgcGF0aEV4dCA9IGluZm8uZXh0XG4gIHZhciBwYXRoRXh0RXhlID0gaW5mby5leHRFeGVcbiAgdmFyIGZvdW5kID0gW11cblxuICBmb3IgKHZhciBpID0gMCwgbCA9IHBhdGhFbnYubGVuZ3RoOyBpIDwgbDsgaSArKykge1xuICAgIHZhciBwYXRoUGFydCA9IHBhdGhFbnZbaV1cbiAgICBpZiAocGF0aFBhcnQuY2hhckF0KDApID09PSAnXCInICYmIHBhdGhQYXJ0LnNsaWNlKC0xKSA9PT0gJ1wiJylcbiAgICAgIHBhdGhQYXJ0ID0gcGF0aFBhcnQuc2xpY2UoMSwgLTEpXG5cbiAgICB2YXIgcCA9IHBhdGguam9pbihwYXRoUGFydCwgY21kKVxuICAgIGlmICghcGF0aFBhcnQgJiYgL15cXC5bXFxcXFxcL10vLnRlc3QoY21kKSkge1xuICAgICAgcCA9IGNtZC5zbGljZSgwLCAyKSArIHBcbiAgICB9XG4gICAgZm9yICh2YXIgaiA9IDAsIGxsID0gcGF0aEV4dC5sZW5ndGg7IGogPCBsbDsgaiArKykge1xuICAgICAgdmFyIGN1ciA9IHAgKyBwYXRoRXh0W2pdXG4gICAgICB2YXIgaXNcbiAgICAgIHRyeSB7XG4gICAgICAgIGlzID0gaXNleGUuc3luYyhjdXIsIHsgcGF0aEV4dDogcGF0aEV4dEV4ZSB9KVxuICAgICAgICBpZiAoaXMpIHtcbiAgICAgICAgICBpZiAob3B0LmFsbClcbiAgICAgICAgICAgIGZvdW5kLnB1c2goY3VyKVxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBjdXJcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXgpIHt9XG4gICAgfVxuICB9XG5cbiAgaWYgKG9wdC5hbGwgJiYgZm91bmQubGVuZ3RoKVxuICAgIHJldHVybiBmb3VuZFxuXG4gIGlmIChvcHQubm90aHJvdylcbiAgICByZXR1cm4gbnVsbFxuXG4gIHRocm93IGdldE5vdEZvdW5kRXJyb3IoY21kKVxufVxuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG52YXIgd2hpY2ggPSByZXF1aXJlKCd3aGljaCcpO1xudmFyIExSVSA9IHJlcXVpcmUoJ2xydS1jYWNoZScpO1xuXG52YXIgY29tbWFuZENhY2hlID0gbmV3IExSVSh7IG1heDogNTAsIG1heEFnZTogMzAgKiAxMDAwIH0pOyAgLy8gQ2FjaGUganVzdCBmb3IgMzBzZWNcblxuZnVuY3Rpb24gcmVzb2x2ZUNvbW1hbmQoY29tbWFuZCwgbm9FeHRlbnNpb24pIHtcbiAgICB2YXIgcmVzb2x2ZWQ7XG5cbiAgICBub0V4dGVuc2lvbiA9ICEhbm9FeHRlbnNpb247XG4gICAgcmVzb2x2ZWQgPSBjb21tYW5kQ2FjaGUuZ2V0KGNvbW1hbmQgKyAnIScgKyBub0V4dGVuc2lvbik7XG5cbiAgICAvLyBDaGVjayBpZiBpdHMgcmVzb2x2ZWQgaW4gdGhlIGNhY2hlXG4gICAgaWYgKGNvbW1hbmRDYWNoZS5oYXMoY29tbWFuZCkpIHtcbiAgICAgICAgcmV0dXJuIGNvbW1hbmRDYWNoZS5nZXQoY29tbWFuZCk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgICAgcmVzb2x2ZWQgPSAhbm9FeHRlbnNpb24gP1xuICAgICAgICAgICAgd2hpY2guc3luYyhjb21tYW5kKSA6XG4gICAgICAgICAgICB3aGljaC5zeW5jKGNvbW1hbmQsIHsgcGF0aEV4dDogcGF0aC5kZWxpbWl0ZXIgKyAocHJvY2Vzcy5lbnYuUEFUSEVYVCB8fCAnJykgfSk7XG4gICAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG5cbiAgICBjb21tYW5kQ2FjaGUuc2V0KGNvbW1hbmQgKyAnIScgKyBub0V4dGVuc2lvbiwgcmVzb2x2ZWQpO1xuXG4gICAgcmV0dXJuIHJlc29sdmVkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlc29sdmVDb21tYW5kO1xuIiwgIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gKCkge1xuICAgIGlmIChwcm9jZXNzLnBsYXRmb3JtICE9PSAnd2luMzInKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIG5vZGVWZXIgPSBwcm9jZXNzLnZlcnNpb24uc3Vic3RyKDEpLnNwbGl0KCcuJykubWFwKGZ1bmN0aW9uIChudW0pIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KG51bSwgMTApO1xuICAgIH0pO1xuICAgIHJldHVybiAobm9kZVZlclswXSA9PT0gMCAmJiBub2RlVmVyWzFdIDwgMTIpO1xufSkoKTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG52YXIgTFJVID0gcmVxdWlyZSgnbHJ1LWNhY2hlJyk7XG52YXIgcmVzb2x2ZUNvbW1hbmQgPSByZXF1aXJlKCcuL3Jlc29sdmVDb21tYW5kJyk7XG52YXIgaGFzQnJva2VuU3Bhd24gPSByZXF1aXJlKCcuL2hhc0Jyb2tlblNwYXduJyk7XG5cbnZhciBpc1dpbiA9IHByb2Nlc3MucGxhdGZvcm0gPT09ICd3aW4zMic7XG52YXIgc2hlYmFuZ0NhY2hlID0gbmV3IExSVSh7IG1heDogNTAsIG1heEFnZTogMzAgKiAxMDAwIH0pOyAgLy8gQ2FjaGUganVzdCBmb3IgMzBzZWNcblxuZnVuY3Rpb24gcmVhZFNoZWJhbmcoY29tbWFuZCkge1xuICAgIHZhciBidWZmZXI7XG4gICAgdmFyIGZkO1xuICAgIHZhciBtYXRjaDtcbiAgICB2YXIgc2hlYmFuZztcblxuICAgIC8vIENoZWNrIGlmIGl0IGlzIGluIHRoZSBjYWNoZSBmaXJzdFxuICAgIGlmIChzaGViYW5nQ2FjaGUuaGFzKGNvbW1hbmQpKSB7XG4gICAgICAgIHJldHVybiBzaGViYW5nQ2FjaGUuZ2V0KGNvbW1hbmQpO1xuICAgIH1cblxuICAgIC8vIFJlYWQgdGhlIGZpcnN0IDE1MCBieXRlcyBmcm9tIHRoZSBmaWxlXG4gICAgYnVmZmVyID0gbmV3IEJ1ZmZlcigxNTApO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgZmQgPSBmcy5vcGVuU3luYyhjb21tYW5kLCAncicpO1xuICAgICAgICBmcy5yZWFkU3luYyhmZCwgYnVmZmVyLCAwLCAxNTAsIDApO1xuICAgICAgICBmcy5jbG9zZVN5bmMoZmQpO1xuICAgIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxuXG4gICAgLy8gQ2hlY2sgaWYgaXQgaXMgYSBzaGViYW5nXG4gICAgbWF0Y2ggPSBidWZmZXIudG9TdHJpbmcoKS50cmltKCkubWF0Y2goLyMhKC4rKS9pKTtcblxuICAgIGlmIChtYXRjaCkge1xuICAgICAgICBzaGViYW5nID0gbWF0Y2hbMV0ucmVwbGFjZSgvXFwvdXNyXFwvYmluXFwvZW52XFxzKy9pLCAnJyk7ICAgLy8gUmVtb3ZlIC91c3IvYmluL2VudlxuICAgIH1cblxuICAgIC8vIFN0b3JlIHRoZSBzaGViYW5nIGluIHRoZSBjYWNoZVxuICAgIHNoZWJhbmdDYWNoZS5zZXQoY29tbWFuZCwgc2hlYmFuZyk7XG5cbiAgICByZXR1cm4gc2hlYmFuZztcbn1cblxuZnVuY3Rpb24gZXNjYXBlQXJnKGFyZywgcXVvdGUpIHtcbiAgICAvLyBDb252ZXJ0IHRvIHN0cmluZ1xuICAgIGFyZyA9ICcnICsgYXJnO1xuXG4gICAgLy8gSWYgd2UgYXJlIG5vdCBnb2luZyB0byBxdW90ZSB0aGUgYXJndW1lbnQsXG4gICAgLy8gZXNjYXBlIHNoZWxsIG1ldGFjaGFyYWN0ZXJzLCBpbmNsdWRpbmcgZG91YmxlIGFuZCBzaW5nbGUgcXVvdGVzOlxuICAgIGlmICghcXVvdGUpIHtcbiAgICAgICAgYXJnID0gYXJnLnJlcGxhY2UoLyhbXFwoXFwpJSFcXF48PiZ8OyxcIidcXHNdKS9nLCAnXiQxJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gU2VxdWVuY2Ugb2YgYmFja3NsYXNoZXMgZm9sbG93ZWQgYnkgYSBkb3VibGUgcXVvdGU6XG4gICAgICAgIC8vIGRvdWJsZSB1cCBhbGwgdGhlIGJhY2tzbGFzaGVzIGFuZCBlc2NhcGUgdGhlIGRvdWJsZSBxdW90ZVxuICAgICAgICBhcmcgPSBhcmcucmVwbGFjZSgvKFxcXFwqKVwiL2csICckMSQxXFxcXFwiJyk7XG5cbiAgICAgICAgLy8gU2VxdWVuY2Ugb2YgYmFja3NsYXNoZXMgZm9sbG93ZWQgYnkgdGhlIGVuZCBvZiB0aGUgc3RyaW5nXG4gICAgICAgIC8vICh3aGljaCB3aWxsIGJlY29tZSBhIGRvdWJsZSBxdW90ZSBsYXRlcik6XG4gICAgICAgIC8vIGRvdWJsZSB1cCBhbGwgdGhlIGJhY2tzbGFzaGVzXG4gICAgICAgIGFyZyA9IGFyZy5yZXBsYWNlKC8oXFxcXCopJC8sICckMSQxJyk7XG5cbiAgICAgICAgLy8gQWxsIG90aGVyIGJhY2tzbGFzaGVzIG9jY3VyIGxpdGVyYWxseVxuXG4gICAgICAgIC8vIFF1b3RlIHRoZSB3aG9sZSB0aGluZzpcbiAgICAgICAgYXJnID0gJ1wiJyArIGFyZyArICdcIic7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFyZztcbn1cblxuZnVuY3Rpb24gZXNjYXBlQ29tbWFuZChjb21tYW5kKSB7XG4gICAgLy8gRG8gbm90IGVzY2FwZSBpZiB0aGlzIGNvbW1hbmQgaXMgbm90IGRhbmdlcm91cy4uXG4gICAgLy8gV2UgZG8gdGhpcyBzbyB0aGF0IGNvbW1hbmRzIGxpa2UgXCJlY2hvXCIgb3IgXCJpZmNvbmZpZ1wiIHdvcmtcbiAgICAvLyBRdW90aW5nIHRoZW0sIHdpbGwgbWFrZSB0aGVtIHVuYWNjZXNzaWJsZVxuICAgIHJldHVybiAvXlthLXowLTlfLV0rJC9pLnRlc3QoY29tbWFuZCkgPyBjb21tYW5kIDogZXNjYXBlQXJnKGNvbW1hbmQsIHRydWUpO1xufVxuXG5mdW5jdGlvbiByZXF1aXJlc1NoZWxsKGNvbW1hbmQpIHtcbiAgICByZXR1cm4gIS9cXC4oPzpjb218ZXhlKSQvaS50ZXN0KGNvbW1hbmQpO1xufVxuXG5mdW5jdGlvbiBwYXJzZShjb21tYW5kLCBhcmdzLCBvcHRpb25zKSB7XG4gICAgdmFyIHNoZWJhbmc7XG4gICAgdmFyIGFwcGx5UXVvdGVzO1xuICAgIHZhciBmaWxlO1xuICAgIHZhciBvcmlnaW5hbDtcbiAgICB2YXIgc2hlbGw7XG5cbiAgICAvLyBOb3JtYWxpemUgYXJndW1lbnRzLCBzaW1pbGFyIHRvIG5vZGVqc1xuICAgIGlmIChhcmdzICYmICFBcnJheS5pc0FycmF5KGFyZ3MpKSB7XG4gICAgICAgIG9wdGlvbnMgPSBhcmdzO1xuICAgICAgICBhcmdzID0gbnVsbDtcbiAgICB9XG5cbiAgICBhcmdzID0gYXJncyA/IGFyZ3Muc2xpY2UoMCkgOiBbXTsgIC8vIENsb25lIGFycmF5IHRvIGF2b2lkIGNoYW5naW5nIHRoZSBvcmlnaW5hbFxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIG9yaWdpbmFsID0gY29tbWFuZDtcblxuICAgIGlmIChpc1dpbikge1xuICAgICAgICAvLyBEZXRlY3QgJiBhZGQgc3VwcG9ydCBmb3Igc2hlYmFuZ3NcbiAgICAgICAgZmlsZSA9IHJlc29sdmVDb21tYW5kKGNvbW1hbmQpO1xuICAgICAgICBmaWxlID0gZmlsZSB8fCByZXNvbHZlQ29tbWFuZChjb21tYW5kLCB0cnVlKTtcbiAgICAgICAgc2hlYmFuZyA9IGZpbGUgJiYgcmVhZFNoZWJhbmcoZmlsZSk7XG4gICAgICAgIHNoZWxsID0gb3B0aW9ucy5zaGVsbCB8fCBoYXNCcm9rZW5TcGF3bjtcblxuICAgICAgICBpZiAoc2hlYmFuZykge1xuICAgICAgICAgICAgYXJncy51bnNoaWZ0KGZpbGUpO1xuICAgICAgICAgICAgY29tbWFuZCA9IHNoZWJhbmc7XG4gICAgICAgICAgICBzaGVsbCA9IHNoZWxsIHx8IHJlcXVpcmVzU2hlbGwocmVzb2x2ZUNvbW1hbmQoc2hlYmFuZykgfHwgcmVzb2x2ZUNvbW1hbmQoc2hlYmFuZywgdHJ1ZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2hlbGwgPSBzaGVsbCB8fCByZXF1aXJlc1NoZWxsKGZpbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNoZWxsKSB7XG4gICAgICAgICAgICAvLyBFc2NhcGUgY29tbWFuZCAmIGFyZ3VtZW50c1xuICAgICAgICAgICAgYXBwbHlRdW90ZXMgPSAoY29tbWFuZCAhPT0gJ2VjaG8nKTsgIC8vIERvIG5vdCBxdW90ZSBhcmd1bWVudHMgZm9yIHRoZSBzcGVjaWFsIFwiZWNob1wiIGNvbW1hbmRcbiAgICAgICAgICAgIGNvbW1hbmQgPSBlc2NhcGVDb21tYW5kKGNvbW1hbmQpO1xuICAgICAgICAgICAgYXJncyA9IGFyZ3MubWFwKGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXNjYXBlQXJnKGFyZywgYXBwbHlRdW90ZXMpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIFVzZSBjbWQuZXhlXG4gICAgICAgICAgICBhcmdzID0gWycvcycsICcvYycsICdcIicgKyBjb21tYW5kICsgKGFyZ3MubGVuZ3RoID8gJyAnICsgYXJncy5qb2luKCcgJykgOiAnJykgKyAnXCInXTtcbiAgICAgICAgICAgIGNvbW1hbmQgPSBwcm9jZXNzLmVudi5jb21zcGVjIHx8ICdjbWQuZXhlJztcblxuICAgICAgICAgICAgLy8gVGVsbCBub2RlJ3Mgc3Bhd24gdGhhdCB0aGUgYXJndW1lbnRzIGFyZSBhbHJlYWR5IGVzY2FwZWRcbiAgICAgICAgICAgIG9wdGlvbnMud2luZG93c1ZlcmJhdGltQXJndW1lbnRzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGNvbW1hbmQ6IGNvbW1hbmQsXG4gICAgICAgIGFyZ3M6IGFyZ3MsXG4gICAgICAgIG9wdGlvbnM6IG9wdGlvbnMsXG4gICAgICAgIGZpbGU6IGZpbGUsXG4gICAgICAgIG9yaWdpbmFsOiBvcmlnaW5hbCxcbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcnNlO1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIGlzV2luID0gcHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJztcbnZhciByZXNvbHZlQ29tbWFuZCA9IHJlcXVpcmUoJy4vcmVzb2x2ZUNvbW1hbmQnKTtcblxudmFyIGlzTm9kZTEwID0gcHJvY2Vzcy52ZXJzaW9uLmluZGV4T2YoJ3YwLjEwLicpID09PSAwO1xuXG5mdW5jdGlvbiBub3RGb3VuZEVycm9yKGNvbW1hbmQsIHN5c2NhbGwpIHtcbiAgICB2YXIgZXJyO1xuXG4gICAgZXJyID0gbmV3IEVycm9yKHN5c2NhbGwgKyAnICcgKyBjb21tYW5kICsgJyBFTk9FTlQnKTtcbiAgICBlcnIuY29kZSA9IGVyci5lcnJubyA9ICdFTk9FTlQnO1xuICAgIGVyci5zeXNjYWxsID0gc3lzY2FsbCArICcgJyArIGNvbW1hbmQ7XG5cbiAgICByZXR1cm4gZXJyO1xufVxuXG5mdW5jdGlvbiBob29rQ2hpbGRQcm9jZXNzKGNwLCBwYXJzZWQpIHtcbiAgICB2YXIgb3JpZ2luYWxFbWl0O1xuXG4gICAgaWYgKCFpc1dpbikge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgb3JpZ2luYWxFbWl0ID0gY3AuZW1pdDtcbiAgICBjcC5lbWl0ID0gZnVuY3Rpb24gKG5hbWUsIGFyZzEpIHtcbiAgICAgICAgdmFyIGVycjtcblxuICAgICAgICAvLyBJZiBlbWl0dGluZyBcImV4aXRcIiBldmVudCBhbmQgZXhpdCBjb2RlIGlzIDEsIHdlIG5lZWQgdG8gY2hlY2sgaWZcbiAgICAgICAgLy8gdGhlIGNvbW1hbmQgZXhpc3RzIGFuZCBlbWl0IGFuIFwiZXJyb3JcIiBpbnN0ZWFkXG4gICAgICAgIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL0luZGlnb1VuaXRlZC9ub2RlLWNyb3NzLXNwYXduL2lzc3Vlcy8xNlxuICAgICAgICBpZiAobmFtZSA9PT0gJ2V4aXQnKSB7XG4gICAgICAgICAgICBlcnIgPSB2ZXJpZnlFTk9FTlQoYXJnMSwgcGFyc2VkLCAnc3Bhd24nKTtcblxuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHJldHVybiBvcmlnaW5hbEVtaXQuY2FsbChjcCwgJ2Vycm9yJywgZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvcmlnaW5hbEVtaXQuYXBwbHkoY3AsIGFyZ3VtZW50cyk7XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gdmVyaWZ5RU5PRU5UKHN0YXR1cywgcGFyc2VkKSB7XG4gICAgaWYgKGlzV2luICYmIHN0YXR1cyA9PT0gMSAmJiAhcGFyc2VkLmZpbGUpIHtcbiAgICAgICAgcmV0dXJuIG5vdEZvdW5kRXJyb3IocGFyc2VkLm9yaWdpbmFsLCAnc3Bhd24nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gdmVyaWZ5RU5PRU5UU3luYyhzdGF0dXMsIHBhcnNlZCkge1xuICAgIGlmIChpc1dpbiAmJiBzdGF0dXMgPT09IDEgJiYgIXBhcnNlZC5maWxlKSB7XG4gICAgICAgIHJldHVybiBub3RGb3VuZEVycm9yKHBhcnNlZC5vcmlnaW5hbCwgJ3NwYXduU3luYycpO1xuICAgIH1cblxuICAgIC8vIElmIHdlIGFyZSBpbiBub2RlIDEwLCB0aGVuIHdlIGFyZSB1c2luZyBzcGF3bi1zeW5jOyBpZiBpdCBleGl0ZWRcbiAgICAvLyB3aXRoIC0xIGl0IHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIGNvbW1hbmQgZG9lcyBub3QgZXhpc3RcbiAgICBpZiAoaXNOb2RlMTAgJiYgc3RhdHVzID09PSAtMSkge1xuICAgICAgICBwYXJzZWQuZmlsZSA9IGlzV2luID8gcGFyc2VkLmZpbGUgOiByZXNvbHZlQ29tbWFuZChwYXJzZWQub3JpZ2luYWwpO1xuXG4gICAgICAgIGlmICghcGFyc2VkLmZpbGUpIHtcbiAgICAgICAgICAgIHJldHVybiBub3RGb3VuZEVycm9yKHBhcnNlZC5vcmlnaW5hbCwgJ3NwYXduU3luYycpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG59XG5cbm1vZHVsZS5leHBvcnRzLmhvb2tDaGlsZFByb2Nlc3MgPSBob29rQ2hpbGRQcm9jZXNzO1xubW9kdWxlLmV4cG9ydHMudmVyaWZ5RU5PRU5UID0gdmVyaWZ5RU5PRU5UO1xubW9kdWxlLmV4cG9ydHMudmVyaWZ5RU5PRU5UU3luYyA9IHZlcmlmeUVOT0VOVFN5bmM7XG5tb2R1bGUuZXhwb3J0cy5ub3RGb3VuZEVycm9yID0gbm90Rm91bmRFcnJvcjtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBjcCA9IHJlcXVpcmUoJ2NoaWxkX3Byb2Nlc3MnKTtcbnZhciBwYXJzZSA9IHJlcXVpcmUoJy4vbGliL3BhcnNlJyk7XG52YXIgZW5vZW50ID0gcmVxdWlyZSgnLi9saWIvZW5vZW50Jyk7XG5cbnZhciBjcFNwYXduU3luYyA9IGNwLnNwYXduU3luYztcblxuZnVuY3Rpb24gc3Bhd24oY29tbWFuZCwgYXJncywgb3B0aW9ucykge1xuICAgIHZhciBwYXJzZWQ7XG4gICAgdmFyIHNwYXduZWQ7XG5cbiAgICAvLyBQYXJzZSB0aGUgYXJndW1lbnRzXG4gICAgcGFyc2VkID0gcGFyc2UoY29tbWFuZCwgYXJncywgb3B0aW9ucyk7XG5cbiAgICAvLyBTcGF3biB0aGUgY2hpbGQgcHJvY2Vzc1xuICAgIHNwYXduZWQgPSBjcC5zcGF3bihwYXJzZWQuY29tbWFuZCwgcGFyc2VkLmFyZ3MsIHBhcnNlZC5vcHRpb25zKTtcblxuICAgIC8vIEhvb2sgaW50byBjaGlsZCBwcm9jZXNzIFwiZXhpdFwiIGV2ZW50IHRvIGVtaXQgYW4gZXJyb3IgaWYgdGhlIGNvbW1hbmRcbiAgICAvLyBkb2VzIG5vdCBleGlzdHMsIHNlZTogaHR0cHM6Ly9naXRodWIuY29tL0luZGlnb1VuaXRlZC9ub2RlLWNyb3NzLXNwYXduL2lzc3Vlcy8xNlxuICAgIGVub2VudC5ob29rQ2hpbGRQcm9jZXNzKHNwYXduZWQsIHBhcnNlZCk7XG5cbiAgICByZXR1cm4gc3Bhd25lZDtcbn1cblxuZnVuY3Rpb24gc3Bhd25TeW5jKGNvbW1hbmQsIGFyZ3MsIG9wdGlvbnMpIHtcbiAgICB2YXIgcGFyc2VkO1xuICAgIHZhciByZXN1bHQ7XG5cbiAgICBpZiAoIWNwU3Bhd25TeW5jKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjcFNwYXduU3luYyA9IHJlcXVpcmUoJ3NwYXduLXN5bmMnKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZ2xvYmFsLXJlcXVpcmVcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICAnSW4gb3JkZXIgdG8gdXNlIHNwYXduU3luYyBvbiBub2RlIDAuMTAgb3Igb2xkZXIsIHlvdSBtdXN0ICcgK1xuICAgICAgICAgICAgICAgICdpbnN0YWxsIHNwYXduLXN5bmM6XFxuXFxuJyArXG4gICAgICAgICAgICAgICAgJyAgbnBtIGluc3RhbGwgc3Bhd24tc3luYyAtLXNhdmUnXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gUGFyc2UgdGhlIGFyZ3VtZW50c1xuICAgIHBhcnNlZCA9IHBhcnNlKGNvbW1hbmQsIGFyZ3MsIG9wdGlvbnMpO1xuXG4gICAgLy8gU3Bhd24gdGhlIGNoaWxkIHByb2Nlc3NcbiAgICByZXN1bHQgPSBjcFNwYXduU3luYyhwYXJzZWQuY29tbWFuZCwgcGFyc2VkLmFyZ3MsIHBhcnNlZC5vcHRpb25zKTtcblxuICAgIC8vIEFuYWx5emUgaWYgdGhlIGNvbW1hbmQgZG9lcyBub3QgZXhpc3RzLCBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9JbmRpZ29Vbml0ZWQvbm9kZS1jcm9zcy1zcGF3bi9pc3N1ZXMvMTZcbiAgICByZXN1bHQuZXJyb3IgPSByZXN1bHQuZXJyb3IgfHwgZW5vZW50LnZlcmlmeUVOT0VOVFN5bmMocmVzdWx0LnN0YXR1cywgcGFyc2VkKTtcblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3Bhd247XG5tb2R1bGUuZXhwb3J0cy5zcGF3biA9IHNwYXduO1xubW9kdWxlLmV4cG9ydHMuc3luYyA9IHNwYXduU3luYztcblxubW9kdWxlLmV4cG9ydHMuX3BhcnNlID0gcGFyc2U7XG5tb2R1bGUuZXhwb3J0cy5fZW5vZW50ID0gZW5vZW50O1xuIiwgIihmdW5jdGlvbiAocm9vdCkge1xuXG4gIC8vIFN0b3JlIHNldFRpbWVvdXQgcmVmZXJlbmNlIHNvIHByb21pc2UtcG9seWZpbGwgd2lsbCBiZSB1bmFmZmVjdGVkIGJ5XG4gIC8vIG90aGVyIGNvZGUgbW9kaWZ5aW5nIHNldFRpbWVvdXQgKGxpa2Ugc2lub24udXNlRmFrZVRpbWVycygpKVxuICB2YXIgc2V0VGltZW91dEZ1bmMgPSBzZXRUaW1lb3V0O1xuXG4gIGZ1bmN0aW9uIG5vb3AoKSB7fVxuICBcbiAgLy8gUG9seWZpbGwgZm9yIEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kXG4gIGZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNBcmcpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgZm4uYXBwbHkodGhpc0FyZywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gUHJvbWlzZShmbikge1xuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBQcm9taXNlKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignUHJvbWlzZXMgbXVzdCBiZSBjb25zdHJ1Y3RlZCB2aWEgbmV3Jyk7XG4gICAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykgdGhyb3cgbmV3IFR5cGVFcnJvcignbm90IGEgZnVuY3Rpb24nKTtcbiAgICB0aGlzLl9zdGF0ZSA9IDA7XG4gICAgdGhpcy5faGFuZGxlZCA9IGZhbHNlO1xuICAgIHRoaXMuX3ZhbHVlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2RlZmVycmVkcyA9IFtdO1xuXG4gICAgZG9SZXNvbHZlKGZuLCB0aGlzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZShzZWxmLCBkZWZlcnJlZCkge1xuICAgIHdoaWxlIChzZWxmLl9zdGF0ZSA9PT0gMykge1xuICAgICAgc2VsZiA9IHNlbGYuX3ZhbHVlO1xuICAgIH1cbiAgICBpZiAoc2VsZi5fc3RhdGUgPT09IDApIHtcbiAgICAgIHNlbGYuX2RlZmVycmVkcy5wdXNoKGRlZmVycmVkKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc2VsZi5faGFuZGxlZCA9IHRydWU7XG4gICAgUHJvbWlzZS5faW1tZWRpYXRlRm4oZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGNiID0gc2VsZi5fc3RhdGUgPT09IDEgPyBkZWZlcnJlZC5vbkZ1bGZpbGxlZCA6IGRlZmVycmVkLm9uUmVqZWN0ZWQ7XG4gICAgICBpZiAoY2IgPT09IG51bGwpIHtcbiAgICAgICAgKHNlbGYuX3N0YXRlID09PSAxID8gcmVzb2x2ZSA6IHJlamVjdCkoZGVmZXJyZWQucHJvbWlzZSwgc2VsZi5fdmFsdWUpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgcmV0O1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0ID0gY2Ioc2VsZi5fdmFsdWUpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZWplY3QoZGVmZXJyZWQucHJvbWlzZSwgZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHJlc29sdmUoZGVmZXJyZWQucHJvbWlzZSwgcmV0KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc29sdmUoc2VsZiwgbmV3VmFsdWUpIHtcbiAgICB0cnkge1xuICAgICAgLy8gUHJvbWlzZSBSZXNvbHV0aW9uIFByb2NlZHVyZTogaHR0cHM6Ly9naXRodWIuY29tL3Byb21pc2VzLWFwbHVzL3Byb21pc2VzLXNwZWMjdGhlLXByb21pc2UtcmVzb2x1dGlvbi1wcm9jZWR1cmVcbiAgICAgIGlmIChuZXdWYWx1ZSA9PT0gc2VsZikgdGhyb3cgbmV3IFR5cGVFcnJvcignQSBwcm9taXNlIGNhbm5vdCBiZSByZXNvbHZlZCB3aXRoIGl0c2VsZi4nKTtcbiAgICAgIGlmIChuZXdWYWx1ZSAmJiAodHlwZW9mIG5ld1ZhbHVlID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgbmV3VmFsdWUgPT09ICdmdW5jdGlvbicpKSB7XG4gICAgICAgIHZhciB0aGVuID0gbmV3VmFsdWUudGhlbjtcbiAgICAgICAgaWYgKG5ld1ZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgIHNlbGYuX3N0YXRlID0gMztcbiAgICAgICAgICBzZWxmLl92YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICAgIGZpbmFsZShzZWxmKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBkb1Jlc29sdmUoYmluZCh0aGVuLCBuZXdWYWx1ZSksIHNlbGYpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgc2VsZi5fc3RhdGUgPSAxO1xuICAgICAgc2VsZi5fdmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgIGZpbmFsZShzZWxmKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZWplY3Qoc2VsZiwgZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVqZWN0KHNlbGYsIG5ld1ZhbHVlKSB7XG4gICAgc2VsZi5fc3RhdGUgPSAyO1xuICAgIHNlbGYuX3ZhbHVlID0gbmV3VmFsdWU7XG4gICAgZmluYWxlKHNlbGYpO1xuICB9XG5cbiAgZnVuY3Rpb24gZmluYWxlKHNlbGYpIHtcbiAgICBpZiAoc2VsZi5fc3RhdGUgPT09IDIgJiYgc2VsZi5fZGVmZXJyZWRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgUHJvbWlzZS5faW1tZWRpYXRlRm4oZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghc2VsZi5faGFuZGxlZCkge1xuICAgICAgICAgIFByb21pc2UuX3VuaGFuZGxlZFJlamVjdGlvbkZuKHNlbGYuX3ZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHNlbGYuX2RlZmVycmVkcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgaGFuZGxlKHNlbGYsIHNlbGYuX2RlZmVycmVkc1tpXSk7XG4gICAgfVxuICAgIHNlbGYuX2RlZmVycmVkcyA9IG51bGw7XG4gIH1cblxuICBmdW5jdGlvbiBIYW5kbGVyKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkLCBwcm9taXNlKSB7XG4gICAgdGhpcy5vbkZ1bGZpbGxlZCA9IHR5cGVvZiBvbkZ1bGZpbGxlZCA9PT0gJ2Z1bmN0aW9uJyA/IG9uRnVsZmlsbGVkIDogbnVsbDtcbiAgICB0aGlzLm9uUmVqZWN0ZWQgPSB0eXBlb2Ygb25SZWplY3RlZCA9PT0gJ2Z1bmN0aW9uJyA/IG9uUmVqZWN0ZWQgOiBudWxsO1xuICAgIHRoaXMucHJvbWlzZSA9IHByb21pc2U7XG4gIH1cblxuICAvKipcbiAgICogVGFrZSBhIHBvdGVudGlhbGx5IG1pc2JlaGF2aW5nIHJlc29sdmVyIGZ1bmN0aW9uIGFuZCBtYWtlIHN1cmVcbiAgICogb25GdWxmaWxsZWQgYW5kIG9uUmVqZWN0ZWQgYXJlIG9ubHkgY2FsbGVkIG9uY2UuXG4gICAqXG4gICAqIE1ha2VzIG5vIGd1YXJhbnRlZXMgYWJvdXQgYXN5bmNocm9ueS5cbiAgICovXG4gIGZ1bmN0aW9uIGRvUmVzb2x2ZShmbiwgc2VsZikge1xuICAgIHZhciBkb25lID0gZmFsc2U7XG4gICAgdHJ5IHtcbiAgICAgIGZuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAoZG9uZSkgcmV0dXJuO1xuICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgICAgcmVzb2x2ZShzZWxmLCB2YWx1ZSk7XG4gICAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICAgIGlmIChkb25lKSByZXR1cm47XG4gICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICByZWplY3Qoc2VsZiwgcmVhc29uKTtcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICBpZiAoZG9uZSkgcmV0dXJuO1xuICAgICAgZG9uZSA9IHRydWU7XG4gICAgICByZWplY3Qoc2VsZiwgZXgpO1xuICAgIH1cbiAgfVxuXG4gIFByb21pc2UucHJvdG90eXBlWydjYXRjaCddID0gZnVuY3Rpb24gKG9uUmVqZWN0ZWQpIHtcbiAgICByZXR1cm4gdGhpcy50aGVuKG51bGwsIG9uUmVqZWN0ZWQpO1xuICB9O1xuXG4gIFByb21pc2UucHJvdG90eXBlLnRoZW4gPSBmdW5jdGlvbiAob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpIHtcbiAgICB2YXIgcHJvbSA9IG5ldyAodGhpcy5jb25zdHJ1Y3Rvcikobm9vcCk7XG5cbiAgICBoYW5kbGUodGhpcywgbmV3IEhhbmRsZXIob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQsIHByb20pKTtcbiAgICByZXR1cm4gcHJvbTtcbiAgfTtcblxuICBQcm9taXNlLmFsbCA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgaWYgKCFhcnIgfHwgdHlwZW9mIGFyci5sZW5ndGggPT09ICd1bmRlZmluZWQnKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdQcm9taXNlLmFsbCBhY2NlcHRzIGFuIGFycmF5Jyk7XG4gICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFycik7XG4gICAgICBpZiAoYXJncy5sZW5ndGggPT09IDApIHJldHVybiByZXNvbHZlKFtdKTtcbiAgICAgIHZhciByZW1haW5pbmcgPSBhcmdzLmxlbmd0aDtcblxuICAgICAgZnVuY3Rpb24gcmVzKGksIHZhbCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICh2YWwgJiYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnIHx8IHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpKSB7XG4gICAgICAgICAgICB2YXIgdGhlbiA9IHZhbC50aGVuO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgIHRoZW4uY2FsbCh2YWwsIGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgICAgICByZXMoaSwgdmFsKTtcbiAgICAgICAgICAgICAgfSwgcmVqZWN0KTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBhcmdzW2ldID0gdmFsO1xuICAgICAgICAgIGlmICgtLXJlbWFpbmluZyA9PT0gMCkge1xuICAgICAgICAgICAgcmVzb2x2ZShhcmdzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgcmVqZWN0KGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzKGksIGFyZ3NbaV0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIFByb21pc2UucmVzb2x2ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlLmNvbnN0cnVjdG9yID09PSBQcm9taXNlKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICB9KTtcbiAgfTtcblxuICBQcm9taXNlLnJlamVjdCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICByZWplY3QodmFsdWUpO1xuICAgIH0pO1xuICB9O1xuXG4gIFByb21pc2UucmFjZSA9IGZ1bmN0aW9uICh2YWx1ZXMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHZhbHVlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB2YWx1ZXNbaV0udGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIC8vIFVzZSBwb2x5ZmlsbCBmb3Igc2V0SW1tZWRpYXRlIGZvciBwZXJmb3JtYW5jZSBnYWluc1xuICBQcm9taXNlLl9pbW1lZGlhdGVGbiA9ICh0eXBlb2Ygc2V0SW1tZWRpYXRlID09PSAnZnVuY3Rpb24nICYmIGZ1bmN0aW9uIChmbikgeyBzZXRJbW1lZGlhdGUoZm4pOyB9KSB8fFxuICAgIGZ1bmN0aW9uIChmbikge1xuICAgICAgc2V0VGltZW91dEZ1bmMoZm4sIDApO1xuICAgIH07XG5cbiAgUHJvbWlzZS5fdW5oYW5kbGVkUmVqZWN0aW9uRm4gPSBmdW5jdGlvbiBfdW5oYW5kbGVkUmVqZWN0aW9uRm4oZXJyKSB7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiBjb25zb2xlKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1Bvc3NpYmxlIFVuaGFuZGxlZCBQcm9taXNlIFJlamVjdGlvbjonLCBlcnIpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgaW1tZWRpYXRlIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgY2FsbGJhY2tzXG4gICAqIEBwYXJhbSBmbiB7ZnVuY3Rpb259IEZ1bmN0aW9uIHRvIGV4ZWN1dGVcbiAgICogQGRlcHJlY2F0ZWRcbiAgICovXG4gIFByb21pc2UuX3NldEltbWVkaWF0ZUZuID0gZnVuY3Rpb24gX3NldEltbWVkaWF0ZUZuKGZuKSB7XG4gICAgUHJvbWlzZS5faW1tZWRpYXRlRm4gPSBmbjtcbiAgfTtcblxuICAvKipcbiAgICogQ2hhbmdlIHRoZSBmdW5jdGlvbiB0byBleGVjdXRlIG9uIHVuaGFuZGxlZCByZWplY3Rpb25cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZm4gRnVuY3Rpb24gdG8gZXhlY3V0ZSBvbiB1bmhhbmRsZWQgcmVqZWN0aW9uXG4gICAqIEBkZXByZWNhdGVkXG4gICAqL1xuICBQcm9taXNlLl9zZXRVbmhhbmRsZWRSZWplY3Rpb25GbiA9IGZ1bmN0aW9uIF9zZXRVbmhhbmRsZWRSZWplY3Rpb25Gbihmbikge1xuICAgIFByb21pc2UuX3VuaGFuZGxlZFJlamVjdGlvbkZuID0gZm47XG4gIH07XG4gIFxuICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IFByb21pc2U7XG4gIH0gZWxzZSBpZiAoIXJvb3QuUHJvbWlzZSkge1xuICAgIHJvb3QuUHJvbWlzZSA9IFByb21pc2U7XG4gIH1cblxufSkodGhpcyk7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgUHJvbWlzZTtcblxuaWYgKHJlcXVpcmUoJ25vZGUtdmVyc2lvbicpLm1ham9yID49IDQpIHtcbiAgICBQcm9taXNlID0gZ2xvYmFsLlByb21pc2U7XG59IGVsc2Uge1xuICAgIC8vIERvbid0IHVzZSB0aGUgbmF0aXZlIFByb21pc2UgaW4gTm9kZS5qcyA8NCBzaW5jZSBpdCBkb2Vzbid0IHN1cHBvcnQgc3ViY2xhc3NpbmdcbiAgICBQcm9taXNlID0gcmVxdWlyZSgncHJvbWlzZS1wb2x5ZmlsbCcpO1xufVxuXG5jbGFzcyBDaGlsZFByb2Nlc3NQcm9taXNlIGV4dGVuZHMgUHJvbWlzZSB7XG4gICAgY29uc3RydWN0b3IoZXhlY3V0b3IpIHtcbiAgICAgICAgdmFyIHJlc29sdmU7XG4gICAgICAgIHZhciByZWplY3Q7XG5cbiAgICAgICAgc3VwZXIoKF9yZXNvbHZlLCBfcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlID0gX3Jlc29sdmU7XG4gICAgICAgICAgICByZWplY3QgPSBfcmVqZWN0O1xuXG4gICAgICAgICAgICBpZiAoZXhlY3V0b3IpIHtcbiAgICAgICAgICAgICAgICBleGVjdXRvcihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLl9jcFJlc29sdmUgPSByZXNvbHZlO1xuICAgICAgICB0aGlzLl9jcFJlamVjdCA9IHJlamVjdDtcbiAgICAgICAgdGhpcy5jaGlsZFByb2Nlc3MgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcHJvZ3Jlc3MoY2FsbGJhY2spIHtcbiAgICAgICAgcHJvY2Vzcy5uZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFjayh0aGlzLmNoaWxkUHJvY2Vzcyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpIHtcbiAgICAgICAgdmFyIG5ld1Byb21pc2UgPSBzdXBlci50aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKTtcbiAgICAgICAgbmV3UHJvbWlzZS5jaGlsZFByb2Nlc3MgPSB0aGlzLmNoaWxkUHJvY2VzcztcbiAgICAgICAgcmV0dXJuIG5ld1Byb21pc2U7XG4gICAgfVxuXG4gICAgY2F0Y2gob25SZWplY3RlZCkge1xuICAgICAgICB2YXIgbmV3UHJvbWlzZSA9IHN1cGVyLmNhdGNoKG9uUmVqZWN0ZWQpO1xuICAgICAgICBuZXdQcm9taXNlLmNoaWxkUHJvY2VzcyA9IHRoaXMuY2hpbGRQcm9jZXNzO1xuICAgICAgICByZXR1cm4gbmV3UHJvbWlzZTtcbiAgICB9XG5cbiAgICBkb25lKCkge1xuICAgICAgICB0aGlzLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgICBwcm9jZXNzLm5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuQ2hpbGRQcm9jZXNzUHJvbWlzZS5wcm90b3R5cGUuZmFpbCA9IENoaWxkUHJvY2Vzc1Byb21pc2UucHJvdG90eXBlLmNhdGNoO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENoaWxkUHJvY2Vzc1Byb21pc2U7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5cbmNsYXNzIENoaWxkUHJvY2Vzc0Vycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIGNvZGUsIGNoaWxkUHJvY2Vzcywgc3Rkb3V0LCBzdGRlcnIpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XG4gICAgICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHRoaXMuY29uc3RydWN0b3IpO1xuICAgICAgICB0aGlzLm5hbWUgPSB0aGlzLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICAgIHRoaXMuY29kZSA9IGNvZGU7XG4gICAgICAgIHRoaXMuY2hpbGRQcm9jZXNzID0gY2hpbGRQcm9jZXNzO1xuICAgICAgICB0aGlzLnN0ZG91dCA9IHN0ZG91dDtcbiAgICAgICAgdGhpcy5zdGRlcnIgPSBzdGRlcnI7XG4gICAgfVxufVxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBDaGlsZFByb2Nlc3NFcnJvcjsiLCAiJ3VzZSBzdHJpY3QnO1xudmFyIGNoaWxkX3Byb2Nlc3MgPSByZXF1aXJlKCdjaGlsZF9wcm9jZXNzJyk7XG52YXIgY3Jvc3NTcGF3biA9IHJlcXVpcmUoJ2Nyb3NzLXNwYXduJyk7XG52YXIgQ2hpbGRQcm9jZXNzUHJvbWlzZSA9IHJlcXVpcmUoJy4vQ2hpbGRQcm9jZXNzUHJvbWlzZScpO1xudmFyIENoaWxkUHJvY2Vzc0Vycm9yID0gcmVxdWlyZSgnLi9DaGlsZFByb2Nlc3NFcnJvcicpO1xuXG52YXIgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG5cbi8qKlxuICogUHJvbWlzZSB3cmFwcGVyIGZvciBleGVjLCBleGVjRmlsZVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2RcbiAqIEBwYXJhbSB7Li4uKn0gYXJnc1xuICogQHJldHVybiB7UHJvbWlzZX1cbiAqL1xuZnVuY3Rpb24gZG9FeGVjKG1ldGhvZCwgYXJncykge1xuICAgIHZhciBjcDtcbiAgICB2YXIgY3BQcm9taXNlID0gbmV3IENoaWxkUHJvY2Vzc1Byb21pc2UoKTtcbiAgICB2YXIgcmVqZWN0ID0gY3BQcm9taXNlLl9jcFJlamVjdDtcbiAgICB2YXIgcmVzb2x2ZSA9IGNwUHJvbWlzZS5fY3BSZXNvbHZlO1xuXG4gICAgdmFyIGZpbmFsQXJncyA9IHNsaWNlLmNhbGwoYXJncywgMCk7XG4gICAgZmluYWxBcmdzLnB1c2goY2FsbGJhY2spO1xuXG4gICAgY3AgPSBjaGlsZF9wcm9jZXNzW21ldGhvZF0uYXBwbHkoY2hpbGRfcHJvY2VzcywgZmluYWxBcmdzKTtcblxuICAgIGZ1bmN0aW9uIGNhbGxiYWNrKGVyciwgc3Rkb3V0LCBzdGRlcnIpIHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgdmFyIGNvbW1hbmRTdHIgPSBhcmdzWzBdICsgKEFycmF5LmlzQXJyYXkoYXJnc1sxXSkgPyAoJyAnICsgYXJnc1sxXS5qb2luKCcgJykpIDogJycpO1xuICAgICAgICAgICAgZXJyLm1lc3NhZ2UgKz0gJyBgJyArIGNvbW1hbmRTdHIgKyAnYCAoZXhpdGVkIHdpdGggZXJyb3IgY29kZSAnICsgZXJyLmNvZGUgKyAnKSc7XG4gICAgICAgICAgICBlcnIuc3Rkb3V0ID0gc3Rkb3V0O1xuICAgICAgICAgICAgZXJyLnN0ZGVyciA9IHN0ZGVycjtcbiAgICAgICAgICAgIHZhciBjcEVycm9yID0gbmV3IENoaWxkUHJvY2Vzc0Vycm9yKGVyci5tZXNzYWdlLCBlcnIuY29kZSwgY2hpbGRfcHJvY2Vzcywgc3Rkb3V0LCBzdGRlcnIpO1xuICAgICAgICAgICAgcmVqZWN0KGNwRXJyb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgY2hpbGRQcm9jZXNzOiBjcCxcbiAgICAgICAgICAgICAgICBzdGRvdXQ6IHN0ZG91dCxcbiAgICAgICAgICAgICAgICBzdGRlcnI6IHN0ZGVyclxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjcFByb21pc2UuY2hpbGRQcm9jZXNzID0gY3A7XG5cbiAgICByZXR1cm4gY3BQcm9taXNlO1xufVxuXG4vKipcbiAqIGBleGVjYCBhcyBQcm9taXNlZFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBjb21tYW5kXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHJldHVybiB7UHJvbWlzZX1cbiAqL1xuZnVuY3Rpb24gZXhlYygpIHtcbiAgICByZXR1cm4gZG9FeGVjKCdleGVjJywgYXJndW1lbnRzKTtcbn1cblxuLyoqXG4gKiBgZXhlY0ZpbGVgIGFzIFByb21pc2VkXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGNvbW1hbmRcbiAqIEBwYXJhbSB7QXJyYXl9IGFyZ3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJuIHtQcm9taXNlfVxuICovXG5mdW5jdGlvbiBleGVjRmlsZSgpIHtcbiAgICByZXR1cm4gZG9FeGVjKCdleGVjRmlsZScsIGFyZ3VtZW50cyk7XG59XG5cbi8qKlxuICogYHNwYXduYCBhcyBQcm9taXNlZFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBjb21tYW5kXG4gKiBAcGFyYW0ge0FycmF5fSBhcmdzXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHJldHVybiB7UHJvbWlzZX1cbiAqL1xuZnVuY3Rpb24gZG9TcGF3bihtZXRob2QsIGNvbW1hbmQsIGFyZ3MsIG9wdGlvbnMpIHtcbiAgICB2YXIgcmVzdWx0ID0ge307XG5cbiAgICB2YXIgY3A7XG4gICAgdmFyIGNwUHJvbWlzZSA9IG5ldyBDaGlsZFByb2Nlc3NQcm9taXNlKCk7XG4gICAgdmFyIHJlamVjdCA9IGNwUHJvbWlzZS5fY3BSZWplY3Q7XG4gICAgdmFyIHJlc29sdmUgPSBjcFByb21pc2UuX2NwUmVzb2x2ZTtcblxuICAgIHZhciBzdWNjZXNzZnVsRXhpdENvZGVzID0gKG9wdGlvbnMgJiYgb3B0aW9ucy5zdWNjZXNzZnVsRXhpdENvZGVzKSB8fCBbMF07XG5cbiAgICBjcCA9IG1ldGhvZChjb21tYW5kLCBhcmdzLCBvcHRpb25zKTtcblxuICAgIC8vIERvbid0IHJldHVybiB0aGUgd2hvbGUgQnVmZmVyZWQgcmVzdWx0IGJ5IGRlZmF1bHQuXG4gICAgdmFyIGNhcHR1cmVTdGRvdXQgPSBmYWxzZTtcbiAgICB2YXIgY2FwdHVyZVN0ZGVyciA9IGZhbHNlO1xuXG4gICAgdmFyIGNhcHR1cmUgPSBvcHRpb25zICYmIG9wdGlvbnMuY2FwdHVyZTtcbiAgICBpZiAoY2FwdHVyZSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gY2FwdHVyZS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgdmFyIGN1ciA9IGNhcHR1cmVbaV07XG4gICAgICAgICAgICBpZiAoY3VyID09PSAnc3Rkb3V0Jykge1xuICAgICAgICAgICAgICAgIGNhcHR1cmVTdGRvdXQgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjdXIgPT09ICdzdGRlcnInKSB7XG4gICAgICAgICAgICAgICAgY2FwdHVyZVN0ZGVyciA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXN1bHQuY2hpbGRQcm9jZXNzID0gY3A7XG5cbiAgICBpZiAoY2FwdHVyZVN0ZG91dCkge1xuICAgICAgICByZXN1bHQuc3Rkb3V0ID0gJyc7XG5cbiAgICAgICAgY3Auc3Rkb3V0Lm9uKCdkYXRhJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgcmVzdWx0LnN0ZG91dCArPSBkYXRhO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoY2FwdHVyZVN0ZGVycikge1xuICAgICAgICByZXN1bHQuc3RkZXJyID0gJyc7XG5cbiAgICAgICAgY3Auc3RkZXJyLm9uKCdkYXRhJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgcmVzdWx0LnN0ZGVyciArPSBkYXRhO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjcC5vbignZXJyb3InLCByZWplY3QpO1xuXG4gICAgY3Aub24oJ2Nsb3NlJywgZnVuY3Rpb24oY29kZSkge1xuICAgICAgICBpZiAoc3VjY2Vzc2Z1bEV4aXRDb2Rlcy5pbmRleE9mKGNvZGUpID09PSAtMSkge1xuICAgICAgICAgICAgdmFyIGNvbW1hbmRTdHIgPSBjb21tYW5kICsgKGFyZ3MubGVuZ3RoID8gKCcgJyArIGFyZ3Muam9pbignICcpKSA6ICcnKTtcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gJ2AnICsgY29tbWFuZFN0ciArICdgIGZhaWxlZCB3aXRoIGNvZGUgJyArIGNvZGU7XG4gICAgICAgICAgICB2YXIgZXJyID0gbmV3IENoaWxkUHJvY2Vzc0Vycm9yKG1lc3NhZ2UsIGNvZGUsIGNwKTtcblxuICAgICAgICAgICAgaWYgKGNhcHR1cmVTdGRlcnIpIHtcbiAgICAgICAgICAgICAgICBlcnIuc3RkZXJyID0gcmVzdWx0LnN0ZGVyci50b1N0cmluZygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY2FwdHVyZVN0ZG91dCkge1xuICAgICAgICAgICAgICAgIGVyci5zdGRvdXQgPSByZXN1bHQuc3Rkb3V0LnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0LmNvZGUgPSBjb2RlO1xuICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjcFByb21pc2UuY2hpbGRQcm9jZXNzID0gY3A7XG5cbiAgICByZXR1cm4gY3BQcm9taXNlO1xufVxuXG5mdW5jdGlvbiBzcGF3bihjb21tYW5kLCBhcmdzLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIGRvU3Bhd24oY3Jvc3NTcGF3biwgY29tbWFuZCwgYXJncywgb3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIGZvcmsobW9kdWxlUGF0aCwgYXJncywgb3B0aW9ucykge1xuICAgIHJldHVybiBkb1NwYXduKGNoaWxkX3Byb2Nlc3MuZm9yaywgbW9kdWxlUGF0aCwgYXJncywgb3B0aW9ucyk7XG59XG5cbmV4cG9ydHMuZXhlYyA9IGV4ZWM7XG5leHBvcnRzLmV4ZWNGaWxlID0gZXhlY0ZpbGU7XG5leHBvcnRzLnNwYXduID0gc3Bhd247XG5leHBvcnRzLmZvcmsgPSBmb3JrOyIsICIndXNlIHN0cmljdCc7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KG9iamVjdCwgcHJvcGVydHksIHJlY2VpdmVyKSB7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyByZXR1cm4gZ2V0KHBhcmVudCwgcHJvcGVydHksIHJlY2VpdmVyKTsgfSB9IGVsc2UgaWYgKFwidmFsdWVcIiBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgUHJvbWlzZTtcblxuaWYgKHJlcXVpcmUoJ25vZGUtdmVyc2lvbicpLm1ham9yID49IDQpIHtcbiAgICBQcm9taXNlID0gZ2xvYmFsLlByb21pc2U7XG59IGVsc2Uge1xuICAgIC8vIERvbid0IHVzZSB0aGUgbmF0aXZlIFByb21pc2UgaW4gTm9kZS5qcyA8NCBzaW5jZSBpdCBkb2Vzbid0IHN1cHBvcnQgc3ViY2xhc3NpbmdcbiAgICBQcm9taXNlID0gcmVxdWlyZSgncHJvbWlzZS1wb2x5ZmlsbCcpO1xufVxuXG52YXIgQ2hpbGRQcm9jZXNzUHJvbWlzZSA9IGZ1bmN0aW9uIChfUHJvbWlzZSkge1xuICAgIF9pbmhlcml0cyhDaGlsZFByb2Nlc3NQcm9taXNlLCBfUHJvbWlzZSk7XG5cbiAgICBmdW5jdGlvbiBDaGlsZFByb2Nlc3NQcm9taXNlKGV4ZWN1dG9yKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDaGlsZFByb2Nlc3NQcm9taXNlKTtcblxuICAgICAgICB2YXIgcmVzb2x2ZTtcbiAgICAgICAgdmFyIHJlamVjdDtcblxuICAgICAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoQ2hpbGRQcm9jZXNzUHJvbWlzZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKENoaWxkUHJvY2Vzc1Byb21pc2UpKS5jYWxsKHRoaXMsIGZ1bmN0aW9uIChfcmVzb2x2ZSwgX3JlamVjdCkge1xuICAgICAgICAgICAgcmVzb2x2ZSA9IF9yZXNvbHZlO1xuICAgICAgICAgICAgcmVqZWN0ID0gX3JlamVjdDtcblxuICAgICAgICAgICAgaWYgKGV4ZWN1dG9yKSB7XG4gICAgICAgICAgICAgICAgZXhlY3V0b3IocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuXG4gICAgICAgIF90aGlzLl9jcFJlc29sdmUgPSByZXNvbHZlO1xuICAgICAgICBfdGhpcy5fY3BSZWplY3QgPSByZWplY3Q7XG4gICAgICAgIF90aGlzLmNoaWxkUHJvY2VzcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhDaGlsZFByb2Nlc3NQcm9taXNlLCBbe1xuICAgICAgICBrZXk6ICdwcm9ncmVzcycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBwcm9ncmVzcyhjYWxsYmFjaykge1xuICAgICAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKF90aGlzMi5jaGlsZFByb2Nlc3MpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICd0aGVuJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpIHtcbiAgICAgICAgICAgIHZhciBuZXdQcm9taXNlID0gX2dldChDaGlsZFByb2Nlc3NQcm9taXNlLnByb3RvdHlwZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKENoaWxkUHJvY2Vzc1Byb21pc2UucHJvdG90eXBlKSwgJ3RoZW4nLCB0aGlzKS5jYWxsKHRoaXMsIG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKTtcbiAgICAgICAgICAgIG5ld1Byb21pc2UuY2hpbGRQcm9jZXNzID0gdGhpcy5jaGlsZFByb2Nlc3M7XG4gICAgICAgICAgICByZXR1cm4gbmV3UHJvbWlzZTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnY2F0Y2gnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2NhdGNoKG9uUmVqZWN0ZWQpIHtcbiAgICAgICAgICAgIHZhciBuZXdQcm9taXNlID0gX2dldChDaGlsZFByb2Nlc3NQcm9taXNlLnByb3RvdHlwZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKENoaWxkUHJvY2Vzc1Byb21pc2UucHJvdG90eXBlKSwgJ2NhdGNoJywgdGhpcykuY2FsbCh0aGlzLCBvblJlamVjdGVkKTtcbiAgICAgICAgICAgIG5ld1Byb21pc2UuY2hpbGRQcm9jZXNzID0gdGhpcy5jaGlsZFByb2Nlc3M7XG4gICAgICAgICAgICByZXR1cm4gbmV3UHJvbWlzZTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZG9uZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBkb25lKCkge1xuICAgICAgICAgICAgdGhpcy5jYXRjaChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gQ2hpbGRQcm9jZXNzUHJvbWlzZTtcbn0oUHJvbWlzZSk7XG5cbkNoaWxkUHJvY2Vzc1Byb21pc2UucHJvdG90eXBlLmZhaWwgPSBDaGlsZFByb2Nlc3NQcm9taXNlLnByb3RvdHlwZS5jYXRjaDtcblxubW9kdWxlLmV4cG9ydHMgPSBDaGlsZFByb2Nlc3NQcm9taXNlOyIsICIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIENoaWxkUHJvY2Vzc0Vycm9yID0gZnVuY3Rpb24gKF9FcnJvcikge1xuICAgIF9pbmhlcml0cyhDaGlsZFByb2Nlc3NFcnJvciwgX0Vycm9yKTtcblxuICAgIGZ1bmN0aW9uIENoaWxkUHJvY2Vzc0Vycm9yKG1lc3NhZ2UsIGNvZGUsIGNoaWxkUHJvY2Vzcywgc3Rkb3V0LCBzdGRlcnIpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIENoaWxkUHJvY2Vzc0Vycm9yKTtcblxuICAgICAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoQ2hpbGRQcm9jZXNzRXJyb3IuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihDaGlsZFByb2Nlc3NFcnJvcikpLmNhbGwodGhpcywgbWVzc2FnZSkpO1xuXG4gICAgICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKF90aGlzLCBfdGhpcy5jb25zdHJ1Y3Rvcik7XG4gICAgICAgIF90aGlzLm5hbWUgPSBfdGhpcy5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgICBfdGhpcy5jb2RlID0gY29kZTtcbiAgICAgICAgX3RoaXMuY2hpbGRQcm9jZXNzID0gY2hpbGRQcm9jZXNzO1xuICAgICAgICBfdGhpcy5zdGRvdXQgPSBzdGRvdXQ7XG4gICAgICAgIF90aGlzLnN0ZGVyciA9IHN0ZGVycjtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cblxuICAgIHJldHVybiBDaGlsZFByb2Nlc3NFcnJvcjtcbn0oRXJyb3IpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENoaWxkUHJvY2Vzc0Vycm9yOyIsICIndXNlIHN0cmljdCc7XG5cbnZhciBjaGlsZF9wcm9jZXNzID0gcmVxdWlyZSgnY2hpbGRfcHJvY2VzcycpO1xudmFyIGNyb3NzU3Bhd24gPSByZXF1aXJlKCdjcm9zcy1zcGF3bicpO1xudmFyIENoaWxkUHJvY2Vzc1Byb21pc2UgPSByZXF1aXJlKCcuL0NoaWxkUHJvY2Vzc1Byb21pc2UnKTtcbnZhciBDaGlsZFByb2Nlc3NFcnJvciA9IHJlcXVpcmUoJy4vQ2hpbGRQcm9jZXNzRXJyb3InKTtcblxudmFyIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xuXG4vKipcbiAqIFByb21pc2Ugd3JhcHBlciBmb3IgZXhlYywgZXhlY0ZpbGVcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kXG4gKiBAcGFyYW0gey4uLip9IGFyZ3NcbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKi9cbmZ1bmN0aW9uIGRvRXhlYyhtZXRob2QsIGFyZ3MpIHtcbiAgICB2YXIgY3A7XG4gICAgdmFyIGNwUHJvbWlzZSA9IG5ldyBDaGlsZFByb2Nlc3NQcm9taXNlKCk7XG4gICAgdmFyIHJlamVjdCA9IGNwUHJvbWlzZS5fY3BSZWplY3Q7XG4gICAgdmFyIHJlc29sdmUgPSBjcFByb21pc2UuX2NwUmVzb2x2ZTtcblxuICAgIHZhciBmaW5hbEFyZ3MgPSBzbGljZS5jYWxsKGFyZ3MsIDApO1xuICAgIGZpbmFsQXJncy5wdXNoKGNhbGxiYWNrKTtcblxuICAgIGNwID0gY2hpbGRfcHJvY2Vzc1ttZXRob2RdLmFwcGx5KGNoaWxkX3Byb2Nlc3MsIGZpbmFsQXJncyk7XG5cbiAgICBmdW5jdGlvbiBjYWxsYmFjayhlcnIsIHN0ZG91dCwgc3RkZXJyKSB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIHZhciBjb21tYW5kU3RyID0gYXJnc1swXSArIChBcnJheS5pc0FycmF5KGFyZ3NbMV0pID8gJyAnICsgYXJnc1sxXS5qb2luKCcgJykgOiAnJyk7XG4gICAgICAgICAgICBlcnIubWVzc2FnZSArPSAnIGAnICsgY29tbWFuZFN0ciArICdgIChleGl0ZWQgd2l0aCBlcnJvciBjb2RlICcgKyBlcnIuY29kZSArICcpJztcbiAgICAgICAgICAgIGVyci5zdGRvdXQgPSBzdGRvdXQ7XG4gICAgICAgICAgICBlcnIuc3RkZXJyID0gc3RkZXJyO1xuICAgICAgICAgICAgdmFyIGNwRXJyb3IgPSBuZXcgQ2hpbGRQcm9jZXNzRXJyb3IoZXJyLm1lc3NhZ2UsIGVyci5jb2RlLCBjaGlsZF9wcm9jZXNzLCBzdGRvdXQsIHN0ZGVycik7XG4gICAgICAgICAgICByZWplY3QoY3BFcnJvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICBjaGlsZFByb2Nlc3M6IGNwLFxuICAgICAgICAgICAgICAgIHN0ZG91dDogc3Rkb3V0LFxuICAgICAgICAgICAgICAgIHN0ZGVycjogc3RkZXJyXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNwUHJvbWlzZS5jaGlsZFByb2Nlc3MgPSBjcDtcblxuICAgIHJldHVybiBjcFByb21pc2U7XG59XG5cbi8qKlxuICogYGV4ZWNgIGFzIFByb21pc2VkXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGNvbW1hbmRcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJuIHtQcm9taXNlfVxuICovXG5mdW5jdGlvbiBleGVjKCkge1xuICAgIHJldHVybiBkb0V4ZWMoJ2V4ZWMnLCBhcmd1bWVudHMpO1xufVxuXG4vKipcbiAqIGBleGVjRmlsZWAgYXMgUHJvbWlzZWRcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gY29tbWFuZFxuICogQHBhcmFtIHtBcnJheX0gYXJnc1xuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKi9cbmZ1bmN0aW9uIGV4ZWNGaWxlKCkge1xuICAgIHJldHVybiBkb0V4ZWMoJ2V4ZWNGaWxlJywgYXJndW1lbnRzKTtcbn1cblxuLyoqXG4gKiBgc3Bhd25gIGFzIFByb21pc2VkXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGNvbW1hbmRcbiAqIEBwYXJhbSB7QXJyYXl9IGFyZ3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJuIHtQcm9taXNlfVxuICovXG5mdW5jdGlvbiBkb1NwYXduKG1ldGhvZCwgY29tbWFuZCwgYXJncywgb3B0aW9ucykge1xuICAgIHZhciByZXN1bHQgPSB7fTtcblxuICAgIHZhciBjcDtcbiAgICB2YXIgY3BQcm9taXNlID0gbmV3IENoaWxkUHJvY2Vzc1Byb21pc2UoKTtcbiAgICB2YXIgcmVqZWN0ID0gY3BQcm9taXNlLl9jcFJlamVjdDtcbiAgICB2YXIgcmVzb2x2ZSA9IGNwUHJvbWlzZS5fY3BSZXNvbHZlO1xuXG4gICAgdmFyIHN1Y2Nlc3NmdWxFeGl0Q29kZXMgPSBvcHRpb25zICYmIG9wdGlvbnMuc3VjY2Vzc2Z1bEV4aXRDb2RlcyB8fCBbMF07XG5cbiAgICBjcCA9IG1ldGhvZChjb21tYW5kLCBhcmdzLCBvcHRpb25zKTtcblxuICAgIC8vIERvbid0IHJldHVybiB0aGUgd2hvbGUgQnVmZmVyZWQgcmVzdWx0IGJ5IGRlZmF1bHQuXG4gICAgdmFyIGNhcHR1cmVTdGRvdXQgPSBmYWxzZTtcbiAgICB2YXIgY2FwdHVyZVN0ZGVyciA9IGZhbHNlO1xuXG4gICAgdmFyIGNhcHR1cmUgPSBvcHRpb25zICYmIG9wdGlvbnMuY2FwdHVyZTtcbiAgICBpZiAoY2FwdHVyZSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gY2FwdHVyZS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgdmFyIGN1ciA9IGNhcHR1cmVbaV07XG4gICAgICAgICAgICBpZiAoY3VyID09PSAnc3Rkb3V0Jykge1xuICAgICAgICAgICAgICAgIGNhcHR1cmVTdGRvdXQgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjdXIgPT09ICdzdGRlcnInKSB7XG4gICAgICAgICAgICAgICAgY2FwdHVyZVN0ZGVyciA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXN1bHQuY2hpbGRQcm9jZXNzID0gY3A7XG5cbiAgICBpZiAoY2FwdHVyZVN0ZG91dCkge1xuICAgICAgICByZXN1bHQuc3Rkb3V0ID0gJyc7XG5cbiAgICAgICAgY3Auc3Rkb3V0Lm9uKCdkYXRhJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIHJlc3VsdC5zdGRvdXQgKz0gZGF0YTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGNhcHR1cmVTdGRlcnIpIHtcbiAgICAgICAgcmVzdWx0LnN0ZGVyciA9ICcnO1xuXG4gICAgICAgIGNwLnN0ZGVyci5vbignZGF0YScsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICByZXN1bHQuc3RkZXJyICs9IGRhdGE7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNwLm9uKCdlcnJvcicsIHJlamVjdCk7XG5cbiAgICBjcC5vbignY2xvc2UnLCBmdW5jdGlvbiAoY29kZSkge1xuICAgICAgICBpZiAoc3VjY2Vzc2Z1bEV4aXRDb2Rlcy5pbmRleE9mKGNvZGUpID09PSAtMSkge1xuICAgICAgICAgICAgdmFyIGNvbW1hbmRTdHIgPSBjb21tYW5kICsgKGFyZ3MubGVuZ3RoID8gJyAnICsgYXJncy5qb2luKCcgJykgOiAnJyk7XG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9ICdgJyArIGNvbW1hbmRTdHIgKyAnYCBmYWlsZWQgd2l0aCBjb2RlICcgKyBjb2RlO1xuICAgICAgICAgICAgdmFyIGVyciA9IG5ldyBDaGlsZFByb2Nlc3NFcnJvcihtZXNzYWdlLCBjb2RlLCBjcCk7XG5cbiAgICAgICAgICAgIGlmIChjYXB0dXJlU3RkZXJyKSB7XG4gICAgICAgICAgICAgICAgZXJyLnN0ZGVyciA9IHJlc3VsdC5zdGRlcnIudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNhcHR1cmVTdGRvdXQpIHtcbiAgICAgICAgICAgICAgICBlcnIuc3Rkb3V0ID0gcmVzdWx0LnN0ZG91dC50b1N0cmluZygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdC5jb2RlID0gY29kZTtcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY3BQcm9taXNlLmNoaWxkUHJvY2VzcyA9IGNwO1xuXG4gICAgcmV0dXJuIGNwUHJvbWlzZTtcbn1cblxuZnVuY3Rpb24gc3Bhd24oY29tbWFuZCwgYXJncywgb3B0aW9ucykge1xuICAgIHJldHVybiBkb1NwYXduKGNyb3NzU3Bhd24sIGNvbW1hbmQsIGFyZ3MsIG9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiBmb3JrKG1vZHVsZVBhdGgsIGFyZ3MsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gZG9TcGF3bihjaGlsZF9wcm9jZXNzLmZvcmssIG1vZHVsZVBhdGgsIGFyZ3MsIG9wdGlvbnMpO1xufVxuXG5leHBvcnRzLmV4ZWMgPSBleGVjO1xuZXhwb3J0cy5leGVjRmlsZSA9IGV4ZWNGaWxlO1xuZXhwb3J0cy5zcGF3biA9IHNwYXduO1xuZXhwb3J0cy5mb3JrID0gZm9yazsiLCAiJ3VzZSBzdHJpY3QnO1xuXG5pZiAocmVxdWlyZSgnbm9kZS12ZXJzaW9uJykubWFqb3IgPj0gNCkge1xuICAgIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWInKTtcbn0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi1lczUnKTtcbn1cbiIsICIvKiBqc2hpbnQgbm9kZTogdHJ1ZSAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUkVHRVhQX1BBUlRTID0gLyhcXCp8XFw/KS9nO1xuXG4vKipcbiAgIyB3aWxkY2FyZFxuXG4gIFZlcnkgc2ltcGxlIHdpbGRjYXJkIG1hdGNoaW5nLCB3aGljaCBpcyBkZXNpZ25lZCB0byBwcm92aWRlIHRoZSBzYW1lXG4gIGZ1bmN0aW9uYWxpdHkgdGhhdCBpcyBmb3VuZCBpbiB0aGVcbiAgW2V2ZV0oaHR0cHM6Ly9naXRodWIuY29tL2Fkb2JlLXdlYnBsYXRmb3JtL2V2ZSkgZXZlbnRpbmcgbGlicmFyeS5cblxuICAjIyBVc2FnZVxuXG4gIEl0IHdvcmtzIHdpdGggc3RyaW5nczpcblxuICA8PDwgZXhhbXBsZXMvc3RyaW5ncy5qc1xuXG4gIEFycmF5czpcblxuICA8PDwgZXhhbXBsZXMvYXJyYXlzLmpzXG5cbiAgT2JqZWN0cyAobWF0Y2hpbmcgYWdhaW5zdCBrZXlzKTpcblxuICA8PDwgZXhhbXBsZXMvb2JqZWN0cy5qc1xuXG4gICMjIEFsdGVybmF0aXZlIEltcGxlbWVudGF0aW9uc1xuXG4gIC0gPGh0dHBzOi8vZ2l0aHViLmNvbS9pc2FhY3Mvbm9kZS1nbG9iPlxuXG4gICAgR3JlYXQgZm9yIGZ1bGwgZmlsZS1iYXNlZCB3aWxkY2FyZCBtYXRjaGluZy5cblxuICAtIDxodHRwczovL2dpdGh1Yi5jb20vc2luZHJlc29yaHVzL21hdGNoZXI+XG5cbiAgICAgQSB3ZWxsIGNhcmVkIGZvciBhbmQgbG92ZWQgSlMgd2lsZGNhcmQgbWF0Y2hlci5cbioqL1xuXG5mdW5jdGlvbiBXaWxkY2FyZE1hdGNoZXIodGV4dCwgc2VwYXJhdG9yKSB7XG4gIHRoaXMudGV4dCA9IHRleHQgPSB0ZXh0IHx8ICcnO1xuICB0aGlzLmhhc1dpbGQgPSB0ZXh0LmluZGV4T2YoJyonKSA+PSAwO1xuICB0aGlzLnNlcGFyYXRvciA9IHNlcGFyYXRvcjtcbiAgdGhpcy5wYXJ0cyA9IHRleHQuc3BsaXQoc2VwYXJhdG9yKS5tYXAodGhpcy5jbGFzc2lmeVBhcnQuYmluZCh0aGlzKSk7XG59XG5cbldpbGRjYXJkTWF0Y2hlci5wcm90b3R5cGUubWF0Y2ggPSBmdW5jdGlvbihpbnB1dCkge1xuICB2YXIgbWF0Y2hlcyA9IHRydWU7XG4gIHZhciBwYXJ0cyA9IHRoaXMucGFydHM7XG4gIHZhciBpaTtcbiAgdmFyIHBhcnRzQ291bnQgPSBwYXJ0cy5sZW5ndGg7XG4gIHZhciB0ZXN0UGFydHM7XG5cbiAgaWYgKHR5cGVvZiBpbnB1dCA9PSAnc3RyaW5nJyB8fCBpbnB1dCBpbnN0YW5jZW9mIFN0cmluZykge1xuICAgIGlmICghdGhpcy5oYXNXaWxkICYmIHRoaXMudGV4dCAhPSBpbnB1dCkge1xuICAgICAgbWF0Y2hlcyA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0ZXN0UGFydHMgPSAoaW5wdXQgfHwgJycpLnNwbGl0KHRoaXMuc2VwYXJhdG9yKTtcbiAgICAgIGZvciAoaWkgPSAwOyBtYXRjaGVzICYmIGlpIDwgcGFydHNDb3VudDsgaWkrKykge1xuICAgICAgICBpZiAocGFydHNbaWldID09PSAnKicpICB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH0gZWxzZSBpZiAoaWkgPCB0ZXN0UGFydHMubGVuZ3RoKSB7XG4gICAgICAgICAgbWF0Y2hlcyA9IHBhcnRzW2lpXSBpbnN0YW5jZW9mIFJlZ0V4cFxuICAgICAgICAgICAgPyBwYXJ0c1tpaV0udGVzdCh0ZXN0UGFydHNbaWldKVxuICAgICAgICAgICAgOiBwYXJ0c1tpaV0gPT09IHRlc3RQYXJ0c1tpaV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWF0Y2hlcyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIElmIG1hdGNoZXMsIHRoZW4gcmV0dXJuIHRoZSBjb21wb25lbnQgcGFydHNcbiAgICAgIG1hdGNoZXMgPSBtYXRjaGVzICYmIHRlc3RQYXJ0cztcbiAgICB9XG4gIH1cbiAgZWxzZSBpZiAodHlwZW9mIGlucHV0LnNwbGljZSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgbWF0Y2hlcyA9IFtdO1xuXG4gICAgZm9yIChpaSA9IGlucHV0Lmxlbmd0aDsgaWktLTsgKSB7XG4gICAgICBpZiAodGhpcy5tYXRjaChpbnB1dFtpaV0pKSB7XG4gICAgICAgIG1hdGNoZXNbbWF0Y2hlcy5sZW5ndGhdID0gaW5wdXRbaWldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBlbHNlIGlmICh0eXBlb2YgaW5wdXQgPT0gJ29iamVjdCcpIHtcbiAgICBtYXRjaGVzID0ge307XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gaW5wdXQpIHtcbiAgICAgIGlmICh0aGlzLm1hdGNoKGtleSkpIHtcbiAgICAgICAgbWF0Y2hlc1trZXldID0gaW5wdXRba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbWF0Y2hlcztcbn07XG5cbldpbGRjYXJkTWF0Y2hlci5wcm90b3R5cGUuY2xhc3NpZnlQYXJ0ID0gZnVuY3Rpb24ocGFydCkge1xuICAvLyBpbiB0aGUgZXZlbnQgdGhhdCB3ZSBoYXZlIGJlZW4gcHJvdmlkZWQgYSBwYXJ0IHRoYXQgaXMgbm90IGp1c3QgYSB3aWxkY2FyZFxuICAvLyB0aGVuIHR1cm4gdGhpcyBpbnRvIGEgcmVndWxhciBleHByZXNzaW9uIGZvciBtYXRjaGluZyBwdXJwb3Nlc1xuICBpZiAocGFydCA9PT0gJyonKSB7XG4gICAgcmV0dXJuIHBhcnQ7XG4gIH0gZWxzZSBpZiAocGFydC5pbmRleE9mKCcqJykgPj0gMCB8fCBwYXJ0LmluZGV4T2YoJz8nKSA+PSAwKSB7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAocGFydC5yZXBsYWNlKFJFR0VYUF9QQVJUUywgJ1xcLiQxJykpO1xuICB9XG5cbiAgcmV0dXJuIHBhcnQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRleHQsIHRlc3QsIHNlcGFyYXRvcikge1xuICB2YXIgbWF0Y2hlciA9IG5ldyBXaWxkY2FyZE1hdGNoZXIodGV4dCwgc2VwYXJhdG9yIHx8IC9bXFwvXFwuXS8pO1xuICBpZiAodHlwZW9mIHRlc3QgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gbWF0Y2hlci5tYXRjaCh0ZXN0KTtcbiAgfVxuXG4gIHJldHVybiBtYXRjaGVyO1xufTtcbiIsIG51bGwsICJ2YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGtpbmRPZih2YWwpIHtcbiAgaWYgKHZhbCA9PT0gdm9pZCAwKSByZXR1cm4gJ3VuZGVmaW5lZCc7XG4gIGlmICh2YWwgPT09IG51bGwpIHJldHVybiAnbnVsbCc7XG5cbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsO1xuICBpZiAodHlwZSA9PT0gJ2Jvb2xlYW4nKSByZXR1cm4gJ2Jvb2xlYW4nO1xuICBpZiAodHlwZSA9PT0gJ3N0cmluZycpIHJldHVybiAnc3RyaW5nJztcbiAgaWYgKHR5cGUgPT09ICdudW1iZXInKSByZXR1cm4gJ251bWJlcic7XG4gIGlmICh0eXBlID09PSAnc3ltYm9sJykgcmV0dXJuICdzeW1ib2wnO1xuICBpZiAodHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBpc0dlbmVyYXRvckZuKHZhbCkgPyAnZ2VuZXJhdG9yZnVuY3Rpb24nIDogJ2Z1bmN0aW9uJztcbiAgfVxuXG4gIGlmIChpc0FycmF5KHZhbCkpIHJldHVybiAnYXJyYXknO1xuICBpZiAoaXNCdWZmZXIodmFsKSkgcmV0dXJuICdidWZmZXInO1xuICBpZiAoaXNBcmd1bWVudHModmFsKSkgcmV0dXJuICdhcmd1bWVudHMnO1xuICBpZiAoaXNEYXRlKHZhbCkpIHJldHVybiAnZGF0ZSc7XG4gIGlmIChpc0Vycm9yKHZhbCkpIHJldHVybiAnZXJyb3InO1xuICBpZiAoaXNSZWdleHAodmFsKSkgcmV0dXJuICdyZWdleHAnO1xuXG4gIHN3aXRjaCAoY3Rvck5hbWUodmFsKSkge1xuICAgIGNhc2UgJ1N5bWJvbCc6IHJldHVybiAnc3ltYm9sJztcbiAgICBjYXNlICdQcm9taXNlJzogcmV0dXJuICdwcm9taXNlJztcblxuICAgIC8vIFNldCwgTWFwLCBXZWFrU2V0LCBXZWFrTWFwXG4gICAgY2FzZSAnV2Vha01hcCc6IHJldHVybiAnd2Vha21hcCc7XG4gICAgY2FzZSAnV2Vha1NldCc6IHJldHVybiAnd2Vha3NldCc7XG4gICAgY2FzZSAnTWFwJzogcmV0dXJuICdtYXAnO1xuICAgIGNhc2UgJ1NldCc6IHJldHVybiAnc2V0JztcblxuICAgIC8vIDgtYml0IHR5cGVkIGFycmF5c1xuICAgIGNhc2UgJ0ludDhBcnJheSc6IHJldHVybiAnaW50OGFycmF5JztcbiAgICBjYXNlICdVaW50OEFycmF5JzogcmV0dXJuICd1aW50OGFycmF5JztcbiAgICBjYXNlICdVaW50OENsYW1wZWRBcnJheSc6IHJldHVybiAndWludDhjbGFtcGVkYXJyYXknO1xuXG4gICAgLy8gMTYtYml0IHR5cGVkIGFycmF5c1xuICAgIGNhc2UgJ0ludDE2QXJyYXknOiByZXR1cm4gJ2ludDE2YXJyYXknO1xuICAgIGNhc2UgJ1VpbnQxNkFycmF5JzogcmV0dXJuICd1aW50MTZhcnJheSc7XG5cbiAgICAvLyAzMi1iaXQgdHlwZWQgYXJyYXlzXG4gICAgY2FzZSAnSW50MzJBcnJheSc6IHJldHVybiAnaW50MzJhcnJheSc7XG4gICAgY2FzZSAnVWludDMyQXJyYXknOiByZXR1cm4gJ3VpbnQzMmFycmF5JztcbiAgICBjYXNlICdGbG9hdDMyQXJyYXknOiByZXR1cm4gJ2Zsb2F0MzJhcnJheSc7XG4gICAgY2FzZSAnRmxvYXQ2NEFycmF5JzogcmV0dXJuICdmbG9hdDY0YXJyYXknO1xuICB9XG5cbiAgaWYgKGlzR2VuZXJhdG9yT2JqKHZhbCkpIHtcbiAgICByZXR1cm4gJ2dlbmVyYXRvcic7XG4gIH1cblxuICAvLyBOb24tcGxhaW4gb2JqZWN0c1xuICB0eXBlID0gdG9TdHJpbmcuY2FsbCh2YWwpO1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICdbb2JqZWN0IE9iamVjdF0nOiByZXR1cm4gJ29iamVjdCc7XG4gICAgLy8gaXRlcmF0b3JzXG4gICAgY2FzZSAnW29iamVjdCBNYXAgSXRlcmF0b3JdJzogcmV0dXJuICdtYXBpdGVyYXRvcic7XG4gICAgY2FzZSAnW29iamVjdCBTZXQgSXRlcmF0b3JdJzogcmV0dXJuICdzZXRpdGVyYXRvcic7XG4gICAgY2FzZSAnW29iamVjdCBTdHJpbmcgSXRlcmF0b3JdJzogcmV0dXJuICdzdHJpbmdpdGVyYXRvcic7XG4gICAgY2FzZSAnW29iamVjdCBBcnJheSBJdGVyYXRvcl0nOiByZXR1cm4gJ2FycmF5aXRlcmF0b3InO1xuICB9XG5cbiAgLy8gb3RoZXJcbiAgcmV0dXJuIHR5cGUuc2xpY2UoOCwgLTEpLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzL2csICcnKTtcbn07XG5cbmZ1bmN0aW9uIGN0b3JOYW1lKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbC5jb25zdHJ1Y3RvciA9PT0gJ2Z1bmN0aW9uJyA/IHZhbC5jb25zdHJ1Y3Rvci5uYW1lIDogbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNBcnJheSh2YWwpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkpIHJldHVybiBBcnJheS5pc0FycmF5KHZhbCk7XG4gIHJldHVybiB2YWwgaW5zdGFuY2VvZiBBcnJheTtcbn1cblxuZnVuY3Rpb24gaXNFcnJvcih2YWwpIHtcbiAgcmV0dXJuIHZhbCBpbnN0YW5jZW9mIEVycm9yIHx8ICh0eXBlb2YgdmFsLm1lc3NhZ2UgPT09ICdzdHJpbmcnICYmIHZhbC5jb25zdHJ1Y3RvciAmJiB0eXBlb2YgdmFsLmNvbnN0cnVjdG9yLnN0YWNrVHJhY2VMaW1pdCA9PT0gJ251bWJlcicpO1xufVxuXG5mdW5jdGlvbiBpc0RhdGUodmFsKSB7XG4gIGlmICh2YWwgaW5zdGFuY2VvZiBEYXRlKSByZXR1cm4gdHJ1ZTtcbiAgcmV0dXJuIHR5cGVvZiB2YWwudG9EYXRlU3RyaW5nID09PSAnZnVuY3Rpb24nXG4gICAgJiYgdHlwZW9mIHZhbC5nZXREYXRlID09PSAnZnVuY3Rpb24nXG4gICAgJiYgdHlwZW9mIHZhbC5zZXREYXRlID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiBpc1JlZ2V4cCh2YWwpIHtcbiAgaWYgKHZhbCBpbnN0YW5jZW9mIFJlZ0V4cCkgcmV0dXJuIHRydWU7XG4gIHJldHVybiB0eXBlb2YgdmFsLmZsYWdzID09PSAnc3RyaW5nJ1xuICAgICYmIHR5cGVvZiB2YWwuaWdub3JlQ2FzZSA9PT0gJ2Jvb2xlYW4nXG4gICAgJiYgdHlwZW9mIHZhbC5tdWx0aWxpbmUgPT09ICdib29sZWFuJ1xuICAgICYmIHR5cGVvZiB2YWwuZ2xvYmFsID09PSAnYm9vbGVhbic7XG59XG5cbmZ1bmN0aW9uIGlzR2VuZXJhdG9yRm4obmFtZSwgdmFsKSB7XG4gIHJldHVybiBjdG9yTmFtZShuYW1lKSA9PT0gJ0dlbmVyYXRvckZ1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gaXNHZW5lcmF0b3JPYmoodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsLnRocm93ID09PSAnZnVuY3Rpb24nXG4gICAgJiYgdHlwZW9mIHZhbC5yZXR1cm4gPT09ICdmdW5jdGlvbidcbiAgICAmJiB0eXBlb2YgdmFsLm5leHQgPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzQXJndW1lbnRzKHZhbCkge1xuICB0cnkge1xuICAgIGlmICh0eXBlb2YgdmFsLmxlbmd0aCA9PT0gJ251bWJlcicgJiYgdHlwZW9mIHZhbC5jYWxsZWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgaWYgKGVyci5tZXNzYWdlLmluZGV4T2YoJ2NhbGxlZScpICE9PSAtMSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBJZiB5b3UgbmVlZCB0byBzdXBwb3J0IFNhZmFyaSA1LTcgKDgtMTAgeXItb2xkIGJyb3dzZXIpLFxuICogdGFrZSBhIGxvb2sgYXQgaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9pcy1idWZmZXJcbiAqL1xuXG5mdW5jdGlvbiBpc0J1ZmZlcih2YWwpIHtcbiAgaWYgKHZhbC5jb25zdHJ1Y3RvciAmJiB0eXBlb2YgdmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlcih2YWwpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cbiIsICIvKiFcbiAqIHNoYWxsb3ctY2xvbmUgPGh0dHBzOi8vZ2l0aHViLmNvbS9qb25zY2hsaW5rZXJ0L3NoYWxsb3ctY2xvbmU+XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE1LXByZXNlbnQsIEpvbiBTY2hsaW5rZXJ0LlxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuY29uc3QgdmFsdWVPZiA9IFN5bWJvbC5wcm90b3R5cGUudmFsdWVPZjtcbmNvbnN0IHR5cGVPZiA9IHJlcXVpcmUoJ2tpbmQtb2YnKTtcblxuZnVuY3Rpb24gY2xvbmUodmFsLCBkZWVwKSB7XG4gIHN3aXRjaCAodHlwZU9mKHZhbCkpIHtcbiAgICBjYXNlICdhcnJheSc6XG4gICAgICByZXR1cm4gdmFsLnNsaWNlKCk7XG4gICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB2YWwpO1xuICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgcmV0dXJuIG5ldyB2YWwuY29uc3RydWN0b3IoTnVtYmVyKHZhbCkpO1xuICAgIGNhc2UgJ21hcCc6XG4gICAgICByZXR1cm4gbmV3IE1hcCh2YWwpO1xuICAgIGNhc2UgJ3NldCc6XG4gICAgICByZXR1cm4gbmV3IFNldCh2YWwpO1xuICAgIGNhc2UgJ2J1ZmZlcic6XG4gICAgICByZXR1cm4gY2xvbmVCdWZmZXIodmFsKTtcbiAgICBjYXNlICdzeW1ib2wnOlxuICAgICAgcmV0dXJuIGNsb25lU3ltYm9sKHZhbCk7XG4gICAgY2FzZSAnYXJyYXlidWZmZXInOlxuICAgICAgcmV0dXJuIGNsb25lQXJyYXlCdWZmZXIodmFsKTtcbiAgICBjYXNlICdmbG9hdDMyYXJyYXknOlxuICAgIGNhc2UgJ2Zsb2F0NjRhcnJheSc6XG4gICAgY2FzZSAnaW50MTZhcnJheSc6XG4gICAgY2FzZSAnaW50MzJhcnJheSc6XG4gICAgY2FzZSAnaW50OGFycmF5JzpcbiAgICBjYXNlICd1aW50MTZhcnJheSc6XG4gICAgY2FzZSAndWludDMyYXJyYXknOlxuICAgIGNhc2UgJ3VpbnQ4Y2xhbXBlZGFycmF5JzpcbiAgICBjYXNlICd1aW50OGFycmF5JzpcbiAgICAgIHJldHVybiBjbG9uZVR5cGVkQXJyYXkodmFsKTtcbiAgICBjYXNlICdyZWdleHAnOlxuICAgICAgcmV0dXJuIGNsb25lUmVnRXhwKHZhbCk7XG4gICAgY2FzZSAnZXJyb3InOlxuICAgICAgcmV0dXJuIE9iamVjdC5jcmVhdGUodmFsKTtcbiAgICBkZWZhdWx0OiB7XG4gICAgICByZXR1cm4gdmFsO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjbG9uZVJlZ0V4cCh2YWwpIHtcbiAgY29uc3QgZmxhZ3MgPSB2YWwuZmxhZ3MgIT09IHZvaWQgMCA/IHZhbC5mbGFncyA6ICgvXFx3KyQvLmV4ZWModmFsKSB8fCB2b2lkIDApO1xuICBjb25zdCByZSA9IG5ldyB2YWwuY29uc3RydWN0b3IodmFsLnNvdXJjZSwgZmxhZ3MpO1xuICByZS5sYXN0SW5kZXggPSB2YWwubGFzdEluZGV4O1xuICByZXR1cm4gcmU7XG59XG5cbmZ1bmN0aW9uIGNsb25lQXJyYXlCdWZmZXIodmFsKSB7XG4gIGNvbnN0IHJlcyA9IG5ldyB2YWwuY29uc3RydWN0b3IodmFsLmJ5dGVMZW5ndGgpO1xuICBuZXcgVWludDhBcnJheShyZXMpLnNldChuZXcgVWludDhBcnJheSh2YWwpKTtcbiAgcmV0dXJuIHJlcztcbn1cblxuZnVuY3Rpb24gY2xvbmVUeXBlZEFycmF5KHZhbCwgZGVlcCkge1xuICByZXR1cm4gbmV3IHZhbC5jb25zdHJ1Y3Rvcih2YWwuYnVmZmVyLCB2YWwuYnl0ZU9mZnNldCwgdmFsLmxlbmd0aCk7XG59XG5cbmZ1bmN0aW9uIGNsb25lQnVmZmVyKHZhbCkge1xuICBjb25zdCBsZW4gPSB2YWwubGVuZ3RoO1xuICBjb25zdCBidWYgPSBCdWZmZXIuYWxsb2NVbnNhZmUgPyBCdWZmZXIuYWxsb2NVbnNhZmUobGVuKSA6IEJ1ZmZlci5mcm9tKGxlbik7XG4gIHZhbC5jb3B5KGJ1Zik7XG4gIHJldHVybiBidWY7XG59XG5cbmZ1bmN0aW9uIGNsb25lU3ltYm9sKHZhbCkge1xuICByZXR1cm4gdmFsdWVPZiA/IE9iamVjdCh2YWx1ZU9mLmNhbGwodmFsKSkgOiB7fTtcbn1cblxuLyoqXG4gKiBFeHBvc2UgYGNsb25lYFxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gY2xvbmU7XG4iLCAiLyohXG4gKiBpc29iamVjdCA8aHR0cHM6Ly9naXRodWIuY29tL2pvbnNjaGxpbmtlcnQvaXNvYmplY3Q+XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMTcsIEpvbiBTY2hsaW5rZXJ0LlxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc09iamVjdCh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIEFycmF5LmlzQXJyYXkodmFsKSA9PT0gZmFsc2U7XG59O1xuIiwgIi8qIVxuICogaXMtcGxhaW4tb2JqZWN0IDxodHRwczovL2dpdGh1Yi5jb20vam9uc2NobGlua2VydC9pcy1wbGFpbi1vYmplY3Q+XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMTcsIEpvbiBTY2hsaW5rZXJ0LlxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnaXNvYmplY3QnKTtcblxuZnVuY3Rpb24gaXNPYmplY3RPYmplY3Qobykge1xuICByZXR1cm4gaXNPYmplY3QobykgPT09IHRydWVcbiAgICAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykgPT09ICdbb2JqZWN0IE9iamVjdF0nO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzUGxhaW5PYmplY3Qobykge1xuICB2YXIgY3Rvcixwcm90O1xuXG4gIGlmIChpc09iamVjdE9iamVjdChvKSA9PT0gZmFsc2UpIHJldHVybiBmYWxzZTtcblxuICAvLyBJZiBoYXMgbW9kaWZpZWQgY29uc3RydWN0b3JcbiAgY3RvciA9IG8uY29uc3RydWN0b3I7XG4gIGlmICh0eXBlb2YgY3RvciAhPT0gJ2Z1bmN0aW9uJykgcmV0dXJuIGZhbHNlO1xuXG4gIC8vIElmIGhhcyBtb2RpZmllZCBwcm90b3R5cGVcbiAgcHJvdCA9IGN0b3IucHJvdG90eXBlO1xuICBpZiAoaXNPYmplY3RPYmplY3QocHJvdCkgPT09IGZhbHNlKSByZXR1cm4gZmFsc2U7XG5cbiAgLy8gSWYgY29uc3RydWN0b3IgZG9lcyBub3QgaGF2ZSBhbiBPYmplY3Qtc3BlY2lmaWMgbWV0aG9kXG4gIGlmIChwcm90Lmhhc093blByb3BlcnR5KCdpc1Byb3RvdHlwZU9mJykgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gTW9zdCBsaWtlbHkgYSBwbGFpbiBPYmplY3RcbiAgcmV0dXJuIHRydWU7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5pY2VzXG4gKi9cblxuY29uc3QgY2xvbmUgPSByZXF1aXJlKCdzaGFsbG93LWNsb25lJyk7XG5jb25zdCB0eXBlT2YgPSByZXF1aXJlKCdraW5kLW9mJyk7XG5jb25zdCBpc1BsYWluT2JqZWN0ID0gcmVxdWlyZSgnaXMtcGxhaW4tb2JqZWN0Jyk7XG5cbmZ1bmN0aW9uIGNsb25lRGVlcCh2YWwsIGluc3RhbmNlQ2xvbmUpIHtcbiAgc3dpdGNoICh0eXBlT2YodmFsKSkge1xuICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICByZXR1cm4gY2xvbmVPYmplY3REZWVwKHZhbCwgaW5zdGFuY2VDbG9uZSk7XG4gICAgY2FzZSAnYXJyYXknOlxuICAgICAgcmV0dXJuIGNsb25lQXJyYXlEZWVwKHZhbCwgaW5zdGFuY2VDbG9uZSk7XG4gICAgZGVmYXVsdDoge1xuICAgICAgcmV0dXJuIGNsb25lKHZhbCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNsb25lT2JqZWN0RGVlcCh2YWwsIGluc3RhbmNlQ2xvbmUpIHtcbiAgaWYgKHR5cGVvZiBpbnN0YW5jZUNsb25lID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGluc3RhbmNlQ2xvbmUodmFsKTtcbiAgfVxuICBpZiAoaW5zdGFuY2VDbG9uZSB8fCBpc1BsYWluT2JqZWN0KHZhbCkpIHtcbiAgICBjb25zdCByZXMgPSBuZXcgdmFsLmNvbnN0cnVjdG9yKCk7XG4gICAgZm9yIChsZXQga2V5IGluIHZhbCkge1xuICAgICAgcmVzW2tleV0gPSBjbG9uZURlZXAodmFsW2tleV0sIGluc3RhbmNlQ2xvbmUpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG4gIHJldHVybiB2YWw7XG59XG5cbmZ1bmN0aW9uIGNsb25lQXJyYXlEZWVwKHZhbCwgaW5zdGFuY2VDbG9uZSkge1xuICBjb25zdCByZXMgPSBuZXcgdmFsLmNvbnN0cnVjdG9yKHZhbC5sZW5ndGgpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbC5sZW5ndGg7IGkrKykge1xuICAgIHJlc1tpXSA9IGNsb25lRGVlcCh2YWxbaV0sIGluc3RhbmNlQ2xvbmUpO1xuICB9XG4gIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogRXhwb3NlIGBjbG9uZURlZXBgXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBjbG9uZURlZXA7XG4iLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCAiaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcblxuaW1wb3J0IHsgZ2V0SW5wdXQsIHdhcm5pbmcgfSBmcm9tIFwiQGFjdGlvbnMvY29yZVwiO1xuaW1wb3J0IHR5cGUgeyBDb25maWd1cmF0aW9uIH0gZnJvbSBcIndlYnBhY2tcIjtcbmltcG9ydCB7IG1lcmdlIH0gZnJvbSBcIndlYnBhY2stbWVyZ2VcIjtcbmNvbnN0IEZlZGVyYXRlZFN0YXRzUGx1Z2luID0gcmVxdWlyZShcIndlYnBhY2stZmVkZXJhdGVkLXN0YXRzLXBsdWdpblwiKTtcblxuYXN5bmMgZnVuY3Rpb24gbG9hZEV4cG9zZXMoKSB7XG4gIGNvbnN0IGV4cG9zZXNJbnB1dCA9IGdldElucHV0KFwiZXhwb3Nlc1wiKSB8fCBcIi4vZXhwb3Nlcy5qc1wiO1xuXG4gIGNvbnN0IGV4cG9zZXNQYXRoID0gcGF0aC5yZXNvbHZlKGV4cG9zZXNJbnB1dCk7XG5cbiAgY29uc3QgZXhwb3Nlc01vZHVsZSA9IHJlcXVpcmUoZXhwb3Nlc1BhdGgpO1xuICByZXR1cm4gW1xuICAgIGF3YWl0ICh0eXBlb2YgZXhwb3Nlc01vZHVsZSA9PT0gXCJmdW5jdGlvblwiXG4gICAgICA/IGV4cG9zZXNNb2R1bGUoKVxuICAgICAgOiBleHBvc2VzTW9kdWxlKSxcbiAgICBwYXRoLmRpcm5hbWUoZXhwb3Nlc1BhdGgpLFxuICBdO1xufVxuXG5hc3luYyBmdW5jdGlvbiBsb2FkU2hhcmVkKCkge1xuICB0cnkge1xuICAgIGNvbnN0IHNoYXJlZElucHV0ID0gZ2V0SW5wdXQoXCJzaGFyZWRcIikgfHwgXCIuL3NoYXJlZC5qc1wiO1xuXG4gICAgY29uc3Qgc2hhcmVkUGF0aCA9IHBhdGgucmVzb2x2ZShzaGFyZWRJbnB1dCk7XG5cbiAgICBjb25zdCBzaGFyZWRNb2R1bGUgPSByZXF1aXJlKHNoYXJlZFBhdGgpO1xuICAgIHJldHVybiBbXG4gICAgICBhd2FpdCAodHlwZW9mIHNoYXJlZE1vZHVsZSA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgID8gc2hhcmVkTW9kdWxlKClcbiAgICAgICAgOiBzaGFyZWRNb2R1bGUpLFxuICAgICAgcGF0aC5kaXJuYW1lKHNoYXJlZFBhdGgpLFxuICAgIF07XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHdhcm5pbmcoXCJGYWlsZWQgdG8gbG9hZCBzaGFyZWRcIik7XG4gICAgd2FybmluZyhlcnIpO1xuICB9XG5cbiAgcmV0dXJuIFtbXV07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBtYWtlQ29uZmlnKCk6IFByb21pc2U8Q29uZmlndXJhdGlvbltdPiB7XG4gIC8qKiBAdHlwZSB7aW1wb3J0KFwid2VicGFja1wiKX0gKi9cbiAgY29uc3Qgd2VicGFjayA9IHJlcXVpcmUoXCJ3ZWJwYWNrXCIpO1xuXG4gIGNvbnN0IFtleHBvc2VzLCBjb250ZXh0XSA9IGF3YWl0IGxvYWRFeHBvc2VzKCk7XG4gIGNvbnN0IFtzaGFyZWRdID0gYXdhaXQgbG9hZFNoYXJlZCgpO1xuICBjb25zdCBjb25maWdJbnB1dCA9IGdldElucHV0KFwiY29uZmlnXCIpIHx8IFwiLi93ZWJwYWNrLmNvbmZpZy5qc1wiO1xuICBjb25zdCBjb25maWdQYXRoID0gcGF0aC5yZXNvbHZlKGNvbmZpZ0lucHV0KTtcbiAgbGV0IHVzZXJDb25maWc6IENvbmZpZ3VyYXRpb24gfCBDb25maWd1cmF0aW9uW10gPSB7fTtcbiAgdHJ5IHtcbiAgICB1c2VyQ29uZmlnID0gcmVxdWlyZShjb25maWdQYXRoKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgd2FybmluZyhcIk5vIHdlYnBhY2sgY29uZmlnIGZvdW5kXCIpO1xuICAgIHdhcm5pbmcoZXJyKTtcbiAgfVxuXG4gIGNvbnN0IGRlZmF1bHRDb25maWc6IENvbmZpZ3VyYXRpb24gPSB7XG4gICAgY29udGV4dCxcbiAgICBlbnRyeTogeyBub29wOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4uL25vb3AuanNcIikgfSxcbiAgICBvdXRwdXQ6IHtcbiAgICAgIHBhdGg6IHBhdGgucmVzb2x2ZShcIi5jb250YWluZXIvY2xpZW50XCIpLFxuICAgIH0sXG4gICAgbW9kZTogXCJwcm9kdWN0aW9uXCIsXG4gIH07XG5cbiAgaWYgKCFBcnJheS5pc0FycmF5KHVzZXJDb25maWcpKSB7XG4gICAgdXNlckNvbmZpZyA9IFt1c2VyQ29uZmlnXTtcbiAgfVxuXG4gIHJldHVybiB1c2VyQ29uZmlnLm1hcCgoY29uZmlnKSA9PiB7XG4gICAgY29uc3QgYmFzZUNvbmZpZyA9IG1lcmdlKGRlZmF1bHRDb25maWcsIGNvbmZpZywge30pO1xuXG4gICAgY29uc3QgZmVkZXJhdGlvbkNvbmZpZzogYW55ID0ge1xuICAgICAgbmFtZTogXCJ0ZXN0XCIsXG4gICAgICBleHBvc2VzLFxuICAgICAgc2hhcmVkLFxuICAgIH07XG5cbiAgICBpZiAoYmFzZUNvbmZpZy50YXJnZXQgIT09IFwibm9kZVwiKSB7XG4gICAgICBiYXNlQ29uZmlnLnBsdWdpbnMgPSBiYXNlQ29uZmlnLnBsdWdpbnMgfHwgW107XG4gICAgICBiYXNlQ29uZmlnLnBsdWdpbnMucHVzaChcbiAgICAgICAgbmV3IEZlZGVyYXRlZFN0YXRzUGx1Z2luKHsgZmlsZW5hbWU6IFwiZmVkZXJhdGlvbi1zdGF0cy5qc29uXCIgfSlcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJhc2VDb25maWcub3V0cHV0ID0gYmFzZUNvbmZpZy5vdXRwdXQgfHwge307XG4gICAgICBiYXNlQ29uZmlnLm91dHB1dC5wYXRoID0gcGF0aC5yZXNvbHZlKFwiLmNvbnRhaW5lci9zZXJ2ZXJcIik7XG4gICAgICBpZiAoIWJhc2VDb25maWcub3V0cHV0LmxpYnJhcnkpIHtcbiAgICAgICAgYmFzZUNvbmZpZy5vdXRwdXQubGlicmFyeSA9IHsgdHlwZTogXCJjb21tb25qc1wiIH07XG4gICAgICB9XG4gICAgICBmZWRlcmF0aW9uQ29uZmlnLmxpYnJhcnkgPSB7IHR5cGU6IFwiY29tbW9uanNcIiB9O1xuICAgIH1cblxuICAgIGJhc2VDb25maWcucGx1Z2lucyA9IGJhc2VDb25maWcucGx1Z2lucyB8fCBbXTtcbiAgICBiYXNlQ29uZmlnLnBsdWdpbnMucHVzaChcbiAgICAgIG5ldyB3ZWJwYWNrLmNvbnRhaW5lci5Nb2R1bGVGZWRlcmF0aW9uUGx1Z2luKGZlZGVyYXRpb25Db25maWcpXG4gICAgKTtcblxuICAgIHJldHVybiBiYXNlQ29uZmlnO1xuICB9KTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IENvbmZpZ3VyYXRpb24sIFN0YXRzIH0gZnJvbSBcIndlYnBhY2tcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBpbmZvLCBzZXRGYWlsZWQsIHNldE91dHB1dCB9IGZyb20gXCJAYWN0aW9ucy9jb3JlXCI7XG5jb25zdCB7IGV4ZWMgfSA9IHJlcXVpcmUoXCJjaGlsZC1wcm9jZXNzLXByb21pc2VcIik7XG5cbmFzeW5jIGZ1bmN0aW9uIHJ1bigpIHtcbiAgY29uc3QgcGFja2FnZUpzb24gPSByZXF1aXJlKHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi4vcGFja2FnZS5qc29uXCIpKTtcbiAgaW5mbyhcIkluc3RhbGxpbmcgRGVwZW5kZW5jaWVzXCIpO1xuICBhd2FpdCBleGVjKFxuICAgIGBucG0gaW5zdGFsbCAke09iamVjdC5lbnRyaWVzKHBhY2thZ2VKc29uLmRlcGVuZGVuY2llcylcbiAgICAgIC5tYXAoKFtwa2csIHZlcnNpb25dKSA9PiBgJHtwa2d9QCR7dmVyc2lvbn1gKVxuICAgICAgLmpvaW4oXCIgXCIpfSAtLW5vLXNhdmVgXG4gICk7XG5cbiAgaW5mbyhcIlJlc29sdmluZyBDb25maWd1cmF0aW9uXCIpO1xuICBjb25zdCBjb25maWc6IENvbmZpZ3VyYXRpb25bXSA9IGF3YWl0IHJlcXVpcmUoXCIuL2NvbmZpZ1wiKS5tYWtlQ29uZmlnKCk7XG5cbiAgaW5mbyhcIkJ1aWxkaW5nIENvbnRhaW5lclwiKTtcbiAgY29uc3Qgd2VicGFjayA9IHJlcXVpcmUoXCJ3ZWJwYWNrXCIpO1xuXG4gIGNvbnN0IHJ1bkJ1aWxkID0gYXN5bmMgKGNvbmZpZzogQ29uZmlndXJhdGlvbiwgaWR4OiBudW1iZXIpID0+IHtcbiAgICBjb25zdCBzdGF0cyA9IGF3YWl0IG5ldyBQcm9taXNlPFN0YXRzPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB3ZWJwYWNrKGNvbmZpZywgKGVycjogRXJyb3IsIHN0YXRzOiBTdGF0cykgPT4ge1xuICAgICAgICBpZiAoZXJyIHx8IHN0YXRzLmhhc0Vycm9ycygpKSB7XG4gICAgICAgICAgc3RhdHMgJiYgaW5mbyhzdGF0cy50b1N0cmluZyh7IGNvbG9yczogdHJ1ZSB9KSArIFwiXFxuXFxuXCIpO1xuICAgICAgICAgIHJldHVybiByZWplY3QoZXJyIHx8IG5ldyBFcnJvcihcIkJ1aWxkIEZhaWxlZFwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc29sdmUoc3RhdHMpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBzZXRPdXRwdXQoYHBhdGgke2lkeH1gLCBzdGF0cy5jb21waWxhdGlvbi5vdXRwdXRPcHRpb25zLnBhdGgpO1xuICAgIGluZm8oc3RhdHMudG9TdHJpbmcoeyBjb2xvcnM6IHRydWUgfSkpO1xuICB9O1xuXG4gIGF3YWl0IFByb21pc2UuYWxsKGNvbmZpZy5tYXAoKGNmZywgaWR4KSA9PiBydW5CdWlsZChjZmcsIGlkeCkpKTtcbn1cblxucnVuKCkuY2F0Y2goKGVycikgPT4ge1xuICBzZXRGYWlsZWQoZXJyKTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU9BLDBCQUErQixPQUFVO0FBQ3ZDLFFBQUksVUFBVSxRQUFRLFVBQVUsUUFBVztBQUN6QyxhQUFPO2VBQ0UsT0FBTyxVQUFVLFlBQVksaUJBQWlCLFFBQVE7QUFDL0QsYUFBTzs7QUFFVCxXQUFPLEtBQUssVUFBVTs7QUFOeEIsV0FBQSxpQkFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1BBLE1BQUEsS0FBQSxhQUFBLFFBQUE7QUFDQSxNQUFBLFVBQUE7QUFxQkEsd0JBQ0UsU0FDQSxZQUNBLFNBQVk7QUFFWixVQUFNLE1BQU0sSUFBSSxRQUFRLFNBQVMsWUFBWTtBQUM3QyxZQUFRLE9BQU8sTUFBTSxJQUFJLGFBQWEsR0FBRzs7QUFOM0MsV0FBQSxlQUFBO0FBU0EsaUJBQXNCLE1BQWMsVUFBa0IsSUFBRTtBQUN0RCxpQkFBYSxNQUFNLElBQUk7O0FBRHpCLFdBQUEsUUFBQTtBQUlBLE1BQU0sYUFBYTtBQUVuQixzQkFBYTtJQUtYLFlBQVksU0FBaUIsWUFBK0IsU0FBZTtBQUN6RSxVQUFJLENBQUMsU0FBUztBQUNaLGtCQUFVOztBQUdaLFdBQUssVUFBVTtBQUNmLFdBQUssYUFBYTtBQUNsQixXQUFLLFVBQVU7O0lBR2pCLFdBQVE7QUFDTixVQUFJLFNBQVMsYUFBYSxLQUFLO0FBRS9CLFVBQUksS0FBSyxjQUFjLE9BQU8sS0FBSyxLQUFLLFlBQVksU0FBUyxHQUFHO0FBQzlELGtCQUFVO0FB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
