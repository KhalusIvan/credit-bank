const express = require('express');
require('dotenv').config()
let multer = require('multer');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors');
const PORT = process.env.PORT || 5000;
console.log(process.env.SECRETJWT)
const secretJWT = process.env.SECRETJWT;
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
module.exports.app = app;
module.exports.secretJWT = secretJWT;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let upload = multer();
var type = upload.single('file');
module.exports.type = type;

var dbMongo;
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect(process.env.MONGOURI, function (err, client) {
    if (err)
        return console.log(err);
    dbMongo = client.db('Credit_bank');
    module.exports.db = dbMongo;
   
});

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAILUSER,
        pass: process.env.EMAILPASS
    }
})
module.exports.transporter = transporter;


app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}`);
});

const { middleware } = require('./auth/middleware.js');

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
});



  app.get('/confirmation/:token', async (req, res) => {
    let userToConfirm;
    try {
        userToConfirm = jwt.verify(req.params.token, secretJWT);
        await dbMongo.collection('users').findOneAndUpdate({
            email : userToConfirm.email
        }, { $set: {
            is_confirmed: true
            }      
        });
    } catch (e) {
      res.send('error');
    }
    const token = jwt.sign({email:userToConfirm.email, role:"user"}, secretJWT, {expiresIn: "1d"});
    return res.redirect(`https://credit-bank-practice-front.herokuapp.com/abd/${token}`);
  });

  app.get('/resetPassword/:token', (req, res) => {
    let userToConfirm;
    try {
        userToConfirm = jwt.verify(req.params.token, secretJWT);
        bcrypt.hash(userToConfirm.password, 10, function(err, hash) {
            dbMongo.collection('users').findOneAndUpdate({
                email : userToConfirm.email
            }, { $set: {
                password: hash
                }      
            });
            dbMongo.collection('admin').findOneAndUpdate({
                email : userToConfirm.email
            }, { $set: {
                password: hash
                }      
            });
        });
    } catch (e) {
      res.send('error');
    }
    return res.redirect(`https://credit-bank-practice-front.herokuapp.com/`);
  });

const {startDataSet} = require("./dataSet/startDataSet.js");
const {startDataUpdate} = require("./dataUpdate/startDataUpdate.js");
const {startDataGet} = require("./dataGet/startDataGet.js");
const {startDataDelete} = require("./dataDelete/startDataDelete.js");
const {signIn} = require('./auth/sign_in.js');
const {register} = require('./auth/register.js');
const {checkUser} = require('./auth/checkUser.js');
const {resetPassword} = require('./auth/reserPassword.js');
const {updateFine} = require('./dataUpdate/updateFine.js');
const {writeEmail} = require('./write_email.js');



startDataSet();
startDataUpdate();
startDataGet();
startDataDelete();
writeEmail();

console.log(111)

app.post("/signIn", type,  signIn);
app.post("/register", type,  register);
app.post("/checkUser", type, checkUser);
app.post("/resetPassword", type, resetPassword);
