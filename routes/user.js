/**
 * Created by 96004 on 2017/7/22.
 */
let express=require('express');
let router=express.Router();
router.get('/signup',function (req, res) {
    res.send('注册')
});
router.post('/signup',function (req, res) {

});
router.get('/signin',function (req,res) {
    res.send('登录')
});
router.post('/signin',function (req,res) {

});
router.get('/signout',function (req,res) {
    res.send('已退出')
})
module.exports=router;