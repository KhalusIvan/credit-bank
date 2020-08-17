let {getData} = require('./getData.js');
let {getComments} = require('./getComments.js');
let {getCreditsTypes} = require('./getCreditsTypes.js');
let {getUsersCredits} = require('./getUsersCredits.js');
let {getAdminUsers} = require('./getAdminUsers.js');
let {getAdminComments} = require('./getAdminComments.js');
function startDataGet() {
    getData();
    getComments();
    getCreditsTypes();
    getUsersCredits();
    getAdminUsers();
    getAdminComments();
}
module.exports.startDataGet = startDataGet;