require("dotenv").config()
const express = require('express')
const path = require('node:path')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const { ObjectId } = require('mongodb');

dotenv.config({path:'config.env'});


app.use(bodyParser.urlencoded({ extended: true }))

MongoClient.connect(process.env.MONGO_URI, { 
    useUnifiedTopology: true}) 
    .then(client =>{
      console.log('Connected to Database')
      const db = client.db('KingramQuebec')
      const playersCollection = db.collection('players')  

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', async function (req, res) {
    res.sendFile(path.join(__dirname, "index.ejs" ));
app.post('/quotes', (req, res) => {
    console.log(req.body)
    // res.sendFile(path.join(__dirname, "index.html" )); 
    // res.send('Hello ' + userName + ' from Node/Express/Heroku');

  


app.listen(process.env.PORT || 3000,
  () => console.log(`server is running on port: ${process.env.PORT}` ));

MongoClient.connect('mongodb-connection-string', (err, client) => {
    // ... do something here
})