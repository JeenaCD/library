const express = require('express');
const BookData = require('./src/model/Bookdata');
const UserData = require('./src/model/Userdata');
// const User = require('./src/model/user');
const cors = require('cors');
// var bodyparser=require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
var app = new express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static('./dist/frontend'));



app.post("/api/signup",async (req,res)=>{
  console.log("entered signup");
  let user = req.body
  console.log(user);
  var newuser = {
    username : user.username,
    password : user.password
  }  
  var newuser = new UserData(newuser); //creating instance of model
  console.log(newuser);
  try{
  newuser.save();
  console.log("added new user to db");
   res.status(200).send();
  }
  catch(err){
      res.status(400).send(err);
  }
  }
);


function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    req.userId = payload.subject
    next()
  }

app.post('/api/insert',function(req,res){
   
    console.log(req.body);
   
    var book = { 
        bookId : req.body.book.bookId,  
        title : req.body.book.title,
        author : req.body.book.author,
        imageUrl : req.body.book.imageUrl,
        about : req.body.book.about
   }       
  var book = new BookData(book); //creating instance of model
   book.save();
});
app.get('/api/books',function(req,res){
    
    BookData.find()
                .then(function(books){
                    res.send(books);
                });
});
app.get('/api/:id',  (req, res) => {
  
  const id = req.params.id;
  console.log(id);
    BookData.findOne({"_id":id})
    .then((book)=>{
        res.send(book);
    });
})

app.post('/api/login', async(req, res) => {
  console.log("entered login");
    let userData = req.body
      console.log(userData);
      const user = await UserData.findOne({username:userData.username});
      if(!user) res.status(401).send('Invalid Username');
      if(user.password !== userData.password)
      res.status(401).send('Invalid Password');
         else {
          let payload = {subject: userData.username+userData.password}
          let token = jwt.sign(payload, 'secretKey')
          console.log(token);
          res.status(200).send({token})
        }
      
    })

    app.put('/api/update',verifyToken,(req,res)=>{

      console.log(req.body)
      id=req.body._id,
      bookId = req.body.bookId,
      title = req.body.title,
      author = req.body.author,
      imageUrl = req.body.imageUrl,
      about = req.body.about,
      BookData.findByIdAndUpdate({"_id":id},
                                  {$set:{
                                  "bookId":bookId,
                                  "title":title,
                                  "author":author,
                                  "imageUrl":imageUrl,
                                  "about":about
                                  }})
     .then(function(){
         res.send();
     })
   })
   
app.delete('/api/remove/:id',(req,res)=>{
   
     id = req.params.id;
     BookData.findByIdAndDelete({"_id":id})
     .then(()=>{
         console.log('success')
         res.send();
     })
   })
    
   app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist//frontend/index.html'));
   });

   const port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log('listening to port');
});

