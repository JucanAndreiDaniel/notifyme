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
    var data = new FormData();
    data.append("crypto_id", coin.id);
    return axios.post(pathString + "/favorites/", data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  } catch (err) {
    throw err;
  }
};

export const deleteFavoriteCoins = async (coin) => {
  try {
    var data = new FormData();
    data.append("crypto_id", coin.id);
    return axios.delete(pathString + "/favorites/", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: data,
    });
  } catch (err) {
    throw err;
  }
};
