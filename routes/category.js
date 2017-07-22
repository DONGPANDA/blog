/**
 * Created by 96004 on 2017/7/22.
 */
let express =require('express');
let router=express.Router();
router.get('/list',function (req, res) {
    res.send('查看分类列表');
});
router.get('/add',function (req, res) {
    res.send('添加分类')
})
module.exports=router;