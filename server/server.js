const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const multer = require("multer");
const cors = require("cors");

dotenv.config({ path: "./config.env" });
app.use(express.json());
app.use(cors());
//<><><>><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><
// mongo db connection
const connectionString = process.env.MONGODB_URL;

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("THE APP IS CONNECTED TO MONGODB"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);

//--------------------------------------------------------------------------------------------------------------------------

app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message || "nada"
  })
})
//server liten on port 3001
app.listen(3001, () => {
  console.log("server runing on port 3001");
});