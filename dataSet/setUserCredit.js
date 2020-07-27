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
        let startDate = new Date();
        let finishDate = new Date();
        finishDate.setDate(finishDate.getDate() + req.body.term);
        let hashString = req.user.email + startDate.toString();
        base.collection('credit_types').find({id:req.body.id).toArray((err,resp)=>{
            if (err) console.log("eeeeeeeeeeeeeeeeeerrrrrrrrrrrrrrrrroooooooooooooooooorrrrrrrrrrrrrrrr")
            bcrypt.hash(hashString, 10, async function(err, hash) {
                base.collection('users_credits').insertOne({
                    "id": hash,
                    "user": req.user.email,
                    "name": resp.name,
                    "description": resp.description,
                    "start_date": startDate,
                    "term": req.body.term,
                    "finish_date": finishDate,
                    "percent": req.body.percent,
                    "value": req.body.value,
                    "paid": 0,
                    "finish_sum": req.body.start_sum + (req.body.start_sum / 100 * req.body.percent * req.body.term),
                    "fine": 0,
                    "status": "active"
                },(err,result)=>{
                    if(err)
                        return console.log(err);
                    res.send(result.ops[0]);
                }); 
                //res.send(commentsItem);
    
            });
        });
       
    });
}
module.exports.setUserCredit = setUserCredit;