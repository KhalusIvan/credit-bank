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
function getComments(){
    app.post('/getUserComments', type, middleware, (req, res) => {
        base.collection('comments').find({email: req.user.email}, {projection:{avatar:0, name:0}}).toArray((err,resp)=>{
            let nowTime = new Date();
            let minutes;
            if (err) return console.log(err);
            resp.sort(function(a,b) {
                return b.date - a.date;
            })
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
    app.post('/getAllComments', type, (req, res) => {
        base.collection('comments').find().toArray((err,resp)=>{
            let nowTime = new Date();
            let minutes;
            if (err) return console.log(err)
            resp.sort(function(a,b) {
                return b.date - a.date;
            })
            // left only first 8 comments
            resp.splice(8, resp.length);
            let comments = resp.map(el => {
                if(el.avatar != null)
                    el.avatar = el.avatar.buffer;
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
}
module.exports.getComments = getComments;