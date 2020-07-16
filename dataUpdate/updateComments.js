let {app} = require('../server.js');
const {type} = require('../server.js');
const { middleware } = require('../auth/middleware.js');
var base;
setTimeout(function run() {
    if(base) return;
    var {db} = require('../server.js');
    base = db;
    setTimeout(run, 500);
}, 100);
function updateComments(){
    app.post('/updateComments', middleware, type, (req, res) => {
        base.collection('comments').findOneAndUpdate({
            id : req.body.id,
            email: req.user.email
        }, { $set: {
            text: req.body.text
            }      
        });
        res.send({status:'ok'});
    });
}
module.exports.updateComments = updateComments;

