var express = require('express');
var router = express.Router();

var User = require('../model/User.js');
var myUser = require('../model/User.js');

var crypto = require('crypto');
var assert = require('assert');

var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
var key = 'password';
var cipher = crypto.createCipher(algorithm, key);

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find(req.query.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/** Login create */
router.post('/create', function(req, res, next) {
 // var encrypted = cipher.update(req.body.password, 'utf8', 'hex') + cipher.final('hex');
//var decipher = crypto.createDecipher(algorithm, key);
//var decrypted = decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');

  //req.body.password = encrypted;
  User.find({"email":req.body.email}).count(function(err, count){
    
    if(count>0)
    {
        res.json({"err":[{"ar":"هذا المستخدم موجود من قبل"},
        {"en":" This email already exists."}]});
    }
    else
    {
        User.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
        });
    }
  });                      
});

/** Login API */
router.post('/login', function(req, res, next) {  
  //var encrypted = cipher.update(req.body.password, 'utf8', 'hex') + cipher.final('hex');
  //req.body.password = encrypted;
  User.find({"email":req.body.email,"password":req.body.password}).count(function(err, count){
    if(count>0)
    {
        res.json({"success":true});
    }
    else
    {
        res.json({"err":[{"ar":"خطأ في البريد الالكتروني او كلمة المرور"},
        {"en":"Email and password dont match."}]});
    }
  });  
});

module.exports = router;
