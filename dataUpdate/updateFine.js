let {app} = require('../server.js');
let {type} = require('../server.js');
const { middleware } = require('../auth/middleware.js');
var base;
setTimeout(function run() {
    if(base) return;
    var {db} = require('../server.js');
    base = db;
    setTimeout(run, 500);
}, 100);
function updateFine(){ 
    let now = new Date();
    setTimeout(() => {
        base.collection('users_credits').find().toArray((err,resp)=>{
            if (err) return console.log(err);
            for (let i = 0; i < resp.length; i++) {
                if (resp[i].status == "active" || resp[i].status == "expired") {
                    resp[i].end_date = new Date(resp[i].end_date);
                    if (now > resp[i].end_date) {
                        let new_fine = resp[i].value / 100 * resp[i].percent * 2 + resp[i].fine;
                        base.collection('users_credits').findOneAndUpdate({
                            id : resp[i].id
                        }, { $set: {
                            fine: new_fine,
                            status: "expired"
                            }      
                        });
                    }
                }
            }
        });
        
    },1000)
    
}
module.exports.updateFine = updateFine;

