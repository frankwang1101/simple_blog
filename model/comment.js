import marked from 'marked'
import {Comment} from '../lib/mongo'

Comment.plugin('contentToHtml',{
    afterFind: comments => {
        return comments.map(comment => {
            comment.content = marked(comment.content)
            return comment;
        })
    }
})

module.exports = {
    create: comment => {
        return Comment.create(comment).exec();
    },
    delCommentById: (id,author) => {
        return Comment.remove({author:author,_id:id}).exec()
    },
    delCommentByPostId: pid => {
        return Comment.remove({postId:pid}).exec();
    },
    getComments: pid => {
        return Comment
            .find({postId:pid})
            .populate({path:'author',model:'User'})
            .sort({_id:1})
            .addCreateAt()
            .contentToHtml()
            .exec();
    },
    getCommentsCount: pid => {
        return Comment.count({postId:pid}).exec();
    }
}