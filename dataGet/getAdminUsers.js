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
    app.post('/getAdminUserUnchecked', type, middleware, (req, res) => {
        base.collection('users').find({role: "user", is_checked: false}, {projection:{passport:0, avatar:0}}).skip(req.body.group * req.body.number).limit(req.body.number).toArray((err,resp)=>{
            if (err) return console.log(err);
            res.send(resp);
        });
    });

    app.post('/getAdminUsersChecked', type, middleware, (req, res) => {
        base.collection('users').find({role: "user", is_checked: true}, {projection:{passport:0, avatar:0}}).skip(req.body.group * req.body.number).limit(req.body.number).toArray((err,resp)=>{
            if (err) return console.log(err);
            res.send(resp);
        });
    });

    app.post('/getAdminUsersAvatarChecked', type, middleware, (req, res) => {
        base.collection('users').find({role: "user", is_checked: true}, {projection:{avatar:1}}).skip(req.body.group * req.body.number).limit(req.body.number).toArray((err,resp)=>{
            if (err) return console.log(err);
            for (let i = 0; i < resp.length; i++) {
                if(resp[i].avatar != null)
                    resp[i].avatar = resp[i].avatar.buffer;
            }
            res.send(resp);
        });
    });

    app.post('/getAdminUsersAvatarUnchecked', type, middleware, (req, res) => {
        base.collection('users').find({role: "user", is_checked: false}, {projection:{avatar:1}}).skip(req.body.group * req.body.number).limit(req.body.number).toArray((err,resp)=>{
            if (err) return console.log(err);
            for (let i = 0; i < resp.length; i++) {
                if(resp[i].avatar != null)
                    resp[i].avatar = resp[i].avatar.buffer;
            }
            res.send(resp);
        });
    });

    app.post('/getAdminUsersPassportChecked', type, middleware, (req, res) => {
        base.collection('users').find({role: "user", is_checked: true}, {projection:{passport:1}}).skip(req.body.group * req.body.number).limit(req.body.number).toArray((err,resp)=>{
            if (err) return console.log(err);
            for (let i = 0; i < resp.length; i++) {
                if(resp[i].passport != null)
                    resp[i].passport = resp[i].passport.buffer;
            }
            res.send(resp);
        });
    });

    app.post('/getAdminUsersPassportUnchecked', type, middleware, (req, res) => {
        base.collection('users').find({role: "user", is_checked: false}, {projection:{passport:1}}).skip(req.body.group * req.body.number).limit(req.body.number).toArray((err,resp)=>{
            if (err) return console.log(err);
            for (let i = 0; i < resp.length; i++) {
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