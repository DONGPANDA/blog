/**
 * Created by 96004 on 2017/7/22.
 */
let express=require('express');
let router=express.Router();
router.get('/',function (req,res) {
    res.render('home',{title:'首页'})
})
module.exports=router;