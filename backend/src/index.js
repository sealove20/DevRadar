const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
const app = express();
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

app.use(cors({ origin: process.env.CORS_URL }));
app.use(express.json());
app.use(routes);

app.listen(process.env.APP_PORT);
