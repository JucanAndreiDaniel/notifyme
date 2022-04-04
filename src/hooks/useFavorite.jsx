import axios from "axios";
import pathString from "../PathString";

export const getFavoriteCoins = async () => {
  try {
    return axios.get(pathString + "/favorites", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  } catch (err) {
    throw err;
  }
};

export const setFavoriteCoins = async (coin) => {
  try {
    return axios.post(pathString + "/favorites/", coin, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  } catch (err) {
    throw err;
  }
};
