const authModel = require("../model/authmodel");
const mongoose = require("mongoose");
//crud controller

//get all the data
const getData = async (req, res) => {
  const auth = await authModel.find({}).sort({ createdAt: -1 });
  res.status(200).json(auth);
};

//get a single data
const singleData = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ eroro: "no such type of data" });
  }
  const auth = await authModel.findById(id);
  if (!auth) {
    return res.status(400).json({ error: "no such data exist" });
  }
  res.status(200).json(auth);
};

//post the data
const signUp = async (req, res) => {
  const { email, password } = req.body;
  try {
    const auth = await authModel.create({ email, password });
    res.status(200).json(auth);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//update single  a data
const updateData = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such document" });
  }
  const auth = await authModel.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!auth) {
    res.status(400).json({ error: "no such document" });
  }
  res.status(200).json(auth);
};

//delete a single data
const deleteData = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such document" });
  }
  const auth = await authModel.findByIdAndDelete({ _id: id });
  if (!auth) {
    res.status(400).json({ error: "no such document" });
  }
  res.status(200).json(auth);
};

module.exports = {
  signUp,
  getData,
  singleData,
  updateData,
  deleteData,
};
