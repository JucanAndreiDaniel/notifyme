import axios from "axios";
import pathString from "../PathString";

export const getCoins = async () => {
  try {
    return axios.get(pathString + "/coins", {
      params: {
        currency: "usd",
        limit: 15,
      },
    });
  } catch (err) {
    throw err;
  }
};
