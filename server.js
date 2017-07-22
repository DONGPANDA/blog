/**
 * Created by 96004 on 2017/7/22.
 */
let express = require('express');
let path=require('path');
let bodyParser = require('body-parser')
let index =require('./routes/index');
let user =require('./routes/user');
let category=require('./routes/category');
let app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','html');
app.set('views',path.resolve('views'));
app.engine('.html',require('ejs').__express);
app.use(express.static(path.resolve('node_modules')))
app.use('/',index);
app.use('/user',user);
app.use('/category',category);
app.listen(8001);