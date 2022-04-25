import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/restros";
const API_URL_REVIEW = "http://localhost:5000/api/v1/review";

export const postService = {
  getRestraunts: async (page) => {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    };
    const restrosData = await axios.get(
      `${API_URL}?page=${page}&limit=2`,
      config
    );
    return {
      data: restrosData.data,
    };
  },

  createRestraunt: async (data) => {
    const { name, location } = data;
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    };
    const restrosData = await axios.post(
      API_URL,
      {
        name,
        location,
      },
      config
    );
    return {
      data: restrosData.data,
    };
  },

  deleteRestraunt: async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    };
    const restrauntAfterDelete = await axios.delete(`${API_URL}/${id}`, config);
    return restrauntAfterDelete;
  },

  updateRestraunt: async (id, data) => {
    const { editName, editLocation } = data;
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    };
    const restrauntAfterUpdate = await axios.patch(
      `${API_URL}/${id}`,
      {
        name: editName,
        location: editLocation,
      },
      config
    );
    return restrauntAfterUpdate.data;
  },
  // ************************************************************************

  getRestro: async (id) => {
    const restro = await axios.get(`${API_URL}/${id}`);
    return {
      data: {
        restro: restro.data,
      },
    };
  },

  addReview: async (data) => {
    const { comment, rating, restroId, createdAt } = data;
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    };
    const newComment = await axios.post(
      API_URL_REVIEW,
      {
        comment,
        rating,
        restroId,
        createdAt,
      },
      config
    );
    return {
      data: newComment.data,
    };
  },

  getReview: async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    };
    const reviews = await axios.get(`${API_URL_REVIEW}/${id}`, config);
    return {
      data: reviews.data,
    };
  },

  deleteReview: async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    };
    const deletedReview = await axios.delete(`${API_URL_REVIEW}/${id}`, config);
    // console.log(deletedReview);
    return {
      data: deletedReview.data,
    };
  },

  updateReview: async (id, data) => {
    const { editComment } = data;
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    };
    // console.log({ editComment, id });
    const updatedReview = await axios.patch(
      `${API_URL_REVIEW}/${id}`,
      {
        comment: editComment,
      },
      config
    );
    // console.log(updatedReview);
    return {
      data: updatedReview.data,
    };
  },
};
