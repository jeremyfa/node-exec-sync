
FFI = require "ffi"
libc = new FFI.Library null, "system": ["int32", ["string"]]
fs = require "fs"

# Generate a pseudo-unique identifier
uniqIdK = 0
uniqId = ->
    prefix = 'tmp'
    prefix + (new Date()).getTime() + '' + (uniqIdK++) + ('' + Math.random()).split('.').join('')

# Retrieve temporary writable directory
tmpDir = ->
    for name in ['TMPDIR', 'TMP', 'TEMP']
        if process.env[name]?
            dir = process.env[name]
            if dir.charAt(dir.length-1) is '/' then return dir.substr(0, dir.length-1)
            return dir
    return '/tmp' # Fallback to the default

# execSync implementation
module.exports = (cmd) ->
    tmp = uniqId()+'.tmp'
    dir = tmpDir()
    cmd = "#{cmd} > #{dir}/#{tmp}"
    libc.system cmd
    result = fs.readFileSync "#{dir}/#{tmp}"
    fs.unlinkSync "#{dir}/#{tmp}"
    result = "#{result}"
    if result.charAt(result.length-1) is "\n" then result = result.substr(0,result.length-1)
    return result
