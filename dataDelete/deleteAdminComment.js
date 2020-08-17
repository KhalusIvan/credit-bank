const {app, type} = require('../server.js');
const { middleware } = require('../auth/middleware.js');
var base;
setTimeout(function run() {
    if(base) return;
    var {db} = require('../server.js');
    base = db;
    setTimeout(run, 500);
}, 100);
function deleteAdminComment(){
    app.post('/deleteAdminComment', type, middleware, (req, res) => {
        base.collection('comments').findOneAndDelete({
            id : req.body.id,
        },(err,result)=>{
            if(err)
                return console.log(err);
            //res.redirect('/');
        });
        res.json({status:'ok'});
    });
}
module.exports.deleteAdminComment = deleteAdminComment;