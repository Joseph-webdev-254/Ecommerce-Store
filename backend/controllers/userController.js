import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";

import bcrypt from "bcryptjs";
import generateToken from "../utilities/createToken.js";
const createUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    throw new Error("please  fill  all  the  input fields");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).send("user already exists");
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({ userName, email, password: hashedPassword });

  try {
    await newUser.save();

    generateToken(res, newUser._id);
    res.status(201).json({
      _id: newUser._id,
      userName: newUser.userName,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    console.error("error  in saving  the  user :", error.message);

    res.status(400);
    throw new Error("invalid user data", error.message);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const isPassword = await bcrypt.compare(password, existingUser.password);

    if (isPassword) {
      generateToken(res, existingUser._id);

      res.status(201).json({
        _id: existingUser._id,
        userName: existingUser.userName,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      });
      return; //exit the  function
    }
  }
});
const logOut = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0), // Set the cookie to expire immediatelys
  });

  res.status(200).json({
    message: "User logged out successfully",
  });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
    });
  } else {
    es.status(404);
    throw new Error("user  not  found");
  }
});
const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.userName = req.body.userName || user.userName;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      userName: updatedUser.userName,
      email: updatedUser.email,
      password: updatedUser.password,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("user not  found");
  }
});

const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("cannot  delete  Admin");
    }
    await User.deleteOne({ _id: user._id });
    res.status(200).json({ message: "user  deleted  " });
  } else {
    res.status(404);
    throw new Error("user not  found");
  }
});
const getAllUsersById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("user not  found");
  }
});
const updateAllUsersById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    user.userName = req.body.userName || user.userName;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      userName: updatedUser.userName,
      email: updatedUser.email,
      password: updatedUser.password,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("user not  found");
  }
});
export {
  updateAllUsersById,
  deleteUserById,
  createUser,
  updateCurrentUserProfile,
  loginUser,
  logOut,
  getAllUsers,
  getCurrentUserProfile,
  getAllUsersById,
};
