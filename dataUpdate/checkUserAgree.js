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
function checkUserAgree(){
    app.post('/checkUserAgree', middleware, type, (req, res) => {
        
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
    });
}
module.exports.checkUserAgree = checkUserAgree;

