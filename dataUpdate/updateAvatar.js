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
function updateAvatar(){
    app.post('/updateAvatar', middleware, type, (req, res) => {
        let avatar = req.file.buffer;
        base.collection('users').findOneAndUpdate({
            email : req.user.email
        }, { $set: {
            avatar: avatar
            }      
        });
        console.log("uuuuu")
        res.send({status:'ok'});
    });
}
module.exports.updateAvatar = updateAvatar;
