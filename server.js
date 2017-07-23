/**
 * Created by 96004 on 2017/7/22.
 */
let express = require('express');
let path=require('path');
let bodyParser = require('body-parser');
let session=require('express-session');
let flash=require('connect-flash');
let mongoStore=require('connect-mongo')(session);
let index =require('./routes/index');
let user =require('./routes/user');
let category=require('./routes/category');
let article=require('./routes/article')
let app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','html');
app.set('views',path.resolve('views'));
app.engine('.html',require('ejs').__express);
app.use(express.static(path.resolve('node_modules')));
app.use(express.static(path.resolve('public')));
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:'xiangjiao',
    store: new mongoStore({
        url:'mongodb://127.0.0.1/blog'
    }),
    /*cookie:{
        maxAge:360*1000
    }*/
}));
app.use(flash());

app.use(function (req,res,next) {
    res.locals.title='香蕉博客';
    res.locals.success=req.flash('success').toString();
    res.locals.error=req.flash('error').toString();
    res.locals.user = req.session.user;
    next();
})
app.use('/',index);
app.use('/user',user);
app.use('/category',category);
app.use('/article',article)
app.listen(8001);