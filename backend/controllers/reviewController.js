import Review from "../models/reviewModel.js";
import User from "../models/userModel.js";

export const addReview = async (req, res) => {
  try {
    // console.log(req.userId);
    const userId = req.userId;
    const { comment, rating, restroId, createdAt } = req.body;
    const user = await User.findById(userId);
    const addedReview = await Review.create({
      comment,
      rating,
      restroId,
      createdAt,
      user,
    });
    res.json({
      status: "success",
      review: addedReview,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const getReview = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const currentReview = await Review.find({ restroId: id }).sort({
      createdAt: "asc",
    });
    const reviews = await Review.find({ restroId: id }).sort({
      rating: "asc",
    });

    // console.log(reviews);
    let rating = 0;
    reviews.forEach((review) => (rating += review.rating));
    // console.log(Math.round(rating / reviews.length));
    // console.log(currentReview[currentReview.length - 1]);
    const currentRating = currentReview[currentReview.length - 1];
    const lowestRating = reviews[0];
    const highestRating = reviews[reviews.length - 1];
    res.json({
      status: "success",
      reviews,
      lowestRating,
      highestRating,
      currentRating,
      avgRating: Math.round(rating / reviews.length),
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);
    const userId = req.userId;

    if (!review) {
      throw new Error("no review to be deleted");
    }
    if (userId.toString() !== review.user._id.toString()) {
      throw new Error("not allowed");
    }
    await Review.findByIdAndDelete(id);
    res.json({
      status: "success",
      data: null,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    const userId = req.userId;
    const review = await Review.findById(id);
    if (!review) {
      throw new Error("no review to be deleted");
    }
    if (userId.toString() !== review.user._id.toString()) {
      throw new Error("not allowed");
    }
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { comment },
      {
        runValidators: true,
        new: true,
      }
    );
    res.json({
      status: "success",
      updatedReview,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
