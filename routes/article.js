/**
 * Created by 96004 on 2017/7/23.
 */
let express=require('express');
let {Article,Category}=require('../model')
let router=express.Router();
router.get('/add',function (req,res) {
    Category.find({user:req.session.user._id},function (err,categories) {
        res.render('article/add',{title:'增加博文',categories,result:{}})
    })
});
router.post('/add',function (req,res) {
    let article=req.body;
    article.user=req.session.user._id;
    Article.findOne({title:article.title},function (err,result) {
        if(err){
            req.flash('error',err.toString());
            res.redirect('back');
        }else{
            if(result){
                req.flash('error','文章标题已存在,请修改');
                res.redirect('back');
            }else{
               Article.create(article,function (err,result) {
                   if(err){
                       req.flash('error',err.toString());
                       res.redirect('back');
                   }else{
                       req.flash('success','文章发表成功');
                       res.redirect('/');
                   }
               })
            }
        }
    })
});
router.get('/detail/:_id',function (req,res) {
    let _id=req.params._id;
    Article.findById(_id).populate('category').populate('user').exec(function (err,article) {
        if(err){
            req.flash('error',err.toString());
            res.redirect('back')
        }else{
            res.render('article/detail',{title:'文章',article})
        }
    })
});
router.get('/delete/:_id',function (req,res) {
    let _id=req.params._id;
    Article.remove({_id},function (err,result) {
        if(err){
            req.flash('error',err.toString());
            res.redirect('back')
        }else{
            req.flash('success','删除成功');
            res.redirect('/');
        }
    })
});
router.get('/update/:_id',function (req,res) {
    let _id=req.params._id;
    Category.find({user:req.session.user._id},function (err,categories) {
        Article.findById(_id).exec(function (err,result) {
            res.render('article/add',{result,categories})
        })
    })
});
router.post('/update/:_id',function (req,res) {
    let _id=req.params._id;
    let article=req.body;
    Article.update({_id},article,function (err,result) {
        if(err){
            req.flash('error',err.toString());
        }else{
            req.flash('success','修改成功')
            res.redirect('/')
        }
    })
})
module.exports=router;