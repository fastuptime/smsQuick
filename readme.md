# 📦 `smsQuick` - Multi-Provider SMS Sending Library

`**smsQuick**` simplifies integration with various SMS providers for Node.js applications. This library allows you to send SMS messages quickly and efficiently with just a few lines of code.

## 📋 Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Supported Providers](#supported-providers)
- [Example Usage](#example-usage)
- [Response Formats](#response-formats)
- [Troubleshooting](#troubleshooting)
- [Contributors](#contributors)
- [License](#license)

---

## 📦 Installation

Add `smsquick` to your project using npm:

```bash
npm install smsquick
```

---

## 🛠 Usage

### 1. Import the Library

```javascript
const smsQuick = require('smsquick');
```

### 2. Configure the Provider

Here's how you can configure the `twilio` provider:

```javascript
const sms = smsQuick.init({
    provider: 'twilio', // Supported providers: netgsm, twilio, iletimerkezi, vatansms, vonage
    accountSid: 'your_account_sid',
    authToken: 'your_auth_token',
    from: 'your_phone_number'
});
```

### 3. Send an SMS

```javascript
sms.send({
    to: 'recipient_phone_number',
    message: 'Hello, this is a test message!'
}).then(response => {
    console.log(response); // { status: true, message: 'SMS sent successfully' }
}).catch(error => {
    console.error(error); // Error handling
});
```

---

## 🗂 Supported Providers

### 1. **Netgsm**

- **URL**: `https://api.netgsm.com.tr/sms/send/get`
- **Required Parameters**: `header`, `username`, `password`

### 2. **Twilio**

- **URL**: Twilio API
- **Required Parameters**: `accountSid`, `authToken`, `from`

### 3. **Iletimerkezi**

- **URL**: `https://api.iletimerkezi.com/v1/send-sms/get/`
- **Required Parameters**: `apiKey`, `apiHash`, `from`

### 4. **Vatansms**

- **URL**: `https://api.vatansms.net/api/v1/1toN`
- **Required Parameters**: `apiId`, `apiKey`, `sender`

### 5. **Vonage**

- **URL**: Vonage API
- **Required Parameters**: `apiKey`, `apiSecret`, `from`

---

## 🎯 Example Usage

### Netgsm

```javascript
const sms = smsQuick.init({
    provider: 'netgsm',
    header: 'your_header',
    username: 'your_username',
    password: 'your_password'
});

sms.send({
    to: 'recipient_phone_number',
    message: 'Hello from Netgsm!'
});
```

### Twilio

```javascript
const sms = smsQuick.init({
    provider: 'twilio',
    accountSid: 'your_account_sid',
    authToken: 'your_auth_token',
    from: 'your_phone_number'
});

sms.send({
    to: 'recipient_phone_number',
    message: 'Hello from Twilio!'
});
```

### Iletimerkezi

```javascript
const sms = smsQuick.init({
    provider: 'iletimerkezi',
    apiKey: 'your_api_key',
    apiHash: 'your_api_hash',
    from: 'your_sender_name'
});

sms.send({
    to: 'recipient_phone_number',
    message: 'Hello from Iletimerkezi!'
});
```

### Vatansms

```javascript
const sms = smsQuick.init({
    provider: 'vatansms',
    apiId: 'your_api_id',
    apiKey: 'your_api_key',
    sender: 'your_sender_name'
});

sms.send({
    to: 'recipient_phone_number',
    message: 'Hello from Vatansms!'
});
```

### Vonage

```javascript
const sms = smsQuick.init({
    provider: 'vonage',
    apiKey: 'your_api_key',
    apiSecret: 'your_api_secret',
    from: 'your_phone_number'
});

sms.send({
    to: 'recipient_phone_number',
    message: 'Hello from Vonage!'
});
```

---

## 📬 Response Formats

Each provider may return different response formats. Here are common examples:

### Successful Response

```json
{
    "status": true,
    "message": "SMS sent successfully"
}
```

### Failed Response

```json
{
    "status": false,
    "message": "SMS could not be sent"
}
```

Responses may vary by provider. Check their API documentation and review the responses using `console.log` to handle them appropriately.

---

## 🐞 Troubleshooting

- **Missing Parameters**: If you receive `status: false, message: 'Missing parameters'`, ensure all required parameters are provided.
- **Network Errors**: Network issues or API errors generally return `status: false, message: 'SMS could not be sent'`. Check your API keys and network connection.
- **Response Errors**: Different providers use different response formats. Examine the responses with `console.log` to diagnose issues.

---

## 💪 Contributors

- [fastuptime](https://github.com/fastuptime) - Project owner and developer

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

With `**smsQuick**`, sending SMS is now simpler and faster! 🚀

---

GitHub: [fastuptime/smsQuick](https://github.com/fastuptime/smsQuick)  
npm: [smsQuick](https://www.npmjs.com/package/smsquick)
