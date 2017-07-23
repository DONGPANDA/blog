/**
 * Created by 96004 on 2017/7/22.
 */
let express =require('express');
let {Category} =require('../model')
let router=express.Router();
router.get('/list',function (req, res) {
    let user=req.session.user._id;
    Category.find({user},function (err,categories) {
        if(err){
            res.redirect('back')
        }else {
            res.render('category/list', {title: '分类', categories})
        }
    })
});
router.get('/add',function (req, res) {
    res.render('category/add',{title:'添加分类'})
})
router.post('/add',function (req, res) {
    let category=req.body;
    category.user=req.session.user._id;
    Category.findOne(category,function (err,result) {
        if(err){
            req.flash('error',err.toString());
            res.redirect('back')
        }else{
            if(result){
                req.flash('error','添加的标签已存在');
                res.redirect('back');
            }else{
                Category.create(category,function (err,result) {
                    if(err){
                        req.flash('error',err.toString());
                        res.redirect('back');
                    }else {
                        req.flash('success','添加成功');
                        res.redirect('/category/list');
                    }
                })
            }
        }
    })
});
router.get('/delete/:_id',function (req,res) {
    let _id=req.params._id
    Category.remove({_id},function (err,result) {
        if(err){
            req.flash('error',err.toString());
            res.redirect('back');
        }else{
            req.flash('success','删除成功');
            res.redirect('back');
        }
    })
})
module.exports=router;