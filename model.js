/**
 * Created by 96004 on 2017/7/22.
 */
let mongoose=require('mongoose');
let con=mongoose.createConnection('mongodb://127.0.0.1/blog');
let UserSchame=new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    avatar:String
});
let User=con.model('User',UserSchame);
exports.User=User;