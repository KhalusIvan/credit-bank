let {getUsers} = require('./getUsers.js');
let {getData} = require('./getData.js');
function startDataGet() {
    getUsers();
    getData();
}
module.exports.startDataGet = startDataGet;