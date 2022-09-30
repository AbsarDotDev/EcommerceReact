const connectMongo = require('./db');
const express = require('express');
connectMongo();
const app = express()
const port = 5000
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})
var bodyParser = require('body-parser');            
app.use(bodyParser.json({limit:'50mb'})); 
app.use(bodyParser.urlencoded({extended:true, limit:'50mb'})); 
app.use('/api/auth', require('./routes/auth'))
app.use('/api/products', require('./routes/products'))
app.use('/api/todolist', require('./routes/todolist'))

app.listen(port, () => {
  console.log(`Chal gyi at ${port}`)
})