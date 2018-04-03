let express = require('express');
let router = express.Router();

router.get('/', function (req, res) {
   res.render('news',function(err,data){
       if(err){throw err};
       res.send(data);
   })
});

router.get('/add', function (req, res) {
    res.render('newsadd',function(err,data){
        if(err){throw err};
        res.send(data);
    })
});
/*
*  nid   title  desc  time  author  content thumb cid
*
* */
router.post('/insert', function () {

});

module.exports = router;