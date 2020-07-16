let {updateAvatar} = require('./updateAvatar.js');
let {updatePassport} = require('./updatePassport.js');
let {updatePhone} = require('./updatePhone.js');
const {updateCreditCard} = require('./updateCreditCard.js');
const {updateComments} = require('./updateComments.js');
function startDataUpdate() {
    updateAvatar();
    updatePassport();
    updatePhone();
    updateCreditCard();
    updateComments();
}
module.exports.startDataUpdate = startDataUpdate;