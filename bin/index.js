(function() {
  var FFI, fs, libc, uniqId, uniqIdK;

    function _getTMPDir() {
      var tmpNames = [ 'TMPDIR', 'TMP', 'TEMP' ];

      for (var i = 0, length = tmpNames.length; i < length; i++) {
        if ( typeof process.env[tmpNames[i]] === 'undefined') continue;

        return process.env[tmpNames[i]];
      }

      // fallback to the default
      return '/tmp';
    }

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
    cmd = "" + cmd + " > " + _getTMPDir() + "/" + tmp;
    libc.system(cmd);
    result = fs.readFileSync("" + _getTMPDir() + "/" + tmp);
    fs.unlinkSync("" + _getTMPDir() + "/" + tmp);
    result = "" + result;
    if (result.charAt(result.length - 1) === "\n") {
      result = result.substr(0, result.length - 1);
    }
    return result;
  };

}).call(this);
