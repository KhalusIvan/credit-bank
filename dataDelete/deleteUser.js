const {app, type} = require('../server.js');
const { middleware } = require('../auth/middleware.js');
var base;
setTimeout(function run() {
    if(base) return;
    var {db} = require('../server.js');
    base = db;
    setTimeout(run, 500);
}, 100);
function deleteUser(){
    app.post('/deleteUser', type, middleware, (req, res) => {
        base.collection('users').findOneAndDelete({
            email: req.user.email
        },(err,result)=>{
            if(err)
                return console.log(err);
            //res.redirect('/');
        });
        res.json({status:'ok'});
    });
}
module.exports.deleteUser = deleteUser;