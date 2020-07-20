const express = require('express');
let multer = require('multer');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors');
const PORT = process.env.PORT || 5000;
const secretJWT = "practiceBank";
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");
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

MongoClient.connect('mongodb+srv://vania:Hfqyscf10f@cluster0.k1jws.mongodb.net/<dbname>?retryWrites=true&w=majority', function (err, client) {
    if (err)
        return console.log(err);
    dbMongo = client.db('Credit_bank');
    module.exports.db = dbMongo;
   
});

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "vakhalus.work@gmail.com",
        pass: "YDRk.,bcnjr"
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
    //localStorage.setItem("token", token);
    return res.redirect(`https://bodyapracqweqwe.herokuapp.com/abd/${token}`);
  });

let {startDataSet} = require("./dataSet/startDataSet.js");
let {startDataUpdate} = require("./dataUpdate/startDataUpdate.js");
let {startDataGet} = require("./dataGet/startDataGet.js");
let {startDataDelete} = require("./dataDelete/startDataDelete.js");
let {signIn} = require('./auth/sign_in.js');
let {register} = require('./auth/register.js');
const { checkUser } = require('./auth/checkUser.js');


startDataSet();
startDataUpdate();
startDataGet();
startDataDelete();

app.post("/signIn", type,  signIn);
app.post("/register", type,  register);
app.post("/checkUser", type, checkUser)
