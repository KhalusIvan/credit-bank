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
        base.collection('comments').find({email: req.user.email}).toArray((err,resp)=>{
            let nowTime = new Date();
            let minutes;
            if (err) console.log("eeeeeeeeeeeeeeeeeerrrrrrrrrrrrrrrrroooooooooooooooooorrrrrrrrrrrrrrrr")
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
                                    el.date = minutes + ' років назад'
                                } else {
                                    el.date = minutes + ' місяців назад'
                                }
                            } else {
                                el.date = minutes + ' тижднів назад'
                            }
                        } else {
                            el.date = minutes + ' днів назад'
                        }
                    } else {
                        el.date = minutes + ' годин назад'
                    }
                } else {
                    el.date = minutes + ' хвилин назад'
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
            if (err) console.log("eeeeeeeeeeeeeeeeeerrrrrrrrrrrrrrrrroooooooooooooooooorrrrrrrrrrrrrrrr")
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
                                    el.date = minutes + ' років назад'
                                } else {
                                    el.date = minutes + ' місяців назад'
                                }
                            } else {
                                el.date = minutes + ' тижднів назад'
                            }
                        } else {
                            el.date = minutes + ' днів назад'
                        }
                    } else {
                        el.date = minutes + ' годин назад'
                    }
                } else {
                    el.date = minutes + ' хвилин назад'
                }
                return el;
            })
            res.send(resp);
        });
    });
}
module.exports.getComments = getComments;