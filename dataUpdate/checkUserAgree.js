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
function checkUserAgree(){
    app.post('/checkUserAgree', middleware, type, (req, res) => {
        if (res.user.role == "admin") {
            base.collection('users').findOneAndUpdate({
                email : req.body.email
            }, { $set: {
                is_checked: true
                }      
            });
            transporter.sendMail({
                from: 'vakhalus.work@gmail.com',
                to: req.body.email,
                subject: "Підтвердження акаунту",
                html: "Ваш акаунт підтверджено"
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
module.exports.checkUserAgree = checkUserAgree;

