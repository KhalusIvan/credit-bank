let {app} = require('../server.js');
let {type} = require('../server.js');
let {middleware} = require('../auth/middleware.js');
var base;
setTimeout(function run() {
    if(base) return;
    var {db} = require('../server.js');
    base = db;
    setTimeout(run, 500);
}, 100);
function getUsersCredits(){
    app.post('/getUsersCredits', type, middleware, (req, res) => {
        base.collection('users_credits').find({user: req.user.email}).toArray((err,resp)=>{
            if (err) console.log("eeeeeeeeeeeeeeeeeerrrrrrrrrrrrrrrrroooooooooooooooooorrrrrrrrrrrrrrrr");
            let index = {
                "active": 1,
                "expired": 2,
                "closed": 3
            }
            resp.map(el => {
                el.finish_sum = el.finish_sum + el.fine;
            });
            resp.sort((a,b) => {
                if (index[a.status] < index[b.status]) 
                    return -1
                else if (index[a.status] > index[b.status])
                    return 1
                return 0 
            });
            res.send(resp);
        });
    });
}
module.exports.getUsersCredits = getUsersCredits;