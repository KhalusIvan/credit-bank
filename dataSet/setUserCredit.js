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
function setUserCredit(){
    app.post('/setUserCredit', middleware, type, async (req, res) => {
        let counter_active = 0, counter_expired = 0;
        base.collection('users_credits').find({user: req.user.email}).toArray((err,respAll)=>{
            if (err) return console.log(err);
            for(let i = 0; i < respAll.length; i++) {
                if (respAll[i].status == "active") 
                    counter_active++;
                else if (respAll[i].status == "expired")
                    counter_expired++;  
            }  
            if (counter_expired != 0) {
                return res.json({status: "expired"});
            } else if (counter_active > 3) {
                return res.json({status: "limit"});
            }
            let startDate = new Date();
            let finishDate = new Date();
            finishDate.setDate(finishDate.getDate() + req.body.term);
            let hashString = req.user.email + startDate.toString();
            base.collection('credit_types').find({id:req.body.id}).toArray((err,resp)=>{
                if (err) return console.log(err)
                bcrypt.hash(hashString, 10, async function(err, hash) {
                    base.collection('users_credits').insertOne({
                        "id": hash,
                        "user": req.user.email,
                        "name": resp[0].name,
                        "description": resp[0].description,
                        "start_date": startDate,
                        "term": req.body.term,
                        "end_date": finishDate,
                        "percent": resp[0].percent,
                        "value": req.body.value,
                        "paid": 0,
                        "finish_sum": req.body.value + (req.body.value / 100 * resp[0].percent * req.body.term),
                        "fine": 0,
                        "status": "active"
                    },(err,result)=>{
                        if(err)
                            return console.log(err);
                        return res.send(result.ops[0]);
                    }); 
                    //res.send(commentsItem);
            
                    });
                });
        });
        
       
    });
}
module.exports.setUserCredit = setUserCredit;