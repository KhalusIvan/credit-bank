let {app} = require('../server.js');
let {type} = require('../server.js');
var base;
setTimeout(function run() {
    if(base) return;
    var {db} = require('../server.js');
    base = db;
    setTimeout(run, 500);
}, 100);
function updatePhone(){
    app.post('/updatePhone', type, (req, res) => {
        base.collection('users').findOneAndUpdate({
            token : req.body.token
        }, { $set: {
            phone: req.body.phone
            }      
        });
        res.send({status:'ok'});
    });
}
module.exports.updatePhone = updatePhone;
