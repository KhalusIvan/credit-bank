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
        let skipper;
        /*if (req.body.email === undefined || req.body.email === null) {

        } else {

        }*/
        base.collection('users').find({role: "user", is_checked: false, is_confirmed: true, credit_card: !null, phone: !null, is_passport: true}, {projection:{passport:0, avatar:0}}).sort([["email", -1]]).skip(req.body.group * req.body.number).limit(req.body.number).toArray((err,resp)=>{
            if (err) return console.log(err);
            let count = (user) => {
                return new Promise((resolve, reject) => {
                   base.collection('users_credits').find({user: user.email},{projection:{status:1}}).toArray(function(err, resp) {
                        err 
                           ? reject(err) 
                           : resolve(resp);
                      });
                });
              };
            var forLoop = async (users) => {
                let resultArray = [];
                for (let i = 0; i < users.length; i++) {
                    let all_credits = 0;
                    let active_credits = 0; 
                    let expired_credits = 0; 
                    let closed_credits = 0;
                    let result = await (count(users[i]));
                    for (let i = 0; i < result.length; i++) {
                        all_credits++;
                        if (result[i].status == "active")
                            active_credits++;
                        else if (result[i].status == "expired")
                            expired_credits++;
                        else 
                            closed_credits++;
                    }
                    let currentUser = Object.assign({}, users[i]);
                    currentUser.all_credits = all_credits;
                    currentUser.active_credits = active_credits;
                    currentUser.expired_credits = expired_credits;
                    currentUser.closed_credits = closed_credits;
                    resultArray.push(currentUser);
                }
                return resultArray;
             };

             forLoop(resp).then(function(result) {
                res.send(result);
             });
        });
    });

    app.post('/getAdminUserNotReady', type, middleware, (req, res) => {
        base.collection('users').find({role: "user", is_checked: false, is_confirmed: true, "$or": [{credit_card:null},{phone:null},{is_passport:false}]}, {projection:{passport:0, avatar:0}}).skip(req.body.group * req.body.number).limit(req.body.number).toArray((err,resp)=>{
            if (err) return console.log(err);
            let count = (user) => {
                return new Promise((resolve, reject) => {
                   base.collection('users_credits').find({user: user.email},{projection:{status:1}}).toArray(function(err, resp) {
                        err 
                           ? reject(err) 
                           : resolve(resp);
                      });
                });
              };
            var forLoop = async (users) => {
                let resultArray = [];
                for (let i = 0; i < users.length; i++) {
                    let all_credits = 0;
                    let active_credits = 0; 
                    let expired_credits = 0; 
                    let closed_credits = 0;
                    let result = await (count(users[i]));
                    for (let i = 0; i < result.length; i++) {
                        all_credits++;
                        if (result[i].status == "active")
                            active_credits++;
                        else if (result[i].status == "expired")
                            expired_credits++;
                        else 
                            closed_credits++;
                    }
                    let currentUser = Object.assign({}, users[i]);
                    currentUser.all_credits = all_credits;
                    currentUser.active_credits = active_credits;
                    currentUser.expired_credits = expired_credits;
                    currentUser.closed_credits = closed_credits;
                    resultArray.push(currentUser);
                }
                return resultArray;
             };

             forLoop(resp).then(function(result) {
                res.send(result);
             });
        });
    });

    app.post('/getAdminUsersChecked', type, middleware, (req, res) => {
        base.collection('users').find({role: "user", is_checked: true, is_confirmed: true}, {projection:{passport:0, avatar:0}}).skip(req.body.group * req.body.number).limit(req.body.number).toArray( async(err,resp)=>{
            if (err) return console.log(err);
            let count = (user) => {
                return new Promise((resolve, reject) => {
                   base.collection('users_credits').find({user: user.email},{projection:{status:1}}).toArray(function(err, resp) {
                        err 
                           ? reject(err) 
                           : resolve(resp);
                      });
                });
              };
            var forLoop = async (users) => {
                let resultArray = [];
                for (let i = 0; i < users.length; i++) {
                    let all_credits = 0;
                    let active_credits = 0; 
                    let expired_credits = 0; 
                    let closed_credits = 0;
                    let result = await (count(users[i]));
                    for (let i = 0; i < result.length; i++) {
                        all_credits++;
                        if (result[i].status == "active")
                            active_credits++;
                        else if (result[i].status == "expired")
                            expired_credits++;
                        else 
                            closed_credits++;
                    }
                    let currentUser = Object.assign({}, users[i]);
                    currentUser.all_credits = all_credits;
                    currentUser.active_credits = active_credits;
                    currentUser.expired_credits = expired_credits;
                    currentUser.closed_credits = closed_credits;
                    resultArray.push(currentUser);
                }
                return resultArray;
             };

             forLoop(resp).then(function(result) {
                res.send(result);
             });
        });
    });

    app.post('/getAdminUsersAvatarChecked', type, middleware, (req, res) => {
        base.collection('users').find({role: "user", is_checked: true, is_confirmed: true}, {projection:{avatar:1}}).skip(req.body.group * req.body.number).limit(req.body.number).toArray((err,resp)=>{
            if (err) return console.log(err);
            for (let i = 0; i < resp.length; i++) {
                if(resp[i].avatar != null)
                    resp[i].avatar = resp[i].avatar.buffer;
            }
            res.send(resp);
        });
    });

    app.post('/getAdminUsersAvatarUnchecked', type, middleware, (req, res) => {
        base.collection('users').find({role: "user", is_checked: false, is_confirmed: true, credit_card: !null, phone: !null, is_passport: true}, {projection:{avatar:1}}).skip(req.body.group * req.body.number).limit(req.body.number).toArray((err,resp)=>{
            if (err) return console.log(err);
            for (let i = 0; i < resp.length; i++) {
                if(resp[i].avatar != null)
                    resp[i].avatar = resp[i].avatar.buffer;
            }
            res.send(resp);
        });
    });

    app.post('/getAdminUserAvatarNotReady', type, middleware, (req, res) => {
        base.collection('users').find({role: "user", is_checked: false, is_confirmed: true, "$or": [{credit_card:null},{phone:null},{is_passport:false}]}, {projection:{passport:0, avatar:0}}).skip(req.body.group * req.body.number).limit(req.body.number).toArray((err,resp)=>{
            if (err) return console.log(err);
            for (let i = 0; i < resp.length; i++) {
                if(resp[i].avatar != null)
                    resp[i].avatar = resp[i].avatar.buffer;
            }
            res.send(resp);
        });
    });

    app.post('/getAdminUsersPassportUnchecked', type, middleware, (req, res) => {
        base.collection('users').find({role: "user", is_checked: false, is_confirmed: true, credit_card: !null, phone: !null, is_passport: true}, {projection:{passport:1}}).skip(req.body.group * req.body.number).limit(req.body.number).toArray((err,resp)=>{
            if (err) return console.log(err);
            for (let i = 0; i < resp.length; i++) {
                if(resp[i].passport != null)
                    resp[i].passport = resp[i].passport.buffer;
            }
            res.send(resp);
        });
    });

    app.post('/getAdminUserPassportNotReady', type, middleware, (req, res) => {
        base.collection('users').find({role: "user", is_checked: false, is_confirmed: true, "$or": [{credit_card:null},{phone:null},{is_passport:false}]}, {projection:{passport:0, avatar:0}}).skip(req.body.group * req.body.number).limit(req.body.number).toArray((err,resp)=>{
            if (err) return console.log(err);
            for (let i = 0; i < resp.length; i++) {
                if(resp[i].passport != null)
                    resp[i].passport = resp[i].passport.buffer;
            }
            res.send(resp);
        });
    });

    app.post('/getAdminUsersPassportChecked', type, middleware, (req, res) => {
        base.collection('users').find({role: "user", is_checked: true, is_confirmed: true}, {projection:{passport:1}}).skip(req.body.group * req.body.number).limit(req.body.number).toArray((err,resp)=>{
            if (err) return console.log(err);
            for (let i = 0; i < resp.length; i++) {
                if(resp[i].passport != null)
                    resp[i].passport = resp[i].passport.buffer;
            }
            res.send(resp);
        });
    });

    app.post('/getAdminUsersCountChecked', type, middleware, async (req, res) => {
        res.send({length: await base.collection('users').countDocuments({is_checked: true, role: "user", is_confirmed: true})})
    });

    app.post('/getAdminUserCountNotReady', type, middleware, async (req, res) => {
        res.send({length: await base.collection('users').countDocuments({role: "user", is_checked: false, is_confirmed: true, "$or": [{credit_card:null},{phone:null},{is_passport:false}]})});
    });

    app.post('/getAdminUsersCountUnchecked', type, middleware, async (req, res) => {
        res.send({length: await base.collection('users').countDocuments({role: "user", is_checked: false, is_confirmed: true, credit_card: !null, phone: !null, is_passport: true})})
    });
}
module.exports.getAdminUsers = getAdminUsers;