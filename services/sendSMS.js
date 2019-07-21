const accountSid = process.env.TWILIO_ID;
const authToken = process.env.TWILIO_TOKEN;
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
