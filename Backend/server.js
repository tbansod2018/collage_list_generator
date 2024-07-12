require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const scoreRoutes = require("./routes/Score");
const usersRoutes = require("./routes/user");
const bodyParser = require('body-parser');

//express app
const app = express();

//middleware
app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use("/api/result", scoreRoutes);
app.use("/api/user", usersRoutes);

//connect to db

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for request
    app.listen(process.env.PORT, () => {
      console.log("Connectedd to db and Listening on port 4000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
