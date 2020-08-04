let {app} = require('../server.js');
let {type} = require('../server.js');
let {middleware} = require('../auth/middleware.js');
var base;
setTimeout(function run() {
    if(base) return;
    var {db} = require('../server.js');
    base = db;
    setTimeout(run, 500);
}, 100);
function getAdminUsers(){
    app.post('/getAdminUsers', type, middleware, (req, res) => {
        base.collection('users').find({}).skip(20).limit(5).toArray((err,resp)=>{
            if (err) return console.log(err);
            for (let i = 0; i < resp.length; i++) {
                if(resp[i].avatar != null)
                    resp[i].avatar = resp[i].avatar.buffer;
                if(resp[i].passport != null)
                    resp[i].passport = resp[i].passport.buffer;
            }
            res.send(resp);
        });
    });

    app.post('/getAdminUsersCount', type, middleware, async (req, res) => {
        res.send({length: await base.collection('users').countDocuments()})
    });
}
module.exports.getAdminUsers = getAdminUsers;