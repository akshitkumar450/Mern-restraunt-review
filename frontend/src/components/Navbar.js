import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logoutAction } from "../redux/actions/userActions";

function NavBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user.user);

  const logout = () => {
    dispatch(logoutAction());
    localStorage.clear();
    history.push("/");
  };

  const showAllUsers = () => {
    history.push("/users");
  };

  return (
    <div
      className="sticky z-10 top-0 w-full bg-blue-500 text-white flex items-center justify-around 
    h-16 "
    >
      <h2 className="text-3xl cursor-pointer">
        <Link to="/">Restro-App</Link>
      </h2>
      <div className="flex items-center justify-between">
        {!user ? (
          navigations.map((nav, idx) => (
            <h2
              key={idx}
              className={`text-2xl cursor-pointer ${nav.margin && "mx-10"}`}
            >
              <Link to={`${nav.link}`}>{nav.name}</Link>
            </h2>
          ))
        ) : (
          <>
            {user.isAdmin && (
              <h2 className="text-2xl cursor-pointer" onClick={showAllUsers}>
                All Users
              </h2>
            )}
            <h2 className="text-2xl cursor-pointer ml-5" onClick={logout}>
              Logout
            </h2>
          </>
        )}
      </div>
    </div>
  );
}
export default NavBar;

const navigations = [
  {
    name: "Login",
    link: "/",
  },
  {
    name: "SignUp",
    link: "/signup",
    margin: true,
  },
];
