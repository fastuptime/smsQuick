let smsQuick = require('./app');

smsQuick.init({
    provider: 'vonage', // netgsm, twilio, iletimerkezi, vatansms, vonage
    apiKey: '',
    apiSecret: '',
    from: ''
});

(async () => {
    let response = await smsQuick.send({ to: 'Number', message: 'Hello' });
    console.log(response); // { status: 'success', message: 'SMS sent successfully' } veya { status: 'error', message: 'SMS could not be sent' }
})();