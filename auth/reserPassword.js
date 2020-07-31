let {secretJWT} = require('../server.js');
const {transporter} = require('../server.js');
const jwt = require("jsonwebtoken");
function resetPassword(req, res){
    let new_password = "";
    while (new_password.length < 9) 
        new_password += Math.random().toString(36).substring(2);
    new_password = new_password.substring(0, 9);
    jwt.sign(
        {
          email: req.body.email,
          password: new_password
        },
        secretJWT,
        {
          expiresIn: '1h',
        }, (err, emailToken) => {
            const url = `http://credit-bank-practice.herokuapp.com/resetPassword/${emailToken}`;
            transporter.sendMail({
                from: 'vakhalus.work@gmail.com',
                to: req.body.email,
                subject: "Підтвердження зміни пароля",
                html: `Ваш новий пароль ${new_password} </br> Будь ласка перейдіть за <a href="${url}">даним посиланням</a>  щоб підтвердити зміну паролю.`
            }, function (err, info) {
                if (err) {
                    console.log(err);
                    return res.json({status: "error"})
                }
                else
                    return res.json({status:"ok"});       
            })
        })
}
module.exports.resetPassword = resetPassword;