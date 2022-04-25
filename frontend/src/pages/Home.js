import React, { useEffect, useState } from "react";
import RestroCard from "../components/RestroCard";
import { postService } from "../services/PostServices";
import Pagination from "@mui/material/Pagination";
import { useSelector } from "react-redux";
import { Button, Card, TextField } from "@mui/material";
import { toast } from "react-toastify";

export default function Home() {
  const [restros, setRestros] = useState([]);
  const user = useSelector((state) => state.user.user);
  const [toggleForm, setToggleForm] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      try {
        const data = await postService.getRestraunts(page);
        if (data.data.restros.length > 0) {
        }
        if (data.data.restros.length === 0) {
          setPage(page - 1);
        }
        setRestros(data.data.restros);
        setTotalPages(data.data.numOfPages);
      } catch (err) {
        toast.error("error fetching data");
      }
    }, 10);
    return () => {
      clearTimeout(timeout);
    };

    // const fetchData = async () => {
    //   try {
    //     const data = await postService.getRestraunts(page);
    //     if (data.data.restros.length > 0) {
    //     }
    //     if (data.data.restros.length === 0) {
    //       setPage(page - 1);
    //     }
    //     setRestros(data.data.restros);
    //     setTotalPages(data.data.numOfPages);
    //   } catch (err) {
    //     toast.error("error fetching data");
    //   }
    // };
    // fetchData();
  }, [toggle, page, totalPages]);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await postService.createRestraunt({ name, location });
      toast.success("added");
      setLocation("");
      setName("");
      setToggleForm(false);
      handleToggle();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="grid gap-y-3 my-10">
      {user.isAdmin && toggleForm && (
        <Card className="!w-1/2 mx-auto p-5 ">
          <form onSubmit={handleSubmit} className="grid gap-y-3">
            <div>
              <TextField
                fullWidth
                id="outlined-basic"
                label="name"
                placeholder="name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <TextField
                fullWidth
                id="outlined-basic"
                placeholder="location"
                label="location"
                variant="outlined"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="flex gap-2 ">
              <Button type="submit" variant="contained">
                Add Restraunt
              </Button>
              <Button
                color="error"
                onClick={() => setToggleForm(false)}
                variant="contained"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {user.isAdmin && !toggleForm && (
        <div className="mx-auto mb-10">
          <Button
            type="submit"
            onClick={() => setToggleForm(true)}
            variant="contained"
          >
            Add New Restraunt
          </Button>
        </div>
      )}

      {restros?.map((restro) => (
        <RestroCard
          key={restro._id}
          restro={restro}
          handleToggle={handleToggle}
        />
      ))}

      <Pagination
        count={totalPages}
        page={page}
        className="mx-auto my-10"
        onChange={(event, value) => {
          setPage(value);
        }}
      />
    </div>
  );
}
