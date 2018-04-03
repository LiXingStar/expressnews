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
    connection.query('select * from info where id=1',function(err,result){
        let data = result[0];
        res.render('index',data,function(err,data){
            res.send(data);
        })
    });

});
router.post('/check',function(req,res){
    // req.body
    let {title,description,keywords,phone} = req.body;
    connection.query('update info set title=?,description=?,keywords=?,phone=? where id=1',[title,description,keywords,phone],function(err,result){
        if(result.affectedRows == 1){
            res.redirect('/admin/info');
        }
    })
});

module.exports = router;