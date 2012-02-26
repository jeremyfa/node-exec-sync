# exec-sync

Execute shell command synchronously. Use this for migration scripts, cli programs, but not for regular server code.

## Installation

### Installing npm (node package manager)
``` bash
$ curl http://npmjs.org/install.sh | sh
```

### Installing exec-sync
``` bash
$ cd /path/to/your/project
$ [sudo] npm install exec-sync
```

### Using exec-sync from node.js
Warning: use only for special operation or command line scripts written with node. Don't use this for regular server code or it will ruin the responsiveness of your server.

``` js
var execSync = require('exec-sync');

var user = execSync('echo $USER');
console.log(user);
```

### TODO

Throw error when something went wrong.
