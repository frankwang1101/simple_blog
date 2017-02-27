import {Post} from '../lib/mongo'
import marked from 'marked'

Post.plugin('contentToHtml',{
    afterFind: posts => {
        return posts.map(p => {
            p.content = marked(p.content)
            return p
        })
    },
    afterFindOne: post => {
        if(post){
            post.content = marked(post.content)
        }
        return post;
    }
})

module.exports = {
    create: (post) => {
        return Post.create(post).exec();
    },
    getPostById: id => {
        return Post
            .findOne({_id: id})
            .populate({path:'author',model:'User'})
            .addCreateAt()
            .contentToHtml()
            .exec();
    },
    getPosts: author => {
        let query = {};
        if(author){
            query.author = author;
        }
        return Post
            .find(query)
            .populate({path:'author',model:'User'})
            .sort({_id:-1})
            .addCreateAt()
            .contentToHtml()
            .exec()
    },
    incPv: (postId) => {
        return Post
        .update({ _id: postId }, { $inc: { pv: 1 } })
        .exec();
    },
    getRawPostById: postId => {
        return Post
            .findOne({_id:postId})
            .populate({path:'author',model:'User'})
            .exec()
    },
    updatePostById: (postId,author,data) => {
        return Post.update({author:author,_id:postId},{$set:data}).exec();
    },
    delPostById: function delPostById(postId, author) {
        return Post.remove({ author: author, _id: postId }).exec();
    }
}