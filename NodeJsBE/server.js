const express = require('express')
const routes = require('./routes');
var cors = require('cors')



const app = express()

const corsOptions = {
  origin: '*'
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000
//const PORT = 5000

app.use(routes)

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})

