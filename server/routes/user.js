const express = require('express')

const controller = require('../controllers/user')

const auth = require('../middleware/auth')

const router = express.Router()

const path = 'user'

router.get(
  `/${path}`,
  // auth,
  controller.getData
)

router.post(`/${path}`, controller.insertData)

// para login
router.post('/login', controller.sigIn)
//get user loggedIn
router.get('/loggedIn', controller.loggedIn)

//para logout
router.get('/logout', controller.logout)
//put user
router.put(`/${path}/:id`, controller.updateSingle)
//delete user
router.delete(`/${path}/:id`, controller.deleteSingle)

module.exports = router
