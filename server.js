/**
 * Created by 96004 on 2017/7/22.
 */
let express = require('express');
let index =require('./routes/index');
let user =require('./routes/user');
let category=require('./routes/category');
let app = express();
app.use('/',index);
app.use('/user',user);
app.use('/category',category);
app.listen(8001);