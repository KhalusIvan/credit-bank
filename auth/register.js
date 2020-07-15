let {app} = require('../server.js');
let {type} = require('../server.js');
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
    console.log(2222222);
    let password;
        let token = "111";
        bcrypt.genSalt(10, function(err, salt) {
            let password = bcrypt.hash(req.body.password, salt);
        });
        //let password = bcrypt.hashSync(req.body.password, "my salt");
        console.log(password);
        base.collection('users').insertOne({
            'first_name': req.body.first_name,
            'second_name': req.body.second_name,
            'password': password,
            'email': req.body.email,
            'phone': null,
            'avatar': null,
            'passport': null,
            'credit_card': null,
            'role': req.body.role,
            'token': token
        },(err,result)=>{
            if(err)
                return console.log(err);
            //res.redirect('/');
        });
        res.json({token: token});
  
}
module.exports.register = register;