import express from 'express'
const router = express.Router();
import {checkLogin} from '../middlewares/check'
//common post list or specific post list
// GET /posts or /post?author=xxx
router.get('/',(req,res,next) => {
    res.render('posts')
})
//post a post methid POST /posts
router.post('/',checkLogin,(req,res,next) => {
    res.send(req.flash())
})
//post create page GET /post/create
router.get('/create',checkLogin,(req,res,next) => {
    res.send(req.flash())
})
//post detail page GET /posts/:postId
router.get('/:postId',(req,res,next) => {
    res.send(req.flash())
})
//edit post page GET /post/:postId/edit
router.get('/:postId/edit',(res,req,next) => {
    res.send(req.flash())
})
//update post method POST /post/:postId/edit
router.post('/:postId/edit',(res,req,next) => {
    res.send(req.flash())
})
//delete post method GET /post/:postId/edit
router.get('/:postId/edit',(res,req,next) => {
    res.send(req.flash())
})
//create a comment POST /posts/:postId/comment
router.post('/:postId/comment',(res,req,next) => {
    res.send(req.flash())
})
//delete a comment POST /posts/:postId/comment/:commentId/remove
router.post('/:postId/comment/:commentId/remove',(res,req,next) => {
    res.send(req.flash())
})
module.exports = router;