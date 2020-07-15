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
            console.log(resp);
            if (resp.length == 0)
                res.json({status: "error"});
            else {
                console.log(4);
                const isValid = bcrypt.compareSync(req.body.password, resp[0].password);
                console.log(5555);
                if (isValid) {
                    const token = jwt.sign(resp.role, secretJWT);
                    res.send(token);
                }
                else {
                    res.json({status:"error"});
                }
            }
        });
    } catch (e) {
        console.log(2222);
        res.json({message: e.message});
    }
}
module.exports.signIn = signIn;