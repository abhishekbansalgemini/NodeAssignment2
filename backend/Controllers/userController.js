const express = require("express");
const userModel = require("../Models/user");

const createUser = async (req, res) => {
  try {
    const { name, gender, email, number, category, tech } = req.body;
    const profileImage = req.file ? req.file.filename : undefined;

    const newUser = await userModel.create({
      name,
      gender,
      email,
      number,
      category,
      tech,
      profileImage,
    });

    res.json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

const getAllUsers = async (req, res) => {
  res.json(await userModel.find());
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  res.json(await userModel.findByIdAndDelete(id));
};

const getParticularUser = async (req, res) => {
  const { id } = req.params;
  res.json(await userModel.findById(id));
};

const getParticularFile = (req, res) => {
  const { filename } = req.params;
  res.sendFile("D:/ReactJS/Assignment2/backend/public/uploads/" + filename);
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, gender, email, number, category, tech } = req.body;
    const profileImage = req.file ? req.file.filename : undefined;

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      {
        name,
        gender,
        email,
        number,
        category,
        tech,
        profileImage,
      },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update user" });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  deleteUser,
  getParticularUser,
  getParticularFile,
  updateUser,
};
