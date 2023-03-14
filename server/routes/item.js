const express = require('express')

const controller = require('../controllers/item')

const auth = require('../middleware/auth')

const router = express.Router()

const path = 'item'

router.get(
  `/${path}`,
  // auth,
  controller.getData
)

router.post(
  `/${path}`,
  // auth,
  controller.insertData
)

module.exports = router
