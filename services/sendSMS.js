const accountSid = 'ACee13438e48b18538391e7d974e49bf78';
const authToken = '79d862a3e0371c1cb5ca1e093adaa632';
const client = require('twilio')(accountSid, authToken);

function sendSMS(message) {
    client.messages.create({
        body: message,
        from: '+16476962871',
        to: '+18199184407'
   }).then(message => console.log(message.sid))
  .done(something => console.log('sms done!'));
}

module.exports = sendSMS;