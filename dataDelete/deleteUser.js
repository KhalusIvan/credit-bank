const {app, type} = require('../server.js');
const { middleware } = require('../auth/middleware.js');
const {transporter} = require('../server.js');
var base;
setTimeout(function run() {
    if(base) return;
    var {db} = require('../server.js');
    base = db;
    setTimeout(run, 500);
}, 100);
function deleteUser(){
    app.post('/deleteUser', type, middleware, (req, res) => {
        base.collection("users_credits").find({user:req.body.email, "$or":[{status:"active"}, {status:"expired"}]}, {projection: {status:1}}).toArray((err,resp) => {
            if (err) return console.log("errror");
            if (resp.length == 0) {
                base.collection('users').findOneAndDelete({
                    email: req.body.email
                },(err,result)=>{
                    if(err)
                        return console.log(err);
                    //res.redirect('/');
                });
                base.collection('comments').deleteMany({
                    email: req.body.email
                },(err,result)=>{
                    if(err)
                        return console.log(err);
                    //res.redirect('/');
                });
                transporter.sendMail({
                    from: 'vakhalus.work@gmail.com',
                    to: req.body.email,
                    subject: "Видалення акаунту",
                    html: req.body.text
                }, function (err, info) {
                    if (err) {
                        return res.json({status: "error"})
                    }
                    else
                        return res.json({status:"ok"});       
                })
                res.json({status:'ok'});
            } else {
                res.send({message:"existence credits"});
            }
        });
    });
}
module.exports.deleteUser = deleteUser;