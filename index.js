import express from 'express'
import routes from './routes/index'
import session from 'express-session'
import connectMongo from 'connect-mongo'
import flash from 'connect-flash'
import path from 'path'
import config from 'config-lite'
const pkg = require('./package')
const MongoStore = connectMongo(session);
let app = express();
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
//router
routes(app);
app.listen(config.port,() => {
    console.log(`${pkg.name} listening on port ${config.port}`);
})