import express from 'express'
import PostModel from '../model/post'
import CommentModel from '../model/comment'

const router = express.Router();
import {checkLogin} from '../middlewares/check'
//common post list or specific post list
// GET /posts or /post?author=xxx
router.get('/',(req,res,next) => {
    let author = req.query.author
    PostModel.getPosts(author)
        .then(result => {
            console.log(result)
            res.render('posts',{posts:result});
        })
        .catch(next)
})
//post a post methid POST /posts
router.post('/',checkLogin,(req,res,next) => {
    let title = req.fields.title,
        content = req.fields.content,
        author = req.session.user._id;
    try{
        if(!title.length){
            throw new Error('please enter a title');
        }
        if(!content.length){
            throw new Error('please enter content');
        }
    }catch(e){
        req.flash('error',e.message);
        return res.redirect('back');
    }    
    const post = {
        author: author,
        title: title,
        content: content,
        pv: 0
    }
    PostModel.create(post)
        .then(result => {
            let p = result.ops[0];
            req.flash('success','post success');
            res.redirect(`/posts/${p._id}`);
        })
        .catch(next);
})
//post create page GET /post/create
router.get('/create',checkLogin,(req,res,next) => {
    res.render('create')
})
//post detail page GET /posts/:postId
router.get('/:postId',(req,res,next) => {
    const postId = req.params.postId;
    Promise.all([
        PostModel.getPostById(postId),
        CommentModel.delCommentByPostId(postId),
        PostModel.incPv(postId)
    ])
    .then(result => {
        let post = result[0],
            comments = result[1]
        if(!post){
            throw new Error('该文章不存在')
        }
        res.render('post',{
            post:post,
            comments:comments
        });
    })
    .catch(next)
})
//edit post page GET /post/:postId/edit
router.get('/:postId/edit',(res,req,next) => {
    const postId = req.params.postId,
        author = req.session.user._id;
    PostModel.getRawPostById(postId)
        .then(post => {
            if(!post){
                throw new Error('该文章不存在')
            }
            if(author.toString() !== post.author._id.toString()){
                throw new Error('权限不足')
            }
            res.render('edit',{post:post});
        })
        .catch(next)
})
//update post method POST /post/:postId/edit
router.post('/:postId/edit',(res,req,next) => {
    let content = req.fields.content,
        title = req.fields.title,
        postId = req.params.postId,
        author = req.session.user._id;
    PostModel.updatePostById(postId,author,{title:title,content:content})
        .then(() => {
            req.flash('success','更新成功')
        })
        .catch(next)
})
//delete post method GET /post/:postId/edit
router.get('/:postId/remove',(res,req,next) => {
    const postId = req.params.postId,
        author = req.session.user._id;
    PostModel.delPostById(postId)
        .then(() => {
            req.flash('success','删除成功')
        })
        .catch(next)
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