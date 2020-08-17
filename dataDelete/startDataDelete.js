let {deleteComment} = require('./deleteComment.js');
let {deleteAvatar} = require('./deleteAvatar.js');
let {deleteUser} = require('./deleteUser.js');
let {deleteAdminComment} = require('./deleteAdminComment.js');
let {deleteCreditType} = require('./deleteCreditType.js');
function startDataDelete() {
    deleteComment();
    deleteAvatar();
    deleteUser();
    deleteAdminComment();
    deleteCreditType();
}
module.exports.startDataDelete = startDataDelete;