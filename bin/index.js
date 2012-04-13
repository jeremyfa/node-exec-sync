(function() {
  var FFI, fs, libc, tmpDir, uniqId, uniqIdK;

  FFI = require("node-ffi");

  libc = new FFI.Library(null, {
    "system": ["int32", ["string"]]
  });

  fs = require("fs");

  uniqIdK = 0;

  uniqId = function() {
    var prefix;
    prefix = 'tmp';
    return prefix + (new Date()).getTime() + '' + (uniqIdK++) + ('' + Math.random()).split('.').join('');
  };

  tmpDir = function() {
    var dir, name, _i, _len, _ref;
    _ref = ['TMPDIR', 'TMP', 'TEMP'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      name = _ref[_i];
      if (process.env[name] != null) {
        dir = process.env[name];
        if (dir.charAt(dir.length - 1) === '/') {
          return dir.substr(0, dir.length - 1);
        }
        return dir;
      }
    }
    return '/tmp';
  };

  module.exports = function(cmd) {
    var dir, result, tmp;
    tmp = uniqId() + '.tmp';
    dir = tmpDir();
    cmd = "" + cmd + " > " + dir + "/" + tmp;
    libc.system(cmd);
    result = fs.readFileSync("" + dir + "/" + tmp);
    fs.unlinkSync("" + dir + "/" + tmp);
    result = "" + result;
    if (result.charAt(result.length - 1) === "\n") {
      result = result.substr(0, result.length - 1);
    }
    return result;
  };

}).call(this);
