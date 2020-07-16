const {secretJWT} = require('../server.js');
const jwt = require("jsonwebtoken");

function middleware(req, res, next) {
    //next();
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return res.json({message: "Token not provided"})
    }
    const token = authHeader.replace('Bearer', '');
    try {
        jwt.verify(token, secretJWT);
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({message: "Invalid token"});
            //next(e);
        }
    }
    next();
}

module.exports.middleware = middleware; 
