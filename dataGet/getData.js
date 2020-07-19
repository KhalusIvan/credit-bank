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
        console.log("-------")
        console.log(req.user);
        base.collection('users').find({email: req.user.email}).toArray((err,resp)=>{
            if (err) console.log("eeeeeeeeeeeeeeeeeerrrrrrrrrrrrrrrrroooooooooooooooooorrrrrrrrrrrrrrrr")
            console.log(resp);
            let user = Object.assign({}, resp[0]);
            user.avatar = user.avatar.buffer;
            res.send(user);
        });
    });
}
module.exports.getData = getData;