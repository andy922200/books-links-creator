// models/seeds/seeder.js
const mongoose = require('mongoose')
const Link = require('../link')
//const User = require('../user')
const bcrypt = require('bcryptjs')

// connect with DB
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/link', { useNewUrlParser: true, useCreateIndex: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('db error!')
})
db.once('open', () => {
  console.log('db connected!')
  GenerateLink()

  function GenerateLink() {
    let time = new Date()
    let year = time.getFullYear()
    let month = time.getMonth()
    let date = time.getDate()
    let formatDate = ''
    formatDate = year + '-' + (month + 1) + '-' + date
    Link.create({
      name: 'Title',
      date: formatDate,
      link: 'https://www.books.com.tw/link/jshdksdhsdjfhdsjfwerty',
      tinyurlLink: 'https://tinyurl.com/7k3bdac'
    })
  }

  console.log('seed data is generated')
})