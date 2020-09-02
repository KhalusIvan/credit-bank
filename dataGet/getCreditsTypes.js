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
function getCreditsTypes(){
    app.post('/getCreditsTypes', type, middleware, (req, res) => {
        if (req.user.role == "user" || req.user.role == "admin") {
            base.collection('credit_types').find().sort({_id:-1}).toArray((err,resp)=>{
                if (err) return console.log(err)
                res.send(resp);
            });
        } else {
            return res.json({status: "error"})
        }
    });
}
module.exports.getCreditsTypes = getCreditsTypes;