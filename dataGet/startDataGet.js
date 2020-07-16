let {getData} = require('./getData.js');
let {getComments} = require('./getComments.js');
function startDataGet() {
    getData();
    getComments();
}
module.exports.startDataGet = startDataGet;