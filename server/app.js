const express = require('express');
const app = express();
require('dotenv').config(); 
const bodyParser = require('body-parser');
const port = 8000;
const router = express.Router();
const cors = require('cors')

const corsOptions = {
  allowedHeaders: ['origin', 'x-requested-with', 'content-type', 'accept', 'authorization'],
  credentials: false,
  origin: '*',
}
app.use(cors(corsOptions))
app.options('*', cors()) // include before other routes
app.use(cors());


app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})
var routes = require('./routes/index.js');
app.use('/api/v1', routes(router));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})