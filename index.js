var express = require('express');
var bodyParser = require('body-parser');
var qr_code = require('qrcode');
var path= require('path');
var ejs= require('ejs');
var app =express();

//set up view engine to ejs
app.set('view engine','ejs');


//middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//routes for app
//get routes
app.get('/',function (req,res){
    res.render('index',{QR_code:''});
});
//post routes
app.post('/', function(req, res){
	const url = req.body.url;
	console.log(url);
	if(url){
		qr_code.toDataURL(url, function(err, src){
			if(err){res.send(err); console.log(err);}
			var file_path = "store/"+ Date.now() +".png";
        res.render('index',{QR_code:src,img_src:file_path}); 
		});

	}else{
		res.send('URL Not Set!');
	}

});
//listen on port 8000
var port =process.env.PORT ||8000;
app.listen(port,console.log('listening on port'));