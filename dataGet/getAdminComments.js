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
function getAdminComments(){
    app.post('/getAdminComments', type, middleware, (req, res) => {
        var checkSkipperInBase = (lastItem) => {
            return new Promise((resolve, reject) => {
                base.collection('comments').find({},{projection:{avatar:0}}).sort({_id:-1}).toArray((err,resp) => {
                    for (let j = 0; j < resp.length; j++) {
                        if (resp[j].id == lastItem) {
                            let skipper = j + 1;
                            resolve(skipper);
                            break;
                        }
                    }
                })
            })
        }
        var skipperCount = async () => {
            let skipper = 0;
            if (req.body.group != 0) {
                for (let i = req.body.group - 1; i >= 0; i--) {
                    if (req.body.lastItems[i] != null && req.body.lastItems[i] != "noItems") {
                        let skipperEmail = await (checkSkipperInBase(req.body.lastItems[i]));
                        skipperEmail += skipper;
                        return skipperEmail;
                    } else if (req.body.lastItems[i] == null) {
                        skipper += req.body.number;
                    }
                }
            }
            return skipper;
        }
        skipperCount().then(function(resSkip) {
            let skipper = resSkip;
            base.collection('comments').find({},{projection:{avatar:0}}).sort({_id:-1}).skip(skipper).limit(req.body.number).toArray((err,resp)=>{
                let nowTime = new Date();
                let minutes;
                if (err) return console.log(err)
                let comments = resp.map(el => {
                    minutes = Math.ceil(Math.abs(nowTime.getTime() - el.date.getTime())/ (1000 * 60));
                    if (minutes > 60) {
                        minutes = Math.ceil(minutes / 60);
                        if (minutes > 24) {
                            minutes = Math.ceil(minutes / 24);
                            if (minutes > 7) {
                                minutes = Math.ceil(minutes / 7);
                                if (minutes > 4) {
                                    minutes = Math.ceil(minutes / 4);
                                    if (minutes > 12) {
                                        minutes = Math.ceil(minutes / 12);
                                        el.date_ua = minutes + ' років назад';
                                        el.date_en = minutes + ' years ago';
                                    } else {
                                        el.date_ua = minutes + ' місяців назад';
                                        el.date_en = minutes + ' months ago';
                                    }
                                } else {
                                    el.date_ua = minutes + ' тижднів назад';
                                    el.date_en = minutes + ' weeks ago';
                                }
                            } else {
                                el.date_ua = minutes + ' днів назад';
                                el.date_en = minutes + ' days ago';
                            }
                        } else {
                            el.date_ua = minutes + ' годин назад';
                            el.date_en = minutes + ' hours ago';
                        }
                    } else {
                        el.date_ua = minutes + ' хвилин назад';
                        el.date_en = minutes + ' minutes ago';
                    }
                    return el;
                })
                res.send(comments);
            });
        });
    });

    app.post('/getAdminCommentsAvatar', type, middleware, (req, res) => {
        var checkSkipperInBase = (lastItem) => {
            return new Promise((resolve, reject) => {
                base.collection('comments').find({},{projection:{avatar:1}}).sort({_id:-1}).toArray((err,resp) => {
                    for (let j = 0; j < resp.length; j++) {
                        if (resp[j].id == lastItem) {
                            let skipper = j + 1;
                            resolve(skipper);
                            break;
                        }
                    }
                })
            })
        }
        var skipperCount = async () => {
            let skipper = 0;
            if (req.body.group != 0) {
                for (let i = req.body.group - 1; i >= 0; i--) {
                    if (req.body.lastItems[i] != null && req.body.lastItems[i] != "noItems") {
                        let skipperEmail = await (checkSkipperInBase(req.body.lastItems[i]));
                        skipperEmail += skipper;
                        return skipperEmail;
                    } else if (req.body.lastItems[i] == null) {
                        skipper += req.body.number;
                    }
                }
            }
            return skipper;
        }
        skipperCount().then(function(resSkip) {
            let skipper = resSkip;
            base.collection('comments').find({},{projection:{avatar:1}}).sort({_id:-1}).skip(skipper).limit(req.body.number).toArray((err,resp)=>{
                if (err) return console.log(err)
                let comments = resp.map(el => {
                    if(el.avatar != null)
                        el.avatar = el.avatar.buffer;
                    return el;
                })
                res.send(comments);
            });
        });
    });

    app.post('/getAdminCommentsCount', type, middleware, async (req, res) => {
        res.send({length: await base.collection('comments').countDocuments()})
    });
}
module.exports.getAdminComments = getAdminComments;