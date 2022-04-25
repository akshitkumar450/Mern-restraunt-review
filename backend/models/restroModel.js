import mongoose from "mongoose";

const restroSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide name"],
  },
  location: {
    type: String,
  },
  image: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&w=1000&q=80",
  },
  rating: {
    type: Number,
    default: 0,
  },
});

const Restro = mongoose.model("restro", restroSchema);
export default Restro;
