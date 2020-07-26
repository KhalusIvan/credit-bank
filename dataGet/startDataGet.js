let {getData} = require('./getData.js');
let {getComments} = require('./getComments.js');
let {getCreditsTypes} = require('./getCreditsTypes.js');
let {getUsersActiveCredits} = require('./getUsersActiveCredits.js');
let {getUserFinishedCredits} = require('./getUserFinishedCredits.js');
function startDataGet() {
    getData();
    getComments();
    getCreditsTypes();
    getUsersActiveCredits();
    getUserFinishedCredits();
}
module.exports.startDataGet = startDataGet;