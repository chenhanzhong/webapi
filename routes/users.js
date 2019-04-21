import express from 'express'
import * as Users from '../controll/users'

const router = express.Router()

/* GET users listing. */
// router.get('/login', Users.getUsers)
router.post('/login', Users.getUsers)
router.post('/sign', Users.addUsers)
router.post('/update', Users.updateUsers)
// router.delete('/del', User.deleteUsers)

export default router
