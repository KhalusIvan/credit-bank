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
function getUsersActiveCredits(){
    app.post('/getUsersActiveCredits', type, middleware, (req, res) => {
        base.collection('active_credits').find({email: req.user.email}).toArray((err,resp)=>{
            if (err) console.log("eeeeeeeeeeeeeeeeeerrrrrrrrrrrrrrrrroooooooooooooooooorrrrrrrrrrrrrrrr")
            res.send(resp);
        });
    });
}
module.exports.getUsersActiveCredits = getUsersActiveCredits;