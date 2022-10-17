require('dotenv').config
const express = require('express')
const path = require('node:path')
const bodyParser = require('body-parser')
const { MongoClient, ServerApiVersion } = require('mongodb');


// const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// *CODE BREAKS @ THE ABOVE LINE OF CODE* 
console.log(process.env.MONGO_URI)

const app = express()

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



