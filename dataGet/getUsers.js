let {app} = require('../server.js');
let {type} = require('../server.js');
var base;
setTimeout(function run() {
    if(base) return;
    var {db} = require('../server.js');
    base = db;
    setTimeout(run, 500);
}, 100);
function getUsers(){
    app.post('/getUsers', type, (req, res) => {
        base.collection('users').find().toArray((err,resp)=>{
            res.send(resp);
        });
    });
}
module.exports.getUsers = getUsers;