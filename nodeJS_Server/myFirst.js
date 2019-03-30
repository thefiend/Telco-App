const express = require('express')
const app = express()
const port = 3000

var admin = require("firebase-admin");
var serviceAccount = require("C:\\Users\\jylee\\Documents\\repos\\Telco-App\\nodeJS_Server\\testing\\circle-sqaure-life-firebase-adminsdk-l6naa-b0625cc662.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://circle-sqaure-life.firebaseio.com/",
    storageBucket: "circle-sqaure-life.appspot.com"
});
var db = admin.database();

app.get('/getUserObject', (req,res)=> {

  var newRef = db.ref("user");
  newRef = newRef.child("91234567");

  newRef.on('value', function(snapshot){
      var array = [];
      snapshot.forEach(function(childSnapshot){
         console.log(childSnapshot.val())
          array.push(childSnapshot.val())
      });
      console.log(array);
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(array)); 
  });

});

app.get('/dashboard/:user', (req, res) => {
  var newRef = db.ref("user");
  newRef = newRef.child(req.params.user);
  newRef.on('value', function(snapshot){
    res.json(snapshot.val());
    
    
  });
})

app.get('/addon/:type', (req, res) => {
  let response = {}
  response[req.params.type] = [
    {
      name: 'Addon 1',
      id: 'ABC'
    },
    {
      name: 'Addon 2',
      id: 'ABCC'
    }
  ]
  res.json(response)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
