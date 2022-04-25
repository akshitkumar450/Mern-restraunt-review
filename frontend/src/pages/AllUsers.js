import { Button, Card, Pagination, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserCard from "../components/UserCard";
import { userService } from "../services/UserServices";

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [toggleForm, setToggleForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [role, setRole] = useState("");
  const [toggle, setToggle] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userService.getAllUsers(page);
        if (data.data.users.length === 0) {
          setPage(page - 1);
        }
        setTotalPages(data.data.numOfPages);
        setUsers(data.data.users);
      } catch (err) {
        console.log(err.message);
        toast.error(err.response.data.message);
      }
    };
    fetchUsers();
  }, [toggle, page, totalPages]);

  const resetFormValues = () => {
    setEmail("");
    setName("");
    setPassword("");
  };

  const handleCancel = () => {
    setToggleForm(false);
    resetFormValues();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToggleForm(false);

    try {
      const data = await userService.createUser({
        name,
        email,
        password,
      });
      handleToggle(false);
      resetFormValues();
      toast.success("user added");
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="grid">
      {toggleForm && (
        <Card className="!w-1/2 mx-auto p-5 my-5 ">
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
                placeholder="email"
                label="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <TextField
                fullWidth
                id="outlined-basic"
                placeholder="password"
                label="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" variant="contained">
                Add User
              </Button>
              <Button onClick={handleCancel} color="error" variant="contained">
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {!toggleForm && (
        <div className="mx-auto my-10">
          <Button
            type="submit"
            onClick={() => setToggleForm(true)}
            variant="contained"
          >
            Add New User
          </Button>
        </div>
      )}

      <>
        {users?.map((user) => (
          <UserCard key={user._id} user={user} handleToggle={handleToggle} />
        ))}
      </>

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

export default AllUsers;
