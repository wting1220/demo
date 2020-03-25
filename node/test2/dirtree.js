const fs = require('fs')

fs.readdir('../../node', (err, dirs) => {
    dirtree(dirs)
}) 

function dirtree(dirs) {
    for (let index = 0; index < dirs.length; index++) {
        console.log(dirs[index])
        fs.stat(dirs[index], (err, stats) => {
            console.log(stats)
            // if (stats.isFile()) {
            //     console.log('   ' + dir)
            // } else {
            //     dirtree(dirs[index])
            // }
        })
    }
}


