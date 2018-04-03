let express = require('express');
let router = express.Router();
let connection = require('../../config/db');
let bodyParser = require('body-parser');

// 配置 bodyparser
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
router.use(bodyParser.json());
router.get('/',function(req,res){

    res.render('login',function(err,data){
        if(err) throw err;
        res.send(data);
    })
});
router.post('/check',function(req,res){
    let {username,password} = req.body;
    connection.query('select * from manage where username=? and password=?',[username,password],function(err,result){
        if(err) throw err;
        if(result.length == 1){
            res.redirect('/admin/info')
        }else{
            res.send("<script>alert('fail');history.back();</script>")
        }
    });
});

module.exports = router;