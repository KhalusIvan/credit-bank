let {getUsers} = require('./getUsers.js');
function startDataGet() {
    getUsers();
}
module.exports.startDataGet = startDataGet;