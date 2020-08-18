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
function register(req, res){

    base.collection('admin').find({email: req.body.email}).toArray((err,respA)=>{
        if (err) return console.log(err)
        if (respA.length == 0) {
            base.collection('users').find({email: req.body.email}).toArray((err,resp)=>{
                console.log(req.body);
                if (err) return console.log(err)
                if (resp.length == 0) {
                    bcrypt.hash(req.body.password, 10, function(err, hash) {
                        base.collection('users').insertOne({
                            'first_name': req.body.first_name,
                            'second_name': req.body.second_name,
                            'password': hash,
                            'email': req.body.email,
                            'phone': null,
                            'avatar': null,
                            'passport': null,
                            'credit_card': null,
                            'role': "user",
                            "is_checked": false,
                            "is_confirmed": false,
                            "is_passport": false
                        },(err,result)=>{
                            if(err)
                                return res.json({status: "error"});
                            else {
        
                                jwt.sign(
                                    {
                                      email: req.body.email,
                                    },
                                    secretJWT,
                                    {
                                      expiresIn: '1h',
                                    }, (err, emailToken) => {
                                        const url = `http://credit-bank-practice.herokuapp.com/confirmation/${emailToken}`;
                                        let html_text = req.body.lang == "ukr" ? `Будь ласка перейдіть за <a href="${url}">даним посиланням</a>  щоб підтвердити Ваш e-mail адрес.` :
                                            `Please follow <a href="${url}">this reference</a>  to confirm your e-mail.`;
                                        let subject_text = req.body.lang == "ukr" ? "Підтвердження емайла" : "E-mail confirmation";
                                        transporter.sendMail({
                                            from: 'vakhalus.work@gmail.com',
                                            to: req.body.email,
                                            subject: subject_text,
                                            html: html_text
                                        }, function (err, info) {
                                            if (err) {
                                                return res.json({status: "error"})
                                            }
                                            else
                                                return res.json({status:"confirm", email:req.body.email});       
                                        })
                                    })
                            }
                            });
                        });
                } else {
                    res.json({status: "email"});
                }
            });
        } else {
            res.json({status: "email"});
        }
    });
}
module.exports.register = register;