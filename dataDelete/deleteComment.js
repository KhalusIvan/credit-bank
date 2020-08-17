const {app, type} = require('../server.js');
const { middleware } = require('../auth/middleware.js');
var base;
setTimeout(function run() {
    if(base) return;
    var {db} = require('../server.js');
    base = db;
    setTimeout(run, 500);
}, 100);
function deleteComment(){
    app.post('/deleteComment', type, middleware, (req, res) => {
        if (req.user.role == "user") {
            base.collection('comments').findOneAndDelete({
                id : req.body.id,
                email: req.user.email
            },(err,result)=>{
                if(err)
                    return console.log(err);
                //res.redirect('/');
            });
            res.json({status:'ok'});
        } else {
            return res.json({status: "error"})
        }
    });
}
module.exports.deleteComment = deleteComment;