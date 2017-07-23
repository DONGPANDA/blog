/**
 * Created by 96004 on 2017/7/22.
 */
let express=require('express');
let multer =require('multer');
let upload=multer({dest:'./public'})
let {User} = require('../model');
let router=express.Router();
router.get('/signup',function (req, res) {
    res.render('user/signup',{title:'用户注册'})
});
router.post('/signup',upload.single('avatar'),function (req, res) {
    let user=req.body;
    user.avatar=`/${req.file.filename}`
    console.log(user);
    User.findOne({username:user.username},function (err,oldUser) {
        if(err){
            req.flash('error',err.toString());
            res.redirect('back')
        }else {
            if(oldUser){
                req.flash('error','用户已经存在');
                res.redirect('back');
            }else {
                User.create(user,function (err,doc) {
                    if(err){
                        req.flash('error',err.toString());
                        res.redirect('back');
                    }else{
                        req.flash('success','恭喜你注册成功');
                        res.redirect('/user/signin')
                    }
                })
            }
        }
    })
});
router.get('/signin',function (req,res) {
    res.render('user/signin',{title:'登录'})
});
router.post('/signin',function (req,res) {
    let user=req.body;
    User.findOne(user,function (err,result) {
        if(err){
            req.flash('error',err.toString())
            res.redirect('back');
        }else{
            if(result){
                req.flash('success','登陆成功')
                req.session.user=result;
                res.redirect('/')
            }else {
                req.flash('error','请重新登录')
                res.redirect('back')
            }
        }
    })
});
router.get('/signout',function (req,res) {
    req.session.user=null;
    res.redirect('/user/signin');
})
module.exports=router;