require('dotenv').config
const express = require('express')
const path = require('node:path')
const bodyParser = require('body-parser')

// *code is currently working to this point without the commented code*

// const { MongoClient, ServerApiVersion } = require('mongodb');


// const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

console.log(process.env.MONGO_URI)

const app = express()

// Replace process.env.DB_URL with your actual connection string

// const { MongoClient, ServerApiVersion } = require('mongodb');

//const uri = "mongodb+srv://kingram:<password>@cluster0.mzkvvap.mongodb.net/?retryWrites=true&w=majority";

// const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'));
app.set('view engine', 'ejs');

// client.connect(err => {
  // const collection = client.db("kingramquebec").collection("miscquotes");
  // perform actions on the collection object
 // client.close();
//});


app.get('/', (req, res) => {
    db.collection('miscquotes').find().toArray()
      .then(quotes => {
        res.render('index.ejs', { miscquotes: miscquotes })
      })
      .catch(/* ... */)
  })

  app.post('/miscquotes', (req, res) => {
    quotesCollection.insertOne(req.body)
      .then(result => {
        res.redirect('/')
      })
      .catch(error => console.error(error))
  })

  app.put('/miscquotes', (req, res) => {
    quotesCollection.findOneAndUpdate(
      { name: 'Obi Wan Koby' },
      {
        $set: {
          name: req.body.name,
          miscquotes: req.body.miscquotes
        }
      },
      {
        upsert: true
      }
    )
      .then(result => res.json('Success'))
      .catch(error => console.error(error))
  })

  app.delete('/miscquotes', (req, res) => {
    quotesCollection.deleteOne(
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


