let {deleteComment} = require('./deleteComment.js');
let {deleteAvatar} = require('./deleteAvatar.js');
let {deleteUser} = require('./deleteUser.js');
function startDataDelete() {
    deleteComment();
    deleteAvatar();
    deleteUser();
}
module.exports.startDataDelete = startDataDelete;