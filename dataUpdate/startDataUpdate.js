let {updateAvatar} = require('./updateAvatar.js');
let {updatePassport} = require('./updatePassport.js');
let {updatePhone} = require('./updatePhone.js');
const {updateCreditCard} = require('./updateCreditCard.js');
const {updateComments} = require('./updateComments.js');
const {updateName} = require('./updateName.js');
const {updatePassword} = require('./updatePassword.js');
const {updateCreditPaid} = require('./updateCreditPaid.js');
const {checkUserAgree} = require('./checkUserAgree.js');
function startDataUpdate() {
    updateAvatar();
    updatePassport();
    updatePhone();
    updateCreditCard();
    updateComments();
    updateName();
    updatePassword();
    updateCreditPaid();
    checkUserAgree();
}
module.exports.startDataUpdate = startDataUpdate;