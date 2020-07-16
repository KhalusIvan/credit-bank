let {app} = require('../server.js');
let {secretJWT} = require('../server.js');
let {type} = require('../server.js');
var base;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
setTimeout(function run() {
    if(base) return;
    var {db} = require('../server.js');
    base = db;
    setTimeout(run, 500);
}, 100);
function signIn(req, res){
    try {
        base.collection('users').find({email: req.body.email}).toArray((err,resp)=>{
            if (resp.length == 0)
                res.json({status: "error"});
            else {
                const isValid = bcrypt.compareSync(req.body.password, resp[0].password);
                if (isValid) {
                    const token = jwt.sign({email:resp[0].email, role:resp[0].role}, secretJWT);
                    console.log(token);
                    res.json({token});
                }
                else {
                    res.json({status:"error"});
                }
            }
        });
    } catch (e) {
        res.json({message: e.message});
    }
}
module.exports.signIn = signIn;