require('dotenv').config()
const express = require('express')
const path = require('node:path')
const bodyParser = require('body-parser')
const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// const uri = "mongodb+srv://kingram:bDKr6sPxMLSwfaap@cluster0.mzkvvap.mongodb.net/?retryWrites=true&w=majority";

// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(err => {
  const collection = client.db("kingramquebec").collection("quotes");
  // perform actions on the collection object
  client.close();
});

// *code is currently working to this point without the commented code*

console.log(process.env.MONGO_URI)

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {

  client.connect();

  // Make the appropriate DB calls
   databasesList = await client.db().kingram().listDatabases();

   console.log("Databases:");
   databasesList.databases.forEach(db => console.log(` - ${kingramquebec}`));

   kobyCol = await client.db('kingramquebec').listCollections();

   kobyCol.forEach(coll => console.log(` - ${coll.quotes}`));

   console.log(kobyCol.quotes); 


  client.db('kingramquebec').collection('/quotes').find().toArray()
    .then(quotes => {
      res.render('index.ejs', { quotes: quotes })
    })
    .catch(/* ... */)
})


 app.post('/quotes', (req, res) => {
   quotesCollection.insertOne(req.body)
     .then(result => {
       res.redirect('/')
     })
     .catch(error => console.error(error))
 })

 app.put('/quotes', (req, res) => {
   miscquotesCollection.findOneAndUpdate(
     { name: 'Obi Wan Koby' },
     {
       $set: {
         name: req.body.name,
         miscquotes: req.body.quotes
       }
     },
     {
       upsert: true
     }
   )
     .then(result => res.json('Success'))
     .catch(error => console.error(error))
 })

 app.delete('/quotes', (req, res) => {
   miscquotesCollection.deleteOne(
     { name: req.body.name }
   )
     .then(result => {
       if (result.deletedCount === 0) {
         return res.json('No quote to delete')
       }
       res.json('Deleted Darth Barry\'s quote')
     })
     .catch(error => console.error(error))
 })


app.listen(process.env.PORT || 3000,
  () => console.log(`server is running on port: ${process.env.PORT}` ));


