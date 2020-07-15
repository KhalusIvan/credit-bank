let {app} = require('../server.js');
let {type} = require('../server.js');
var base;
setTimeout(function run() {
    if(base) return;
    var {db} = require('../server.js');
    base = db;
    setTimeout(run, 500);
}, 100);
function updateAvatar(){
    app.post('/updateAvatar', type, (req, res) => {
        let avatar = req.file.buffer;
        base.collection('users').findOneAndUpdate({
            token : req.body.token
        }, { $set: {
            avatar: avatar
            }      
        });
        res.send({status:'ok'});
    });
}
module.exports.updateAvatar = updateAvatar;
