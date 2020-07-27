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
function updatePhone(){
    app.post('/updatePhone', middleware, type, (req, res) => {
        base.collection('users').findOneAndUpdate({
            email : req.user.email
        }, { $set: {
            phone: req.body.phone
            }      
        });
        res.send({status:'ok'});
    });
}
module.exports.updatePhone = updatePhone;