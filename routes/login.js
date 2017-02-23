import express from 'express'
import {checkNoLogin} from '../middlewares/check'
import UserModel from '../model/users'
import sha1 from 'sha1'

const router = express.Router()
//login page GET /login
router.get('/',checkNoLogin,(req,res,next) => {
    res.render('login');
})
//login method POST /login
router.post('/',checkNoLogin,(req,res,next) => {
    let username = req.fields.username,
        password = req.fields.password;
    UserModel.getUserByName(username)
        .then((user) => {
            if(!user){
                req.flash('error','用户不存在!')
                return res.redirect('back');
            }
            if(sha1(password) !== user.password){
                req.flash('error','用户名或密码错误!');
                return res.redirect('back');
            }
            req.flash('success','登录成功!');
            delete user.password;
            req.session.user = user;    
            res.redirect('/posts');
        }).catch(next)
    
})
module.exports = router;