let express = require('express');
let router = express.Router();
let login = require('./admin/login');
let info = require('./admin/info');
let cate = require('./admin/cate');
let news = require('./admin/news');

/*
*  权限
* */

router.use('/',login);
router.use('/info',info);
router.use('/cate',cate);
router.use('/news',news);

/*
* 异常
* */


module.exports = router;