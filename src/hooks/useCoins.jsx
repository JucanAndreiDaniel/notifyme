import axios from "axios";
import pathString from "../PathString";

export const getCoins = async (currency) => {
  try {
    console.log(currency)
    return axios.get(pathString + "/coins", {
      params: {
        currency: currency,
        limit: 15,
      },
    });
  } catch (err) {
    throw err;
  }
};
