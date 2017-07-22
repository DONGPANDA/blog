/**
 * Created by 96004 on 2017/7/22.
 */
let express=require('express');
let {User} = require('../model')
let router=express.Router();
router.get('/signup',function (req, res) {
    res.render('user/signup',{title:'用户注册'})
});
router.post('/signup',function (req, res) {
    let user=req.body;
    User.findOne({username:user.username},function (err,oldUser) {
        if(err){
            res.redirect('back')
        }else {
            if(oldUser){
                res.redirect('back')
            }else {
                User.create(user,function (err,doc) {
                    if(err){
                        res.redirect('back');
                    }else{
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
            res.redirect('back');
        }else{
            if(result){
                res.redirect('/')
            }else {
                res.redirect('back')
            }
        }
    })
});
router.get('/signout',function (req,res) {
    res.send('已退出');
})
module.exports=router;