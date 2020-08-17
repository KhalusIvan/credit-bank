let {setComment} = require('./setComment.js');
let {setUserCredit} = require('./setUserCredit.js');
let {setCreditType} = require('./setCreditType.js');
function startDataSet() {
    setComment();
    setUserCredit();
    setCreditType();
}
module.exports.startDataSet = startDataSet;