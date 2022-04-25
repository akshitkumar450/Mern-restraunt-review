import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import { postService } from "../services/PostServices";

function Review({ comment, user, date, reviewRating, id, handleToggle }) {
  const currUser = useSelector((state) => state.user.user);
  console.log(user, currUser);
  const [rating, setRating] = useState(reviewRating);
  const [editable, setEditable] = useState(false);
  const [editComment, setEditComment] = useState(comment);
  useEffect(() => {
    setRating(reviewRating);
  }, [reviewRating]);

  const handleSave = async () => {
    try {
      const updatedReview = await postService.updateReview(id, { editComment });
      setEditable(false);
      handleToggle();
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.message);
    }
  };

  const handleEdit = () => {
    setEditable(true);
    setEditComment(comment);
  };

  const handleCancel = () => {
    setEditable(false);
  };

  const handleDelete = async () => {
    try {
      await postService.deleteReview(id);
      handleToggle();
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="ring-1 ring-gray-300 p-2 rounded-lg bg-gray-300">
      <p className="font-bold">{user.name}</p>

      {editable ? (
        <input
          value={editComment}
          onChange={(e) => setEditComment(e.target.value)}
        />
      ) : (
        <p className="italic">{comment}</p>
      )}

      <p className="font-semibold">{new Date(date).toDateString()}</p>
      <Rating name="simple-controlled" value={rating} readOnly />
      {(user._id.toString() === currUser._id.toString() ||
        currUser.isAdmin) && (
        <>
          {editable ? (
            <div>
              <Button variant="contained" color="success" onClick={handleSave}>
                Save
              </Button>
              <Button
                variant="outlined"
                color="error"
                className="!m-2"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <div>
              <Button variant="contained" onClick={handleEdit}>
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                className="!m-2"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Review;
