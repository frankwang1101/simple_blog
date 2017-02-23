import express from 'express'
import fs from 'fs'
import sha1 from 'sha1'
import {checkNoLogin} from '../middlewares/check'
import UserModel from '../model/users'
import path from 'path'

const router = express.Router()
// GET /singup page
router.get('/',checkNoLogin,(req,res,next) => {
    res.render('signup')
})
// POST /singup method
router.post('/',checkNoLogin,(req,res,next) => {
    let name = req.fields.name,
        gender = req.fields.gender,
        bio = req.fields.bio,
        avatar = req.files.avatar.path.split(path.sep).pop(),
        password = req.fields.password,
        repassword = req.fields.repassword;
    try{
        if(!(name.length >= 1) && name.length <= 10){
            throw new Error('请限制名字长度在10个字符内')
        }
        if(['m','f','x'].indexOf(gender) === -1){
            throw new Error('性别只能是m、f或x')
        }
        if(bio.length > 30){
            throw new Error('简介只能小于30字')
        }
        if(!req.files.avatar.name){
            throw new Error('简介只能小于30字')
        }
        if(password !== repassword){
            throw new Error('两次输入的密码不同!')
        }
        if(!/^(?!\d+$)(?![a-zA-Z]+$)\w{6,16}$/.test(password)){
            throw new Error('密码长度应为6到16位,且包含数字字母混合')
        }
    }catch(e){
        fs.unlink(req.files.avatar.path);
        req.flash('error',e.message);;
        return res.redirect('/signup');
        next(e);
    }     
    password = sha1(password);
    let user = {
        name: name,
        password: password,
        gender: gender,
        bio: bio,
        avatar: avatar
    }

    UserModel.create(user)
    .then((result) => {
        user = result.ops[0];
        delete user.password;
        req.session.user = user;
        //save to flash
        req.flash('success','注册成功');
        res.redirect('/posts');
    }).catch(e => {
        fs.unlink(req.files.avatar.path);
        if(e.message.match('E11000 duplicate key')){
            req.flash('error','用户名已被使用');
            return res.redirect('/signup');
        }
        next(e);
    });
})
module.exports = router;