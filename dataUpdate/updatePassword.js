let {app} = require('../server.js');
let {type} = require('../server.js');
const { middleware } = require('../auth/middleware.js');
const bcrypt = require("bcrypt");
var base;
setTimeout(function run() {
    if(base) return;
    var {db} = require('../server.js');
    base = db;
    setTimeout(run, 500);
}, 100);
function updatePassword(){
    app.post('/updatePassword', middleware, type, async (req, res) => {
        let currentOldPAss = false;
        base.collection('users').find({email: req.user.email}).toArray((err,resp)=>{
            if (err) return console.log(err);
            if(bcrypt.compareSync(req.body.old_password, resp[0].password)) {
                bcrypt.hash(req.body.new_password, 10, function(err, hash) {
                    base.collection('users').findOneAndUpdate({
                        email : req.user.email,
                    }, { $set: {
                        password: hash     
                    }});
                });
            }
        });
        res.send({status:'ok'});
    });
}
module.exports.updatePassword = updatePassword;

