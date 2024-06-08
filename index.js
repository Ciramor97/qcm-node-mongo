const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

require('dotenv/config');

const port = 3000;
const connection_url = process.env.CONNECTION_STRING;

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());


//Routes
const quizRouter = require('./routes/quiz')
const orderRouter = require('./routes/order')


const api = process.env.API_URL;


app.use(`${api}/quiz`,quizRouter )

app.use(`${api}/order`,orderRouter)



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


  const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "API pour qualifier un chantier de dépannage",
        version: "0.1.0",
        description:
          "This is a simple API application made with Express and MongoDB. It helps to qualify a chantier and make order to be help by artisan",
      },
      servers: [
        {
          url: "http://localhost:3000/api/v1",
        },
      ],
    },
    apis: ["./routes/*.js"],
  };
  
  const specs = swaggerJsDoc(options);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs,{explorer:true})
  );

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
