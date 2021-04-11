const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.DB_USERS_URL, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log("veritabanına bağlanıldı"))
    .catch(hata => console.log('db bağlantı hatası' + hata))

module.exports