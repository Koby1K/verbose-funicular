require('dotenv').config()
const express = require('express')
const path = require('node:path')
const bodyParser = require('body-parser')
const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'));
app.set('view engine', 'ejs');

// client.connect(err => {
  // const collection = client.db("kingramquebec").collection("miscquotes");
  // perform actions on the collection object
 // client.close();
//});

app.get('/', async (req, res) => {

  client.connect();
 
  // Make the appropriate DB calls
  // databasesList = await client.db().admin().listDatabases();

  // console.log("Databases:");
  // databasesList.databases.forEach(db => console.log(` - ${db.name}`));

  // kobyCol = await client.db('kingramquebec').listCollections();
  
  // kobyCol.forEach(coll => console.log(` - ${coll.name}`));
  
  // console.log(kobyCol.name); 
  

  client.db('kingramquebec').collection('miscquotes').find().toArray()
    .then(quotes => {
      res.render('index.ejs', { miscquotes: quotes })
    })
    .catch(/* ... */)
})


// app.post('/miscquotes', (req, res) => {
//   quotesCollection.insertOne(req.body)
//     .then(result => {
//       res.redirect('/')
//     })
//     .catch(error => console.error(error))
// })

// app.put('/miscquotes', (req, res) => {
//   quotesCollection.findOneAndUpdate(
//     { name: 'Obi Wan Koby' },
//     {
//       $set: {
//         name: req.body.name,
//         miscquotes: req.body.miscquotes
//       }
//     },
//     {
//       upsert: true
//     }
//   )
//     .then(result => res.json('Success'))
//     .catch(error => console.error(error))
// })

// app.delete('/miscquotes', (req, res) => {
//   quotesCollection.deleteOne(
//     { name: req.body.name }
//   )
//     .then(result => {
//       if (result.deletedCount === 0) {
//         return res.json('No quote to delete')
//       }
//       res.json('Deleted Darth Barry\'s quote')
//     })
//     .catch(error => console.error(error))
// })


app.listen(process.env.PORT || 3000,
  () => console.log(`server is running on port: ${process.env.PORT}` ));


