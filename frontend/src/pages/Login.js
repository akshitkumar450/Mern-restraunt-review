import { Button, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { loginAction } from "../redux/actions/userActions";
import { userService } from "../services/UserServices";

function Login() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("please fill all details");
      return;
    }
    try {
      const user = await userService.logInUser({ email, password });
      if (user.data) {
        dispatch(loginAction(user.data));
        localStorage.setItem("token", JSON.stringify(user.data.token));
        localStorage.setItem("user", JSON.stringify(user.data.user));
        toast.success("logged in");
        setEmail("");
        setPassword("");
        history.push("/");
      } else if (user.error) {
        throw new Error(user.message);
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="h-full w-1/3 mx-auto mt-20">
      <form className="grid gap-y-5">
        <div>
          <TextField
            id="email"
            fullWidth
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="password"
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" onClick={login} variant="contained" fullWidth>
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;
