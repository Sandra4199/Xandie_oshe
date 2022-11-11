import express from "express";
import mongoose from "mongoose";
import Blog from "./model/Blog";
import blogRouter from "./model/blog-routes";
import router from "./routes/user-routes";
import cors from "cors";

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
