require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const scoreRoutes = require("./routes/Score");
const usersRoutes = require("./routes/user");
const bodyParser = require('body-parser');

// Express app
const app = express();

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/result", scoreRoutes);
app.use("/api/user", usersRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../Frontend/build")));

// The "catchall" handler: for any request that doesn't match an API route, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/build", "index.html"));
});

// Connect to the database and start the server
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log("Connected to DB and listening on port", process.env.PORT || 4000);
    });
  })
  .catch((error) => {
    console.log(error);
  });
