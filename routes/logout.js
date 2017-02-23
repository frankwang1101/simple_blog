import express from 'express'
const router = express.Router()
import {checkLogin} from '../middlewares/check'
// GET /logout method
router.get('/',checkLogin,(req,res,next) => {
    req.session.user = null;
    req.flash('success','登出成功');
    res.redirect('/posts');
})
module.exports = router;