import { Card, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { postService } from "../services/PostServices";
import Rating from "@mui/material/Rating";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

function RestroCard({ restro, handleToggle, avgRating }) {
  const location = useLocation();
  const user = useSelector((state) => state.user.user);
  const [editable, setEditable] = useState(false);
  const [editName, setEditName] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [rating, setRating] = useState(avgRating);

  useEffect(() => {
    setRating(avgRating);
  }, [avgRating]);

  const handleEdit = () => {
    setEditable(true);
    setEditName(restro.name);
    setEditLocation(restro.location);
  };

  const handleSave = async () => {
    try {
      const data = await postService.updateRestraunt(restro._id, {
        editName,
        editLocation,
      });
      setEditable(false);
      handleToggle();
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message);
    }
  };

  const handleDelete = async () => {
    try {
      const data = await postService.deleteRestraunt(restro._id);
      handleToggle();
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.message);
    }
  };

  const handleCancel = () => {
    setEditable(false);
  };

  return (
    <Card className="w-1/2 mx-auto flex">
      <div className="w-60">
        <Link to={`/details/${restro._id}`} key={restro._id}>
          <img
            className="w-full h-full object-cover"
            src={restro.image}
            alt="Live from space album cover"
          />
        </Link>
      </div>
      <div className="ml-5">
        {editable ? (
          <div>
            <input
              type="text"
              value={editName}
              autoFocus
              onChange={(e) => setEditName(e.target.value)}
            />
          </div>
        ) : (
          <h1 className="text-2xl font-semibold">{restro.name}</h1>
        )}

        {editable ? (
          <div>
            <input
              type="text"
              autoFocus
              value={editLocation}
              onChange={(e) => setEditLocation(e.target.value)}
            />
          </div>
        ) : (
          <h1 className="font-semibold">{restro.location}</h1>
        )}

        <div>
          <Rating name="simple-controlled" value={rating} readOnly />
        </div>
        <div>
          {user.isAdmin && (
            <>
              {editable ? (
                <Button
                  className="!mx-5"
                  variant="contained"
                  color="success"
                  onClick={handleSave}
                >
                  save
                </Button>
              ) : (
                <Button
                  className="!mx-5"
                  variant="contained"
                  onClick={handleEdit}
                >
                  Edit
                </Button>
              )}

              {
                <>
                  {editable ? (
                    <Button
                      color="error"
                      variant="outlined"
                      onClick={handleCancel}
                    >
                      cancel
                    </Button>
                  ) : (
                    location.pathname === "/" && (
                      <Button
                        variant="contained"
                        color="error"
                        onClick={handleDelete}
                      >
                        Delete
                      </Button>
                    )
                  )}
                </>
              }
            </>
          )}
        </div>
      </div>
    </Card>
  );
}

export default RestroCard;
