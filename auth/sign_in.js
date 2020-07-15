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
    console.log(2333);
    try {
        console.log(1);
        console.log(2);
        base.collection('users').find({email: req.body.email}).toArray((err,resp)=>{
            console.log(resp);
            if (resp.length == 0)
                res.sendStatus(401).json({status: "error"});
            else {
                console.log(4);
                const isValid = bcrypt.compareSync(req.body.password, resp.password);
                console.log(5555);
                if (isValid) {
                    const token = jwt.sign(resp.role, secretJWT);
                    res.send(token);
                }
                else {
                    res.sendStatus(401).json({status:"error"});
                }
            }
        });
    } catch (e) {
        console.log(2222);
        res.sendStatus(500).json({message: e.message});
    }
}
module.exports.signIn = signIn;