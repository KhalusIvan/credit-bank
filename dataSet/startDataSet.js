let {setComment} = require('./setComment.js');
let {setUserCredit} = require('./setUserCredit.js');
let {setCreditType} = require('./setCreditType.js');
let {setAdmin} = require('./setAdmin.js');
function startDataSet() {
    setComment();
    setUserCredit();
    setCreditType();
    setAdmin();
}
module.exports.startDataSet = startDataSet;