let {getData} = require('./getData.js');
let {getComments} = require('./getComments.js');
let {getCreditsTypes} = require('./getCreditsTypes.js');
let {getUsersCredits} = require('./getUsersCredits.js');
function startDataGet() {
    getData();
    getComments();
    getCreditsTypes();
    getUsersCredits();
}
module.exports.startDataGet = startDataGet;