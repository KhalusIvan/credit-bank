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
function updateCreditTypes(){
    app.post('/updateCreditTypes', middleware, type, (req, res) => {
        if (req.user.role == "admin") {
            base.collection('credit_types').findOneAndUpdate({
                id : req.body.id
            }, { $set: {
                name: req.body.name,
                description: req.body.description,
                min_value: req.body.min_value,
                max_value: req.body.max_value,
                min_term: req.body.min_term,
                max_term: req.body.max_term,
                percent: req.body.percent
                }      
            });
            res.send({status:'ok'});
        } else {
            return res.json({status: "error"})
        }
    });
}
module.exports.updateCreditTypes = updateCreditTypes;

