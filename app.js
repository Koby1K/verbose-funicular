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
      const quotesCollection = db.collection('miscquotes')  

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    db.collection('miscquotes').find().toArray()
      .then(quotes => {
        res.render('index.ejs', { quotes: quotes })
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
      { name: 'BarrySan' },
      {
        $set: {
          name: req.body.name,
          quote: req.body.quote
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
        res.json('Deleted Darth Vadar\'s quote')
      })
      .catch(error => console.error(error))
  })


app.listen(process.env.PORT || 3000,
  () => console.log(`server is running on port: ${process.env.PORT}` ));

})
