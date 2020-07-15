let {app} = require('../server.js');
let {type} = require('../server.js');
var base;
setTimeout(function run() {
    if(base) return;
    var {db} = require('../server.js');
    base = db;
    setTimeout(run, 500);
}, 100);
function updateCreditCard(){
    app.post('/updateCreditCard', type, (req, res) => {
        base.collection('users').findOneAndUpdate({
            token : req.body.token
        }, { $set: {
            credit_card: req.body.credit_card
            }      
        });
        res.send({status:'ok'});
    });
}
module.exports.updateCreditCard = updateCreditCard;

