import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/auth";

export const userService = {
  logInUser: async (data) => {
    const { email, password } = data;
    const loggedInUser = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    if (loggedInUser?.data) {
      localStorage.setItem("user", JSON.stringify(loggedInUser.data));
      // console.log(loggedInUser.data);
      return {
        data: loggedInUser.data,
      };
    }
  },

  signUpUser: async (data) => {
    const { name, email, password } = data;
    const createdUser = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password,
    });
    // console.log(createdUser.data);
    return {
      data: createdUser.data,
    };
  },

  getAllUsers: async (page) => {
    const users = await axios.get(`${API_URL}?page=${page}&limit=3`);
    return {
      data: users.data,
    };
  },

  deleteUser: async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return {};
  },

  createUser: async (data) => {
    const { name, email, password } = data;
    await axios.post(`${API_URL}`, {
      name,
      email,
      password,
    });
    return {
      data: {
        name,
        email,
        password,
      },
    };
  },

  updateUser: async (id, data) => {
    const { editName, editEmail, editPassword, isAdmin } = data;
    const updatedUser = await axios.patch(`${API_URL}/${id}`, {
      name: editName,
      email: editEmail,
      password: editPassword,
      isAdmin,
    });
    // console.log(updatedUser.data);
    return {
      data: updatedUser.data,
    };
  },
};
