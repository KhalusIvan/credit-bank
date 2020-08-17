var {app} = require('../server.js');
let {type} = require('../server.js');
const { middleware } = require('../auth/middleware.js');
var base;
setTimeout(function run() {
    if(base) return;
    var {db} = require('../server.js');
    base = db;
    setTimeout(run, 500);
}, 100);
function updateCreditPaid(){
    app.post('/updateCreditPaid', middleware, type, (req, res) => {
        if (req.user.role == "user") {
            let allSum;
            let needSum;
            base.collection('users_credits').find({id: req.body.id, user:req.user.email}).toArray((err,resp)=>{
                if (err) return console.log(err);
                allSum = req.body.paidSum + resp[0].paid;      
                needSum = resp[0].finish_sum + resp[0].fine;
                if (allSum >= needSum) {
                    base.collection('users_credits').findOneAndUpdate({
                        id: req.body.id
                    }, { $set: {
                        paid: allSum,
                        status: "closed"
                        }      
                    },{                              
                        returnOriginal: false
                    },(err,result,raw)=>{
                        if(err)
                            return console.log(err);
                        res.send(result.value);
                    });
                } else {
                    base.collection('users_credits').findOneAndUpdate({
                        id: req.body.id
                    }, { $set: {
                        paid: allSum,
                        }      
                    },{                              
                        returnOriginal: false
                    },(err,result, raw)=>{
                        if(err)
                            return console.log(err);
                        res.send(result.value);
                    });
                }     
            });
        } else {
            return res.json({status: "error"})
        }
    });
}
module.exports.updateCreditPaid = updateCreditPaid;

