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
    /*app.post('/updatePassword', middleware, type, (req, res) => {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.old_password, salt, function(err, hash) {
                base.collection('users').findOneAndUpdate({
                    email : req.user.email,
                    password: hash
                }, { $set: {
                    password: async bcrypt.genSalt(10, function(err, salt) {
                        asyncbcrypt.hash(req.body.new_password, salt, function(err, new_hash) {
                            console.log(new_hash);
                             return new_hash;
                        });
                        })
                    }      
                });
            });
            });
            console.log(111);
        res.send({status:'ok'});
    });*/
}
module.exports.updatePassword = updatePassword;

