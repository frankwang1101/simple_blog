import express from 'express'
import routes from './routes/index'
import session from 'express-session'
import connectMongo from 'connect-mongo'
import flash from 'connect-flash'
import path from 'path'
import config from 'config-lite'

// import ejs from 'ejs'

const pkg = require('./package')
const MongoStore = connectMongo(session);
let app = express();
//set module folder
app.set('views',path.join(__dirname,'views'));
//set module engine
app.set('view engine','ejs');
//set static folder
app.use(express.static(path.join(__dirname,'public')));
//set session middleware
app.use(session({
    name:config.session.key,
    secret:config.session.secret,
    resave:true,
    saveUninitialized:false,
    cookie:{
        maxAge:config.session.maxAge
    },
    store:new MongoStore({
        url:config.mongodb
    })
}))
//use flash
app.use(flash());
//user formidable
app.use(require('express-formidable')({
    uploadDir:path.join(__dirname,'public/img'),
    keepExtensions:true
}))
//set params
app.locals.blog = {
    title:pkg.name,
    description:pkg.description
}
app.use((req,res,next)=>{
    res.locals.user = req.session.user;
    res.locals.success = req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    next();
})
//router
routes(app);
app.listen(config.port,() => {
    console.log(`${pkg.name} listening on port ${config.port}`);
})