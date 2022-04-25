import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  comment: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  rating: {
    type: Number,
  },
  user: {
    type: Object,
  },
  restroId: {
    type: mongoose.Types.ObjectId,
    ref: "restro",
    required: [true, "Please provide restro"],
  },
});

const Review = mongoose.model("restroReview", reviewSchema);
export default Review;
