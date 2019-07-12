// models/link.js
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const linkSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  nickname: {
    type: String
  },
  date: {
    type: String
  },
  link: {
    type: String,
    required: true
  },
  tinyurlLink: {
    type: String,
  }

})

module.exports = mongoose.model('link', linkSchema)