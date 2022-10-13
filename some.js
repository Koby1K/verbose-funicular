require('dotenv').config
const express = require('express')
const path = require('node:path')
const bodyParser = require('body-parser')
const { MongoClient, ServerApiVersion } = require('mongodb');


// const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// *CODE BREAKS @ THE ABOVE LINE OF CODE* 
console.log(process.env.MONGO_URI)

const app = express()

