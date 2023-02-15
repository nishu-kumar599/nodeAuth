const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const useRouter = require("./src/Routes/Route");
const config = process.env;

const app = express();

mongoose.set("strictQuery", false);
//middleware
app.use((req, res, next) => {
  // console.log(req.path, req.method);
  next();
});

//db connection
mongoose
  .connect(config.MONG_URI)
  .then(() => {
    //listen
    app.listen(config.PORT, () => {
      console.log(`listing on port ${config.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

//route
app.use(express.json());
app.use(cors());
app.use("/api", useRouter);
