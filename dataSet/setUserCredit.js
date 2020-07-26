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
        finishDate.setDate(finishDate.getDate() + req.body.time);
        let hashString = req.body.email + startDate.toString();
        bcrypt.hash(hashString, 10, async function(err, hash) {
            base.collection('active_credits').insertOne({
                "id": hash,
                "user": req.user.email,
                "name": req.body.name,
                "start_date": startDate,
                "time": req.body.time,
                "finish_date": finishDate,
                "percent": req.body.percent,
                "start_sum": req.body.start_sum,
                "already_paid": 0,
                "finish_sum": req.body.start_sum + (req.body.start_sum / 100 * req.body.percent),
            },(err,result)=>{
                if(err)
                    return console.log(err);
                res.send(result.ops[0]);
            }); 
            //res.send(commentsItem);

        });
    });
}
module.exports.setUserCredit = setUserCredit;