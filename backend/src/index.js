const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const routes = require("./routes");
const { setupWebsocket } = require("./websocket");
require("dotenv").config();

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

app.use(cors({ origin: process.env.CORS_URL }));
app.use(express.json());
app.use(routes);

server.listen(process.env.APP_PORT);
