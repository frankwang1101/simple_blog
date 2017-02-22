module.exports = {
    checkLogin : (req,res,next) => {
        if(!req.session.user){
            return res.redirect('/login');
        }
        next();
    },
    checkNoLogin : (req,res,next) => {
        if(req.session.user){
            req.flash('error','login already');
            return res.redirect('back');
        }
        next();
    }
}