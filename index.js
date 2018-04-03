let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let fs = require('fs');

let multer  = require('multer');
let upload = multer({ dest: 'uploads/' });

let admin = require('./routers/admin');
// 模板引擎
app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');

// 静态托管
app.use(express.static('static'));
app.use('/uploads',express.static('uploads'));



// app.use('/',)
app.use('/admin',admin);




app.get('/upload',function(req,res){
   res.render('upload',function(err,data){
      res.send(data);
    })
});
app.post('/uploadimg', upload.single('file'), function (req, res, next) {
    let file = req.file;
    let date =  new Date();
    let dirname = [date.getFullYear(),date.getMonth()+1,date.getDate()].join('-');
    let pathname = __dirname + '/uploads/' +dirname;
    if(!fs.existsSync(pathname)){
        fs.mkdirSync(pathname);
    }
    let filename =''+ date.getTime() + Math.floor(Math.random()*20) + '.' + file.originalname.split('.').pop();

    fs.readFile(file.path,(err,data)=>{
       if(err){ throw err};
       fs.writeFile(pathname+'\\'+filename,data,(err)=>{
           if(err){throw err};
           fs.unlinkSync(file.path);
           res.send(`<img src="/uploads/${dirname}/${filename}">`);
       })
    });


});
app.listen(3000);