let express = require('express');
let router = express.Router();
let connection = require('../../config/db');
let bodyParser = require('body-parser');

// 配置 bodyparser
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
router.use(bodyParser.json());

// /admin/cate/
router.get('/',function(req,res){
    connection.query('select * from category',(err,result)=>{
        if(err){throw  err};
        res.render('category',{list:result},(err,data)=>{
            if(err) throw err;
            res.send(data);
        })
    });
});

router.get('/indexcate',function(req,res){
    res.render('indexcate',(err,data)=>{
        if(err) throw err;
        res.send(data);
    })
});

router.post('/insertcate',function(req,res){
    connection.query(`insert into category (cname) values (?)`,[req.body.title],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows == 1){
            res.redirect('/admin/cate');
        }else{
            res.send("<script>alert('插入失败')</script>");
            res.redirect('/admin/cate/indexcate');
        }
    });
});

router.get('/editcate',function(req,res){
    connection.query("select * from category where cid=?",[req.query.cid],(err,result)=>{
        res.render('editcate',result[0],(err,data)=>{
            res.send(data);
        })
    })

});
router.post('/updatecate',function(req,res){
    let {cid,title} = req.body;
    connection.query('update category set cname=? where cid=?',[title,cid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows == 1){
            res.redirect('/admin/cate');
        }else{
            res.send("<script>alert('插入失败')</script>");
            res.redirect('/admin/cate');
        }
    })
});

module.exports = router;