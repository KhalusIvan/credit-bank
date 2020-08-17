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
function updateCreditCard(){
    app.post('/updateCreditCard', middleware, type, (req, res) => {
        if (req.user.role == "user") {
            base.collection('users').findOneAndUpdate({
                email : req.user.email
            }, { $set: {
                credit_card: req.body.credit_card
                }      
            });
            res.send({status:'ok'});
        } else {
            return res.json({status: "error"})
        }
    });
}
module.exports.updateCreditCard = updateCreditCard;

