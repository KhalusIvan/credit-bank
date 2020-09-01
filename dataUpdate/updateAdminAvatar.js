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
function updateAdminAvatar(){
    app.post('/updateAdminAvatar', middleware, type, (req, res) => {
        if (req.user.role == "admin") {
            let avatar = req.file.buffer;
            base.collection('admin').findOneAndUpdate({
                email : req.user.email
            }, { $set: {
                avatar: avatar
                }      
            });
            res.send({status:'ok'});
        } else {
            return res.json({status: "error"})
        }
    });
}
module.exports.updateAdminAvatar = updateAdminAvatar;
