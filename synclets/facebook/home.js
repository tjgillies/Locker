/*
*
* Copyright (C) 2011, The Locker Project
* All rights reserved.
*
* Please see the LICENSE file for more information.
*
*/

var fb = require('../../Connectors/Facebook/lib.js')
  , posts = []
  , updateState
  ;


exports.sync = function(processInfo, cb) {
console.error("RUNNING "+JSON.stringify(processInfo));
    fb.init(processInfo.auth);
    var arg = {id:"me",type:"home"};
    if (processInfo.config && processInfo.config.updateState && processInfo.config.updateState.home) {
        arg.since = processInfo.config.updateState.home.since;
    }
    var since=0;
    fb.getPosts(arg,function(post){
        posts.push({'obj' : post, timestamp: new Date(), type : 'new'});
        if(post.updated_time > since) since = post.updated_time;
    },function(err) {
        var responseObj = {data : {}, config : {}};
        responseObj.data.home = posts;
        responseObj.config.updateState = {home:{since:since}};
        cb(err, responseObj);
    });
};
