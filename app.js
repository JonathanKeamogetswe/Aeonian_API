require('dotenv').config();
const express = require('express');
const connection = require('./config/config.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/api', require('./routes/user.js'))



app.use('/', (req, res) => {
    res.send('Endpoint')
})

const port = 5000;
app.listen(port, () => {
    console.log('Server started at port ' + port);
})