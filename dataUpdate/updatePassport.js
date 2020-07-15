let {app} = require('../server.js');
let {type} = require('../server.js');
var base;
setTimeout(function run() {
    if(base) return;
    var {db} = require('../server.js');
    base = db;
    setTimeout(run, 500);
}, 100);
function updatePassport(){
    app.post('/updatePassport', type, (req, res) => {
        base.collection('users').findOneAndUpdate({
            token : req.body.token
        }, { $set: {
            passport: req.body.passport
            }      
        });
        res.send({status:'ok'});
    });
}
module.exports.updatePassport = updatePassport;
