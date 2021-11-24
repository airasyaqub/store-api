require('dotenv').config();
require('express-async-errors')
const express = require('express');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');
const app = express();


const connectToDB = require('./db/connect');
const port = process.env.port || 3000



app.use(express.json());

const productsRoute = require("./routes/products");



app.use("/api/v1/products", productsRoute);

app.use(notFound);

app.use(errorHandler);


const start = async () => {
  try {
    await connectToDB(process.env.MONGO_URI);
    console.log('DB connected');
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}.`);
    });
  } catch(err) {
    console.log("error", err);
  }

}


start();


