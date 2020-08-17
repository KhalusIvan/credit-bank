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
function getData(){
    app.post('/getData', type, middleware, (req, res) => {
        if(req.user.role == "user" || req.user.role == "admin"){
            base.collection('users').find({email: req.user.email}, {projection:{passport:0}}).toArray((err,resp)=>{
                if (err) return console.log(err)
                let user = Object.assign({}, resp[0]);
                if(user.avatar != null)
                    user.avatar = user.avatar.buffer;
                res.send(user);
            });
        } else {
            return res.json({status: "error"})
        }
    });
}
module.exports.getData = getData;