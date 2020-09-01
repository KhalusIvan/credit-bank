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
function getAdminData(){
    app.post('/getAdminData', type, middleware, (req, res) => {
        if(req.user.role == "admin"){
            base.collection('admin').find({email: req.user.email}).toArray((err,resp)=>{
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
module.exports.getAdminData = getAdminData;