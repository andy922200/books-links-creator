//initialize router
const express = require('express')
const router = express.Router()
const axios = require('axios')
const { check, validationResult } = require('express-validator')
const { formCheck, registerFormCheck } = require('../models/validationRule')
const Link = require('../models/link.js')

// Date Generater
function GenerateDate() {
  let time = new Date()
  let year = time.getFullYear()
  let month = time.getMonth()
  let date = time.getDate()
  formatDate = year + '-' + (month + 1) + '-' + date
  return formatDate
}

function GenerateYM() {
  let time = new Date()
  let year = time.getFullYear()
  let month = time.getMonth()
  if (month <= 8) {
    ymParameter = year + '0' + (month + 1)
  } else {
    ymParameter = year + (month + 1)
  }
  return ymParameter
}

// send original Link to tinyURL proxy
router.post('/', formCheck, (req, res) => {
  const errors = validationResult(req)
  const companyURL = 'https://www.books.com.tw/exep/assp.php/'
  let formatDate = GenerateDate()
  let shareLink = ''
  let productLink = ''
  let parameters = ''
  originalLink = req.body.originalLink
  bookName = req.body.bookName
  account = req.body.accountCode
  productLink = originalLink.split('/')[3] + '/' + originalLink.split('/')[4]
  parameters = '?&utm_source=' + account + '&utm_medium=ap-books&utm_content=recommend&utm_campaign=ap-' + GenerateYM()
  shareLink = companyURL + account + '/' + productLink + parameters
  console.log(errors)
  if (!errors.isEmpty()) {
    let errorMessages = []
    console.log(errors)
    //console.log(errors.array()[0]['msg'])
    for (let i = 0; i < errors.array().length; i++) {
      errorMessages.push({ message: errors.array()[i]['msg'] })
      //console.log(errorMessages)
    }
    res.render('index', { bookName: bookName, account: account, originalLink: originalLink, errorMessages: errorMessages })
  } else {
    axios
      .get('http://tinyurl.com/api-create.php?url=' + shareLink)
      .then(tinyurl => {
        result = tinyurl.data
        const link = Link({
          name: bookName,
          date: formatDate,
          link: originalLink,
          tinyurlLink: result
        })
        link.save(err => {
          if (err) return console.error(err)
          res.render('index', { result: result, bookName: bookName, account: account, originalLink: originalLink })
        })
      })
      .catch((error) => console.log(error))
  }
})

module.exports = router