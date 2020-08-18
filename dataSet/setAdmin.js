let {app} = require('../server.js');
let {type} = require('../server.js');
let {secretJWT} = require('../server.js');
const {transporter} = require('../server.js');
const bcrypt = require("bcrypt");
var base;
const jwt = require("jsonwebtoken");
setTimeout(function run() {
    if(base) return;
    var {db} = require('../server.js');
    base = db;
    setTimeout(run, 500);
}, 100);
function setAdmin(req, res){
    app.post('/setAdmin', type, async (req, res) => {
        base.collection('users').find({email: req.body.email}).toArray((err,resp)=>{
            if (err) return console.log(err)
            if (resp.length == 0) {
                base.collection('admin').find({email: req.body.email}).toArray((err,respA)=>{
                    if (err) return console.log(err)
                    if (respA.length == 0) {
                        bcrypt.hash(req.body.password, 10, function(err, hash) {
                            base.collection('admin').insertOne({
                                'first_name': req.body.first_name,
                                'second_name': req.body.second_name,
                                'password': hash,
                                'email': req.body.email,
                                'avatar': null,
                                'role': "admin",
                            },(err,result)=>{
                                if(err)
                                    return res.json({status: "error"});
                                else
                                    return res.json({status:"ok"});
                                });
                            });
                    } else {
                        res.json({status: "email"});
                    }
                });
            } else {
                return res.json({status: "email"});
            }
        });
    });
}
module.exports.setAdmin = setAdmin;