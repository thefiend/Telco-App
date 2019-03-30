const express = require('express')
const app = express()
const port = 3000

var admin = require("firebase-admin");

var serviceAccount = require("./circle-sqaure-life-firebase-adminsdk-l6naa-b0625cc662.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://circle-sqaure-life.firebaseio.com"
});

var db = admin.database();

app.get('/dashboard/:number', (req, res) => {
	//res.send('Hello World!')  
	var ref = db.ref("user/"+req.params.number);
	ref.once("value", function(snapshot) {
		res.json(snapshot.val());
	})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))