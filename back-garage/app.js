const express = require('express');
const app = express();

const cors  = require('cors');
const bodyParser = require('body-parser');
require('./DbConnexion');

const reparationsRoute = require('./routes/reparationsRoute');


app.use(bodyParser.json());
app.use(cors());

const userRoute = require('./routes/userRoute');
app.use('/user',userRoute);
app.use('/reparation',reparationsRoute);

app.listen(9000);