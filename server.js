const express = require('express');
let multer = require('multer');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors');
const PORT = process.env.PORT || 5000;
const secretJWT = "practiceBank";
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

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}`);
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

let {startDataSet} = require("./dataSet/startDataSet.js");
let {startDataUpdate} = require("./dataUpdate/startDataUpdate.js");
let {startDataGet} = require("./dataGet/startDataGet.js");
let {startDataDelete} = require("./dataDelete/startDataDelete.js");
let {signIn} = require('./auth/sign_in.js');
let {register} = require('./auth/register.js');
const { middleware } = require('./auth/middleware.js');
const { checkUser } = require('./auth/checkUser.js');


startDataSet();
startDataUpdate();
startDataGet();
startDataDelete();

app.post("/signIn", type,  signIn);
app.post("/register", type,  register);
app.post("/checkUser", type, checkUser)



app.post('/getFile', type, (req, res) => {
    dbMongo.collection('user').find({name:'John'}).toArray((err, obj) => {
        if(err){
            res.send({status:'error'});
            return console.log('Server cannot load customer list');
        }
        obj.forEach((object => res.json(object.photo.buffer)));
    });
});
app.post('/signUp',type,(req,res)=>{
    console.log(req.body);
    res.json({'role':'user','name':'sdfsdf','surname':'sdfsfd'});
});

app.post('/verificToken',type,(req,res)=>{
    console.log(req.body);
    res.json({'role':'guest','name':'sdfsdf','surname':'sdfsfd'});
});
app.post('/verificToken2',type,(req,res)=>{
    console.log(req.body);
    res.json({'role':'user','name':'sdfsdf','surname':'sdfsfd'});
});
