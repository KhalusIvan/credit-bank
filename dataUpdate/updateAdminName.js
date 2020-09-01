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
function updateAdminName(){
    app.post('/updateAdminName', middleware, type, (req, res) => {
        if(req.user.role == "admin") {
            base.collection('admin').findOneAndUpdate({
                email : req.user.email
            }, { $set: {
                first_name: req.body.first_name,
                second_name: req.body.second_name
                }      
            });
            res.send({status:'ok'});
        } else {
            return res.json({status: "error"})
        }
    });
}
module.exports.updateAdminName = updateAdminName;

