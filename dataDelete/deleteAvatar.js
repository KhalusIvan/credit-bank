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
function deleteAvatar(){
    app.post('/deleteAvatar', middleware, type, (req, res) => {
        let avatar = req.file.buffer;
        base.collection('users').findOneAndUpdate({
            email : req.user.email
        }, { $set: {
            avatar: null
            }      
        });
        base.collection('comments').updateMany({email : req.user.email}, {$set: {avatar : avatar}})


        let html_text = req.body.lang == "ukr" ? `Будь ласка перейдіть за <a href="${url}">даним посиланням</a>  щоб підтвердити Ваш e-mail адрес.` :
                `Please follow <a href="${url}">this reference</a>  to confirm your e-mail.`;
        let subject_text = req.body.lang == "ukr" ? "Підтвердження емайла" : "E-mail confirmation";
        transporter.sendMail({
                from: 'vakhalus.work@gmail.com',
                to: req.body.email,
                subject: subject_text,
                html: html_text
            }, function (err, info) {
                if (err) {
                    return res.json({status: "error"})
                }
                else
                    return res.json({status:"confirm", email:req.body.email});       
            })
        res.send({status:'ok'});
    });
}
module.exports.deleteAvatar = deleteAvatar;
