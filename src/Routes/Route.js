const express = require("express");
// const authModel = require("../model/authmodel");
const router = express.Router();

const {
  signUp,
  getData,
  singleData,
  deleteData,
  updateData,
} = require("../controller/authController");
const { NewSignUp, Login } = require("../controller/authNewController");

//crud

//get all the data
router.get("/", getData);

//post the data
router.post("/", signUp);

//update single  a data
router.patch("/:id", updateData);

//delete a single data
router.delete("/:id", deleteData);

//get a single data
router.get("/:id", singleData);

//end

//login $ signup
router.post("/Login", Login);
router.post("/signUp", NewSignUp);

module.exports = router;
