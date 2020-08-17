let {app} = require('./server.js');
let {type} = require('./server.js');
let {middleware} = require('./auth/middleware.js');
const {transporter} = require('./server.js');
function writeEmail () {
    app.post('/writeEmail', type, middleware, (req, res) => {
        if (req.user.role == "admin") {
            transporter.sendMail({
                from: 'vakhalus.work@gmail.com',
                to: req.body.email,
                subject: "Повідомлення від UkrainCredit",
                html: req.body.text
            }, function (err, info) {
                if (err) {
                    return res.json({status: "error"})
                }
                else
                    return res.json({status:"ok"});       
            })
        } else {
            return res.json({status: "error"})
        }
        
    });
}

module.exports.writeEmail = writeEmail;