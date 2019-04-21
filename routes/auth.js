import express from 'express'
import * as Auth from '../controll/auth'

const router = express.Router()

/* GET users listing. */
router.post('/auth', Auth.getAuth)
// router.post('/add', Info.addInfo)
// router.post('/update', Info.updateInfo)
// router.delete('/del', User.deleteUsers)

export default router
