let {app} = require('../server.js');
let {type} = require('../server.js');
const { middleware } = require('../auth/middleware.js');
const {transporter} = require('../server.js');
var base;
setTimeout(function run() {
    if(base) return;
    var {db} = require('../server.js');
    base = db;
    setTimeout(run, 500);
}, 100);
function deleteAvatar(){
    app.post('/deleteAvatar', middleware, type, (req, res) => {
        if (req.user.role == "admin") {
            base.collection('users').findOneAndUpdate({
                email : req.body.email
            }, { $set: {
                avatar: null
                }      
            });
            base.collection('comments').updateMany({email : req.body.email}, {$set: {avatar : null}})
            transporter.sendMail({
                from: 'vakhalus.work@gmail.com',
                to: req.body.email,
                subject: "Видалення аватару",
                html: req.body.text
            }, function (err, info) {
                if (err) {
                    return res.json({status: "error"})
                }
                else
                    return res.json({status:"ok"});       
            })
            res.send({status:'ok'});
        } else {
            return res.json({status: "error"})
        }
    });
}
module.exports.deleteAvatar = deleteAvatar;
