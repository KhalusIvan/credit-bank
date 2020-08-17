let {app} = require('../server.js');
let {type} = require('../server.js');
let {middleware} = require('../auth/middleware.js');
let bcrypt = require('bcrypt');
var base;
setTimeout(function run() {
    if(base) return;
    var {db} = require('../server.js');
    base = db;
    setTimeout(run, 500);
}, 100);
function setComment(){
    app.post('/setComment', middleware, type, async (req, res) => {
        if (req.user.role == "user") {
            base.collection('comments').find({email: req.user.email}, {projection:{avatar:0, name:0}}).toArray((err,resp)=>{
                console.log(resp.length);
                if (resp.length >= 5) {
                    return res.json({status: "limit"})
                } else {
                    let date = new Date();
                    let commentsItem;
                    let avatar = req.file.buffer;
                    let hashString = req.body.email + date.toString();
                    bcrypt.genSalt(10, function(err, salt) {
                        bcrypt.hash(hashString, salt, async function(err, hash) {
                            base.collection('comments').insertOne({
                                "name": req.body.name,
                                "avatar": avatar,
                                "text": req.body.text,
                                "date": date,
                                "email": req.user.email,
                                "id": hash
                            },(err,result)=>{
                                if(err)
                                    return console.log(err);
                            }); 
                            commentsItem = {
                                "name": req.body.name,
                                "avatar": avatar,
                                "text": req.body.text,
                                "date": "now",
                                "email": req.body.email,
                                "id": hash
                            }
                            res.send(commentsItem);

                        });
                    });
                }
            });
        } else {
            return res.json({status: "error"})
        }
    });
}
module.exports.setComment = setComment;