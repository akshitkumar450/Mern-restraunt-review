import { TextareaAutosize, Button, Rating } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Review from "../components/Review";
import RestroCard from "../components/RestroCard";
import { postService } from "../services/PostServices";
import Loader from "../components/Loader";

function Details() {
  const { id } = useParams();
  const [restro, setRestro] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [avgRating, setAvgRating] = useState(0);
  const [highestRating, setHighestRating] = useState("");
  const [lowestRating, setLowestRating] = useState("");
  const [currentRating, setCurrentRating] = useState("");
  const [loading, setLoading] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    const fetchRestro = async (id) => {
      try {
        setLoading(true);
        const restro = await postService.getRestro(id);
        setRestro(restro.data.restro.restro);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchRestro(id);
  }, [id, toggle]);

  useEffect(() => {
    const fetchReview = async (id) => {
      try {
        const reviews = await postService.getReview(id);
        // console.log(reviews.data);
        setAvgRating(reviews.data.avgRating);
        setLowestRating(reviews.data.lowestRating);
        setHighestRating(reviews.data.highestRating);
        setCurrentRating(reviews.data.currentRating);
        setReviews(reviews.data.reviews);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchReview(id);
  }, [id, toggle]);

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const data = await postService.addReview({
        comment,
        rating,
        restroId: id,
        createdAt: Date.now(),
      });
      setComment("");
      setRating(0);
      handleToggle();
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="p-5">
      {loading ? (
        <Loader loading={loading} />
      ) : restro ? (
        <>
          <RestroCard
            avgRating={avgRating}
            restro={restro}
            handleToggle={handleToggle}
          />
          <div className="w-full flex flex-col items-center mx-auto my-10">
            <TextareaAutosize
              aria-label="minimum height"
              minRows={3}
              placeholder="Maximum 50 character"
              value={comment}
              onChange={(e) => setComment(e.target.value.trim())}
              className="w-1/2 outline-none border-0 ring-1 ring-gray-400 rounded-lg p-2"
            />

            <Rating
              className="my-10"
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />

            <Button
              disabled={!comment}
              onClick={addComment}
              variant="contained"
            >
              Add Comment
            </Button>
          </div>

          {/* {reviews.map((review) => (
            <Review
              key={review._id}
              id={review._id}
              name={review?.user?.name}
              comment={review?.comment}
              date={review?.createdAt}
              reviewRating={review?.rating}
              handleToggle={handleToggle}
            />
          ))} */}

          <div className="flex mx-auto max-w-5xl gap-5 justify-center">
            {/* lowestRating */}
            <div className="w-1/3">
              <h1 className="text-center">Lowest Rating</h1>
              {lowestRating && (
                <Review
                  id={lowestRating._id}
                  user={lowestRating?.user}
                  comment={lowestRating?.comment}
                  date={lowestRating?.createdAt}
                  reviewRating={lowestRating?.rating}
                  handleToggle={handleToggle}
                />
              )}
            </div>

            {/* highest rating */}
            <div className="w-1/3">
              <h1 className="text-center">highest Rating</h1>
              {highestRating && (
                <Review
                  id={highestRating._id}
                  user={highestRating?.user}
                  comment={highestRating?.comment}
                  date={highestRating?.createdAt}
                  reviewRating={highestRating?.rating}
                  handleToggle={handleToggle}
                />
              )}
            </div>

            {/* current rating */}
            {currentRating && (
              <div className="w-1/3">
                <h1 className="text-center">current Rating</h1>
                <Review
                  id={currentRating._id}
                  user={currentRating?.user}
                  comment={currentRating?.comment}
                  date={currentRating?.createdAt}
                  reviewRating={currentRating?.rating}
                  handleToggle={handleToggle}
                />
              </div>
            )}
          </div>
        </>
      ) : (
        <h1 className="text-4xl text-center">No Data for {id}</h1>
      )}
    </div>
  );
}

export default Details;
