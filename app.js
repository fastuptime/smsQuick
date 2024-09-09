const axios = require('axios');

/*
Soon;

- TeleSign
- Amazon SNS
- Plivo
- Sendinblue

*/

function netgsm(options) {
    
    return {
        send: async function (data) {
            let { header, username, password } = options;
            if (!header || !username || !password) {
                return { status: false, message: 'Missing parameters' };
            }

            if (!data.to || !data.message) {
                return { status: false, message: 'Missing parameters' };
            }

            let url = `https://api.netgsm.com.tr/sms/send/get?usercode=${username}&password=${password}&gsmno=${data.to}&message=${data.message}&msgheader=${header}`;
            url = encodeURI(url);

            try {
                let response = await axios.get(url);
                if (response.data?.status?.startsWith('00')) {
                    return { status: true, message: 'SMS sent successfully' };
                } else {
                    return { status: false, message: 'SMS could not be sent' };
                }
            } catch (error) {
                return { status: false, message: 'SMS could not be sent' };
            }
        }
    }
}

function twilio(options) {
    
    return {
        send: async function (data) {
            let { accountSid, authToken, from } = options;
            if (!accountSid || !authToken || !from) {
                return { status: false, message: 'Missing parameters' };
            }

            if (!data.to || !data.message) {
                return { status: false, message: 'Missing parameters' };
            }

            try {
                if (!from.startsWith('+')) {
                    from = `+${from}`;
                }

                if (!data.to.startsWith('+')) {
                    data.to = `+${data.to}`;
                }

                const client = require('twilio')(accountSid, authToken);

                let response = await client.messages.create({
                    body: data.message,
                    from: from,
                    to: data.to
                });

                if (response.sid) {
                    return { status: true, message: 'SMS sent successfully' };
                } else {
                    return { status: false, message: 'SMS could not be sent' };
                }
            } catch (error) {
                return { status: false, message: 'SMS could not be sent' };
            }
        }
    }
}

function iletimerkezi(options) {
    return {
        send: async function (data) {
            let { apiKey, apiHash, from } = options;
            if (!apiKey || !apiHash || !from) {
                return { status: false, message: 'Missing parameters' };
            }

            if (!data.to || !data.message) {
                return { status: false, message: 'Missing parameters' };
            }

            let url = `https://api.iletimerkezi.com/v1/send-sms/get/?key=${apiKey}&hash=${apiHash}&text=${data.message}&receipents=${data.to}&sender=${from}`;
            url = encodeURI(url);

            try {
                let response = await axios.get(url);
                console.log(response.data);
                if (response.data?.status === 'success') {
                    return { status: true, message: 'SMS sent successfully' };
                } else {
                    return { status: false, message: 'SMS could not be sent' };
                }
            } catch (error) {
                console.log(error);
                return { status: false, message: 'SMS could not be sent' };
            }
        }
    }
}

function vatansms(options) {
    return {
        send: async function (data) {
            let { apiId, apiKey, sender } = options;
            if (!apiId || !apiKey || !sender) {
                return { status: false, message: 'Missing parameters' };
            }

            if (!data.to || !data.message) {
                return { status: false, message: 'Missing parameters' };
            }

            let phones = data.to.split(',');

            var data = JSON.stringify({
                "api_id": apiId,
                "api_key": apiKey,
                "sender": sender,
                "message_type": "normal",
                "message": data.message,
                "message_content_type": "bilgi",
                "phones": phones
            });

            var config = {
                method: 'post',
                url: 'https://api.vatansms.net/api/v1/1toN',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: data
            };

            try {
                let response = await axios(config);
                if (response.data?.status === 'success') {
                    return { status: true, message: 'SMS sent successfully' };
                } else {
                    return { status: false, message: 'SMS could not be sent' };
                }
            } catch (error) {
                return { status: false, message: 'SMS could not be sent' };
            }
        }
    }
}

function vonage(options) {
    return {
        send: async function (data) {
            let { apiKey, apiSecret, from } = options;
            if (!apiKey || !apiSecret || !from) {
                return { status: false, message: 'Missing parameters' };
            }

            if (!data.to || !data.message) {
                return { status: false, message: 'Missing parameters' };
            }

            const { Vonage } = require('@vonage/server-sdk')

            const vonage = new Vonage({
                apiKey: apiKey,
                apiSecret: apiSecret
            });

            try {

                let send = await vonage.sms.send({ from: from, to: data.to, text: data.message });
                if (send.messages[0]['status'] === '0') {
                    return { status: true, message: 'SMS sent successfully' };
                } else {
                    return { status: false, message: 'SMS could not be sent' };
                }
            } catch (e) {
                return { status: false, message: 'SMS could not be sent' };
            }
        }
    }
}


module.exports = function () {
    return {
        init: function (options) {
            this.options = options;
        },
        send: function (data) {
            switch (this.options.provider.toLowerCase()) {
                case 'netgsm':
                    return netgsm(this.options).send(data);
                case 'twilio':
                    return twilio(this.options).send(data);
                case 'iletimerkezi':
                    return iletimerkezi(this.options).send(data);
                case 'vatansms':
                    return vatansms(this.options).send(data);
                case 'vonage':
                    return vonage(this.options).send(data);
                default:
                    return { status: false, message: 'Provider not found' };
            }
        }
    }
}();