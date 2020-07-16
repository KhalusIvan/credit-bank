const {secretJWT} = require('../server.js');
const jwt = require("jsonwebtoken");

function checkUser(req, res){
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return res.json({message: "Token not provided"})
    }
    const token = authHeader.replace('Bearer ', '');
    let currentUser;
    try {
        currentUser = jwt.verify(token, secretJWT);
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({role: "guest"});
            //next(e);
        }
    }
    res.json({role: currentUser.role});
}
module.exports.checkUser = checkUser;