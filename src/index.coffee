
FFI = require "node-ffi"
libc = new FFI.Library null, "system": ["int32", ["string"]]
fs = require "fs"

uniqIdK = 0
uniqId = ->
    prefix ?= 'tmp'
    prefix + (new Date()).getTime() + '' + (uniqIdK++) + ('' + Math.random()).split('.').join('')

module.exports = (cmd) ->
    tmp = uniqId()+'.tmp'
    cmd = "#{cmd} > #{__dirname}/#{tmp}"
    libc.system cmd
    result = fs.readFileSync "#{__dirname}/#{tmp}"
    fs.unlinkSync "#{__dirname}/#{tmp}"
    result = "#{result}"
    if result.charAt(result.length-1) is "\n" then result = result.substr(0,result.length-1)
    return result
