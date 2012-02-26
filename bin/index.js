(function() {
  var FFI, fs, libc, uniqId, uniqIdK;

  FFI = require("node-ffi");

  libc = new FFI.Library(null, {
    "system": ["int32", ["string"]]
  });

  fs = require("fs");

  uniqIdK = 0;

  uniqId = function() {
    if (typeof prefix === "undefined" || prefix === null) prefix = 'tmp';
    return prefix + (new Date()).getTime() + '' + (uniqIdK++) + ('' + Math.random()).split('.').join('');
  };

  module.exports = function(cmd) {
    var result, tmp;
    tmp = uniqId() + '.tmp';
    cmd = "" + cmd + " > " + __dirname + "/" + tmp;
    libc.system(cmd);
    result = fs.readFileSync("" + __dirname + "/" + tmp);
    fs.unlinkSync("" + __dirname + "/" + tmp);
    result = "" + result;
    if (result.charAt(result.length - 1) === "\n") {
      result = result.substr(0, result.length - 1);
    }
    return result;
  };

}).call(this);
