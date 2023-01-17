const express = require('express');
const app = express();

const cors  = require('cors');
const bodyParser = require('body-parser');
require('./DbConnexion');

const reparationsRoute = require('./routes/reparationsRoute');
const pieceRoute = require('./routes/pieceRoute');

app.use(bodyParser.json());
app.use(cors());

const userRoute = require('./routes/userRoute');
app.use('/user',userRoute);
app.use('/reparation',reparationsRoute);
app.use('/piece',pieceRoute);

app.listen(9000);