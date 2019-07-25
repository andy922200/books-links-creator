//initialize router
const express = require('express')
const router = express.Router()
const axios = require('axios')
const Link = require('../models/link.js')

// send original Link to tinyURL proxy
router.post('/', (req, res) => {
  let formatDate = GenerateDate()
  originalLink = req.body.originalLink
  bookName = req.body.bookName
  axios
    .get('http://tinyurl.com/api-create.php?url=' + originalLink)
    .then(tinyurl => {
      console.log(formatDate)
      result = tinyurl.data
      const link = Link({
        name: bookName,
        date: formatDate,
        link: originalLink,
        tinyurlLink: result
      })
      link.save(err => {
        if (err) return console.error(err)
        console.log('success')
        res.render('index', { result: result, bookName: bookName, originalLink: originalLink })
      })
    })
    .catch((error) => console.log(error))
})

module.exports = router

// Date Generater
function GenerateDate() {
  let time = new Date()
  let year = time.getFullYear()
  let month = time.getMonth()
  let date = time.getDate()
  formatDate = year + '-' + (month + 1) + '-' + date
  return formatDate
}