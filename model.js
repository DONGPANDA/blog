/**
 * Created by 96004 on 2017/7/22.
 */
let mongoose=require('mongoose');
mongoose.Promise=Promise;
let ObjectId=mongoose.Schema.Types.ObjectId;
let con=mongoose.createConnection('mongodb://127.0.0.1/blog');
let UserSchame=new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    avatar:String
});
let User=con.model('User',UserSchame);
exports.User=User;
let CategorySchame=new mongoose.Schema({
    name: String,
    user: {type:ObjectId,ref:'User'}
})
let Category=con.model('Category',CategorySchame);
exports.Category=Category;
let ArticleSchame=new mongoose.Schema({
    title: String,
    content: String,
    category: {type:ObjectId,ref:'Category'},
    user: {type:ObjectId,ref:'User'},
    createAt: {type: Date,default:Date.now}
});
let Article=con.model('Article',ArticleSchame);
exports.Article=Article;