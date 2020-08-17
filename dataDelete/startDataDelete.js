let {deleteComment} = require('./deleteComment.js');
let {deleteAvatar} = require('./deleteAvatar.js');
let {deleteUser} = require('./deleteUser.js');
let {deleteAdminComment} = require('./deleteAdminComment.js');
function startDataDelete() {
    deleteComment();
    deleteAvatar();
    deleteUser();
    deleteAdminComment();
}
module.exports.startDataDelete = startDataDelete;