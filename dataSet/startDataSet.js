let {setComment} = require('./setComment.js');
let {setUserCredit} = require('./setUserCredit.js');
function startDataSet() {
    setComment();
    setUserCredit();
}
module.exports.startDataSet = startDataSet;