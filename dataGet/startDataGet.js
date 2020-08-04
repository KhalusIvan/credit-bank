let {getData} = require('./getData.js');
let {getComments} = require('./getComments.js');
let {getCreditsTypes} = require('./getCreditsTypes.js');
let {getUsersCredits} = require('./getUsersCredits.js');
let {getAdminUsers} = require('./getAdminUsers.js');
function startDataGet() {
    getData();
    getComments();
    getCreditsTypes();
    getUsersCredits();
    getAdminUsers();
}
module.exports.startDataGet = startDataGet;