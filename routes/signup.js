import express from 'express'
const router = express.Router()
import {checkNoLogin} from '../middlewares/check'
// GET /singup page
router.get('/',checkNoLogin,(req,res,next) => {
    res.send(req.flash());
})
// POST /singup method
router.post('/',checkNoLogin,(req,res,next) => {
    res.send(req.flash());
})
module.exports = router;