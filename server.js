/*
 * @Author: Suraj Roy
 * @Date:   15 March 2017
 * @Topic : google-recapcha
 */        


const   express = require('express'),
        bodyParser = require('body-parser'),
        request = require('request'),
        app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.get('/',(req,res)=> {
    // Sending our HTML file to browser.
    res.sendFile(__dirname + '/index.html');
});

app.post('/submit',function(req,res){
    /* Browse generates the google-recapcha-response key on form submit.
    if its blank or null means user has not selected,
     the captcha then blow error loop occurs.*/
    if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
        return res.json({"responseCode" : 1,"responseDesc" : "Validate captcha first"});
    }
    
    let secretKey = "ENTER_SECRET_KEY"; // Put your secret key here.
    let verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
    // Google will respond with success or error scenario on url request sent.
    request(verificationUrl,function(error,response,body) {
        body = JSON.parse(body);
        // Success will be true or false depending upon captcha validation.
        if(body.success !== undefined && !body.success) {
            return res.json({"responseCode" : 1,"responseDesc" : "Captcha verification has Failed. Try again."});
        }
        res.json({"responseCode" : 0,"responseDesc" : "Captcha validated succesfully!"});
    });
});

// for handling 404 requests.
app.use("*",function(req,res) {
  res.status(404).send("404");
})

app.listen(3000,function(){
    console.log('app listening on port:3000');
});

