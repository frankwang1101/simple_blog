import express from 'express'
const router = express.Router()
import {checkLogin} from '../middlewares/check'
// GET /logout method
router.get('/',checkLogin,(req,res,next) => {
    res.send(req.flash());
})
module.exports = router;