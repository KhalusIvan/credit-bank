const {app, type} = require('../server.js');
const { middleware } = require('../auth/middleware.js');
var base;
setTimeout(function run() {
    if(base) return;
    var {db} = require('../server.js');
    base = db;
    setTimeout(run, 500);
}, 100);
function deleteCreditType(){
    app.post('/deleteCreditType', type, middleware, (req, res) => {
        if (req.user.role == "admin") {
            base.collection('credit_types').findOneAndDelete({
                id : req.body.id
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
module.exports.deleteCreditType = deleteCreditType;