import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      throw new Error("email already in use");
    }
    if (!name || !email || !password) {
      throw new Error("Please provide all values");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, "super-secret", {
      expiresIn: "2d",
    });
    res.status(201).json({
      status: "success",
      user,
      token,
    });
  } catch (err) {
    let errorMsg = err.message || "something went wrong";
    if (err.name === "ValidationError") {
      errorMsg = Object.values(err.errors)
        .map((item) => item.message)
        .join(",");
    }
    res.status(400).json({
      status: "fail",
      message: errorMsg,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // to select the password explicitlity as we have select:false in model
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("No email found");
    }
    if (!email || !password) {
      throw new Error("Please provide all values");
    }
    const correctPassword = await bcrypt.compare(password, user.password);
    if (correctPassword) {
      const token = jwt.sign({ id: user._id }, "super-secret", {
        expiresIn: "2d",
      });
      res.status(201).json({
        status: "success",
        user,
        token,
      });
    } else {
      throw new Error("email or password do not match");
    }
  } catch (err) {
    let errorMsg = err.message || "something went wrong";
    if (err.name === "ValidationError") {
      errorMsg = Object.values(err.errors)
        .map((item) => item.message)
        .join(",");
    }
    res.status(400).json({
      status: "fail",
      message: errorMsg,
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 3;
    const skipVal = (page - 1) * limit;
    const users = await User.find().skip(skipVal).limit(limit);
    const totalUsers = await User.countDocuments();
    const numOfPages = Math.ceil(totalUsers / limit);
    res.status(200).json({
      status: "success",
      users,
      numOfPages,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      throw new Error("email already in use");
    }
    if (!name || !email || !password) {
      throw new Error("Please provide all values");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({
      status: "success",
      user,
    });
  } catch (err) {
    let errorMsg = err.message || "something went wrong";
    if (err.name === "ValidationError") {
      errorMsg = Object.values(err.errors)
        .map((item) => item.message)
        .join(",");
    }
    res.status(400).json({
      status: "fail",
      message: errorMsg,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      throw new Error("no user found to delete");
    }
    await User.findByIdAndDelete(id);
    res.json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, isAdmin } = req.body;
    const user = await User.findById(id).select("+password");
    console.log(user);
    if (!user) {
      throw new Error("no user found");
    }
    let newPassword;
    if (password !== "") {
      const salt = await bcrypt.genSalt(10);
      newPassword = await bcrypt.hash(password, salt);
    } else {
      newPassword = user.password;
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, password: newPassword, isAdmin },
      {
        runValidators: true,
        new: true,
      }
    );

    res.status(201).json({
      status: "success",
      user: updatedUser,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
