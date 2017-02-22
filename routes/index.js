import posts from './posts'
import login from './login'
import logout from './logout'
import signup from './signup'
module.exports = app => {
    app.get('/',(req,res) => {
        res.redirect('/posts');
    })
    app.use('/posts',posts)
    app.use('/login',login)
    app.use('/logout',logout)
    app.use('/signup',signup)
}