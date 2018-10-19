import express from 'express'
import User from '../controll/users'
const router = express.Router()

/* GET users listing. */
router.get('/', User.getUsers)
router.post('/create', User.addUsers)
router.post('/change', User.changeUsers)
// router.delete('/del', User.deleteUsers)

export default router
