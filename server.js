//https://www.youtube.com/watch?v=gnsO8-xJ8rs&t=1928s

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
var app = express();

// var logger = function(req,res,next){
//     console.log('Logging...');
//     next();
// }

// app.use(logger);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//set static path
app.use(express.static(path.join(__dirname,'public')));

var users =[
    {
    first_name: 'Jeff',
    last_name: 'Smith',
    email: 'jeff@yahoo.com',
    id: '1'
    },
    {
        first_name: 'Bob',
        last_name: 'Smith',
        email: 'bob@yahoo.com',
        id: '2'
    },
    {
        first_name: 'Mo',
        last_name: 'Smith',
        email: 'mo@yahoo.com',
        id: '3'
    }
]

app.get('/',function(req,res){
  //  res.send('Hello World');
 //   res.json(people);

 res.render('index',{
     title:'Customers',
     users: users
 });
});

app.post('/users/add', [
    check('first_name','first name is required').exists(),
    check('last_name','last name is required').exists(),
    check('email','email is required').exists()],(req,res,next)=>{
//validation is not currently working.  I think traversy is working
// from an older version of the validator (his required middleware),
// but I used current docs to build this one and empty strings 
// don't render as errors.  Needs work.  Move on to adding users.

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log('error');
    }else{
        var newUser= {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email
        } 
        console.log(newUser);
        console.log('success!');
    }

});

app.listen(3000,function(){
    console.log('server started on port 3000');
})
