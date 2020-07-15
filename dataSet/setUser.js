let {app} = require('../server.js');
let {type} = require('../server.js');
var base;
setTimeout(function run() {
    if(base) return;
    var {db} = require('../server.js');
    base = db;
    setTimeout(run, 500);
}, 100);
function setUser(){
    app.post('/setUser', type, (req, res) => {
        let token = "111";
        console.log(base);
        base.collection('users').insertOne({
            'first_name': req.body.first_name,
            'second_name': req.body.second_name,
            'password': req.body.password,
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
    });
}
module.exports.setUser = setUser;