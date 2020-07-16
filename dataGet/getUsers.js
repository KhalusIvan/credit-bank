let {app} = require('../server.js');
let {type} = require('../server.js');
let {middleware} = require('../auth/middleware.js');
var base;
setTimeout(function run() {
    if(base) return;
    var {db} = require('../server.js');
    base = db;
    setTimeout(run, 500);
}, 100);
function getUsers(){
    app.post('/getUsers', middleware, type, (req, res) => {
        base.collection('users').find().toArray((err,resp)=>{
            console.log("tuuuuuuut")
            res.send(resp);
            console.log("heeeeerrrreee");
        });
    });
}
module.exports.getUsers = getUsers;