const express = require('express')
const routes = require('./routes');

// Costanti
const PORT = process.env.PORT || 5000

//  Gestione CORS
var cors = require('cors')
const corsOptions = {
  origin: '*',
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: false
};


// app express
const app = express()
app.use(cors(corsOptions));


app.use(routes)
app.get('/test', function(req, res){
  res.send('id: ' + 'req.query.id');
});
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})

