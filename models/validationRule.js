// initialize express-validator
const { check, validationResult } = require('express-validator')

// validator array
const booksURLPattern = new RegExp("https://www.books.com.tw/products/[A-Za-z0-9]*$", "i")
let formCheck =
  [
    check('bookName')
      .isLength({ min: 1 })
      .withMessage("請檢查名稱是否空白"),
    check('accountCode')
      .isLength({ min: 1 })
      .withMessage("請檢查帳號是否空白"),
    check('originalLink')
      .isLength({ min: 1 })
      .withMessage('請檢查連結網址是否空白')
      .custom((value) => {
        return booksURLPattern.test(value)
      })
      .withMessage("請檢查網址格式"),
  ]
let registerFormCheck = [
  check('email')
    .isEmail().withMessage("請輸入正確的 Email 格式"),
  check('password')
    .isLength({ min: 8 }).withMessage("請至少輸入八位英數字")
]
module.exports = { formCheck, registerFormCheck }