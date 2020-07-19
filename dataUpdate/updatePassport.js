let {app} = require('../server.js');
let {type} = require('../server.js');
const { middleware } = require('../auth/middleware.js');
var base;
setTimeout(function run() {
    if(base) return;
    var {db} = require('../server.js');
    base = db;
    setTimeout(run, 500);
}, 100);
function updatePassport(){
    app.post('/updatePassport', middleware, type, (req, res) => {
        base.collection('users').findOneAndUpdate({
            email : req.user.email
        }, { $set: {
            passport: req.body.passport
            }      
        });
        res.send({status:'ok'});
    });
}
module.exports.updatePassport = updatePassport;
