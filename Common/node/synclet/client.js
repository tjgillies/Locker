/*
*
* Copyright (C) 2011, The Locker Project
* All rights reserved.
*
* Please see the LICENSE file for more information.
*
*/

var fs = require('fs')
  , data = '';
  ;

// Process the startup JSON object
process.stdin.setEncoding('utf8');
process.stdin.on("data", function(newData) {
    // Do the initialization bits
    data += newData;
    try {
        JSON.parse(data);
        run(data);
    } catch (E) {}
});

function run (processInfo) {
    var run = processInfo.syncletToRun;
    var sync = require(run.name + ".js");
    sync.sync(processInfo, function(err, returnedInfo) {
        if (err) {
            var error = JSON.stringify(err);
            fs.writeSync(1, error);
        } else {
            var output = JSON.stringify(returnedInfo);
            fs.writeSync(1, output);
        }
        process.exit();
    });
}
process.stdin.resume();
