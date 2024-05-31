const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const cors = require('cors');
require('dotenv/config');

const port = 3000;

// app.use(cors());
// app.options('*', cors());

app.use(bodyParser.json());

// const quizResponseRoutes = require('./routes/categories');

const api = process.env.API_URL;

//Routes
const quizRouter = require('./routes/quiz')
// const answerRouter = require('./routes/answer')


const connection_url = process.env.CONNECTION_STRING;
app.use(`${api}/quiz`, quizRouter );

mongoose
  .connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'qcmDB',
  })
  .then(() => {
    console.log('Database Connection is ready...');
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
