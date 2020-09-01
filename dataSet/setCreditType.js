let {app} = require('../server.js');
let {type} = require('../server.js');
let {middleware} = require('../auth/middleware.js');
let bcrypt = require('bcrypt');
var base;
setTimeout(function run() {
    if(base) return;
    var {db} = require('../server.js');
    base = db;
    setTimeout(run, 500);
}, 100);
function setCreditType(){
    app.post('/setCreditType', middleware, type, async (req, res) => {
        if (req.user.role == "admin") {
            base.collection('credit_types').find({}, {projection:{name:1}}).toArray((err,resp)=>{
                if (resp.length >= 10) {
                    return res.json({status: "limit"})
                } else {
                    let date = new Date();
                    let creditItem;
                    let hashString = req.body.name + date.toString();
                    bcrypt.genSalt(10, function(err, salt) {
                        bcrypt.hash(hashString, salt, async function(err, hash) {
                            base.collection('credit_types').insertOne({
                                "name": req.body.newCredit.name,
                                'description': req.body.newCredit.description,
                                'min_value': req.body.newCredit.min_value,
                                'max_value': req.body.newCredit.max_value,
                                'min_term': req.body.newCredit.min_term,
                                'max_term': req.body.newCredit.max_term,
                                'percent': req.body.newCredit.percent,
                                "id": hash
                            },(err,result)=>{
                                if(err)
                                    return console.log(err);
                            }); 
                            res.send({"id": hash});

                        });
                    });
                }
            });
        } else {
            return res.json({status: "error"})
        }
    });
}
module.exports.setCreditType = setCreditType;