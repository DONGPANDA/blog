/**
 * Created by 96004 on 2017/7/22.
 */
let express=require('express');
let {Article} =require('../model')

let router=express.Router();
router.get('/',function (req,res) {
    let user=req.session.user;
    if(!user){
        res.render('home',{title:'首页'})
    }else {
        Article.find({user: user._id}).populate('user').populate('category').exec(function (err, articles) {
            res.render('home', {title: '首页', articles})
        })
    }
});
/*router.get('/',function (req,res) {
    let user=req.session.user._id;
    Article.find({user},function (err,articles) {
        if(err){
            req.flash('error',err.toString());
            res.redirect('back');
        }else{
            res.render('home',{title:'首页',articles})
        }
    })
})*/
module.exports=router;