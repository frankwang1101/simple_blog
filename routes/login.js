import express from 'express'
const router = express.Router()
import {checkNoLogin} from '../middlewares/check'
//login page GET /login
router.get('/',checkNoLogin,(req,res,next) => {
    res.send(req.flash())
})
//login method POST /login
router.post('/',checkNoLogin,(req,res,next) => {
    res.send(req.flash())
})
module.exports = router;