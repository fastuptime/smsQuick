# 📦 `smsQuick` - SMS Gönderim Kütüphanesi

`**smsQuick**` Node.js için çeşitli SMS sağlayıcıları ile entegrasyonu kolaylaştırır. Bu kütüphane, SMS gönderim işlemlerini hızlı ve verimli bir şekilde gerçekleştirmenize yardımcı olur.

## 📋 İçindekiler

- [Kurulum](#kurulum)
- [Kullanım](#kullanım)
- [Desteklenen Sağlayıcılar](#desteklenen-sağlayıcılar)
- [Örnek Kullanım](#örnek-kullanım)
- [Yanıt Formatları](#yanıt-formatları)
- [Hata Ayıklama](#hata-ayıklama)
- [Katkıda Bulunanlar](#katkıda-bulunanlar)
- [Lisans](#lisans)

---

## 📦 Kurulum

npm kullanarak `smsQuick` kütüphanesini projenize ekleyin:

```bash
npm install smsQuick
```

---

## 🛠 Kullanım

### 1. Kütüphaneyi İçe Aktarın

```javascript
const smsQuick = require('smsQuick');
```

### 2. Sağlayıcıyı Yapılandırın

Aşağıdaki kod örneğinde, `twilio` sağlayıcısını kullanarak nasıl yapılandıracağınızı gösteriyoruz:

```javascript
const sms = smsQuick.init({
    provider: 'twilio', // Desteklenen sağlayıcılar: netgsm, twilio, iletimerkezi, vatansms, vonage
    accountSid: 'your_account_sid',
    authToken: 'your_auth_token',
    from: 'your_phone_number'
});
```

### 3. SMS Gönderin

```javascript
sms.send({
    to: 'recipient_phone_number',
    message: 'Hello, this is a test message!'
}).then(response => {
    console.log(response); // { status: true, message: 'SMS sent successfully' }
}).catch(error => {
    console.error(error); // Hata durumunda
});
```

---

## 🗂 Desteklenen Sağlayıcılar

### 1. **Netgsm**

- **URL**: `https://api.netgsm.com.tr/sms/send/get`
- **Gereken Parametreler**: `header`, `username`, `password`

### 2. **Twilio**

- **URL**: Twilio API
- **Gereken Parametreler**: `accountSid`, `authToken`, `from`

### 3. **Iletimerkezi**

- **URL**: `https://api.iletimerkezi.com/v1/send-sms/get/`
- **Gereken Parametreler**: `apiKey`, `apiHash`, `from`

### 4. **Vatansms**

- **URL**: `https://api.vatansms.net/api/v1/1toN`
- **Gereken Parametreler**: `apiId`, `apiKey`, `sender`

### 5. **Vonage**

- **URL**: Vonage API
- **Gereken Parametreler**: `apiKey`, `apiSecret`, `from`

---

## 🎯 Örnek Kullanımlar

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

## 📬 Yanıt Formatları

Her sağlayıcıdan gelen yanıt, işlem sonucunu belirten bir format içerebilir. İşte yaygın yanıt formatları:

### Başarılı Yanıt

```json
{
    "status": true,
    "message": "SMS sent successfully"
}
```

### Başarısız Yanıt

```json
{
    "status": false,
    "message": "SMS could not be sent"
}
```

Yanıtlar, her sağlayıcıya göre farklılık gösterebilir. API belgelerini kontrol edin ve yanıtları doğru bir şekilde işlediğinizden emin olun.

---

## 🐞 Hata Ayıklama

- **Eksik Parametreler**: `status: false, message: 'Missing parameters'` hatası alırsanız, konfigürasyonunuzda eksik parametreler olabilir. Tüm gerekli bilgileri sağladığınızdan emin olun.
- **Ağ Hataları**: Bağlantı sorunları veya API hataları genellikle `status: false, message: 'SMS could not be sent'` mesajı ile döner. API anahtarlarınızı ve ağ bağlantınızı kontrol edin.
- **Yanıt Hataları**: Her sağlayıcı kendi yanıt formatını kullanabilir. Yanıtları `console.log` ile inceleyerek sorunun ne olduğunu belirleyin.

---

## 💪 Katkıda Bulunanlar

- [fastuptime](https://github.com/fastuptime) - Proje sahibi ve geliştirici

---

## 📜 Lisans

Bu proje MIT Lisansı altında lisanslanmıştır. Daha fazla bilgi için [LICENSE](LICENSE) dosyasını inceleyebilirsiniz.

---

`**smsQuick**` ile SMS gönderimi artık çok daha kolay ve hızlı! 🚀

---

GitHub: [fastuptime/smsQuick](https://github.com/fastuptime/smsQuick)  
npm: [smsQuick](https://www.npmjs.com/package/smsQuick)