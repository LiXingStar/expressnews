let express = require('express');
let router = express.Router();
let login = require('./admin/login');
let info = require('./admin/info');
let cate = require('./admin/cate');


router.use('/',login);
router.use('/info',info);
router.use('/cate',cate);




module.exports = router;