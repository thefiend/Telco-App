//{"number":"91234567", "addon": { "id":"voice_100", "name":"100 minutes", "price":"5", "value":"6000"}}

const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000

app.use(bodyParser.json()); // for parsing application/json

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

app.get('/addon/:type', (req, res) => {
	var ref = db.ref("addons/"+req.params.type);
	ref.once("value", function(snapshot) {
		res.json(snapshot.val());
	})
})

app.post('/addon/subscribe/', (req, res) => {
	//var ref = db.ref
	//res.json(req.body)
	var value = 0;
	
	var ref_f = db.ref("addon/" + req.body.type);
	ref_f.once("value", function(snapshot) {
		snapshot.forEach(function(child) {
			if (child.id.match(req.body.id))
				value = snapshot.val().value
		});
	
		console.log("user/"+req.body.number+"/"+req.body.addon.type);
		var ref = db.ref("user/"+req.body.number+"/"+req.body.addon.type);
		ref.once("value", function(snapshot) {
			var val = snapshot.val();
			console.log(val)
			console.log(req.body)
			var newvalue = parseInt(req.body.addon.value) + parseInt(val.available);
			console.log(newvalue);
			val.available = newvalue;
			ref.set(val);
			res.json(val)
		});
	});
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))