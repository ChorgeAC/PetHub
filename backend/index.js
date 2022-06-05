require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 5000;

const userRouter = require("./routes/user.route");

let cors = require("cors");
app.use(cors());
app.use(express.json());
app.use("/users", userRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connected.."))
  .catch((e) => console.log("error in db connection"));

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
