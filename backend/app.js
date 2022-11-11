const express = require("express");
const mongoose = require("mongoose");

const blogRouter = require("../backend/routes/blog-routes");
const router = require("./routes/user-routes");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 9000;

app.use("/api/user", router);
app.use("/api/blog", blogRouter);

mongoose
  .connect(
    "mongodb+srv://Admin:nonyenvene@cluster0.6duuxdm.mongodb.net/Blog?retryWrites=true&w=majority"
  )
  .then(() =>
    app.listen(port, (_) => console.log("Server started on port " + port))
  )
  .then(() =>
    console.log("connected To Database and Listening To Localhost", port)
  )
  .catch((err) => console.log(err));

// app.listen(5000);
