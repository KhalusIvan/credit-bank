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
        let date = new Date();
        let commentsItem;
        let avatar = req.file.buffer;
        console.log(11111111111);
        console.log(req.avatar);
        //let avatarFromUser;
        let hashString = req.body.email + date.toString();
        /*base.collection('users').find({email: req.user.email}).toArray((err,resp)=>{
            if (err) console.log("eeeeeeeeeeeeeeeeeerrrrrrrrrrrrrrrrroooooooooooooooooorrrrrrrrrrrrrrrr")
            let user = Object.assign({}, resp[0]);
            if(user.avatar != null)
                user.avatar = user.avatar.buffer;
            res.send(user);
        });*/
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
                    //res.redirect('/');
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

    });
}
module.exports.setComment = setComment;