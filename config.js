// system environment variables (so we don't check them in to source control!)
module.exports = {
    // Twilio Account SID
    accountSid: process.env.TWILIO_ACCOUNT_SID,

    // Twilio Auth Token
    authToken: process.env.TWILIO_AUTH_TOKEN,

    // A Twilio number 
    // in format: XXXXXXXXXX
    // does not include +1 at beginning of number
    twilioNumber: process.env.TWILIO_NUMBER,

    // The port your web application will run on
    // currently not configured, will run on 3000
    port: process.env.PORT || 3000,

    // Twilio Application Sid specific to Trillio
    applicationSid: 'APe0baa70d53b02db6fee331a57618da57'
};