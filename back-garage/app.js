const express = require('express');
const app = express();

const cors  = require('cors');
const bodyParser = require('body-parser');
require('./DbConnexion');

app.use(bodyParser.json());
app.use(cors());

const userRoute = require('./routes/userRoute');
const reparationsRoute = require('./routes/reparationsRoute');

app.use('/user',userRoute);
app.use('/reparation',reparationsRoute);

app.listen(9000);