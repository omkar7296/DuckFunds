const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(bodyParser.json());
app.use(cors());

const routes = require('../utils/routes');

app.listen(9000, () => {
    console.log("Listening on port:9000");
})

app.use('/apis/',routes); 

