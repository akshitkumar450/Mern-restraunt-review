import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide name"],
  },
  email: {
    type: String,
    required: [true, "please provide email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide provide"],
    select: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("restroUser", userSchema);
export default User;
