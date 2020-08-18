let {app} = require('../server.js');
let {secretJWT} = require('../server.js');
let {type} = require('../server.js');
var base;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BSONType } = require('mongodb');
setTimeout(function run() {
    if(base) return;
    var {db} = require('../server.js');
    base = db;
    setTimeout(run, 500);
}, 100);
function signIn(req, res){
    try {
        base.collection('users').find({email: req.body.email}, {projection:{passport:0}}).toArray((err,resp)=>{
            if (resp.length == 0) {
                base.collection("admin").find({email.req.body.email}).toArray((err, respA) => {
                    if (respA.length == 0) {
                        res.json({status: "error"});
                    } else {
                        const isValid = bcrypt.compareSync(req.body.password, resp[0].password);
                        if (isValid) {
                            const token = jwt.sign({email:resp[0].email, role:resp[0].role}, secretJWT, {expiresIn: "1h"});
                            res.json({token, role:resp[0].role});
                        }
                        else {
                            res.json({status:"error"});
                        }
                    }
                })
            } else {
                const isValid = bcrypt.compareSync(req.body.password, resp[0].password);
                if (isValid) {
                    if (resp[0].is_confirmed) {
                        const token = jwt.sign({email:resp[0].email, role:resp[0].role}, secretJWT, {expiresIn: "1d"});
                        res.json({token, role:resp[0].role});
                    }
                    else 
                        res.json({status:"confirm"});
                    
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