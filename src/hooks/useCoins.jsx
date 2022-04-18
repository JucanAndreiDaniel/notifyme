import axios from "axios";
import pathString from "../PathString";

export const getCoins = async (currency,pageIndex,pageSize,coinName) => {
  try {
    console.log(currency)
    return axios.get(pathString + "/coins", {
      params: {
        currency: currency,
        query: coinName,
        pageIndex: pageIndex,
        pageSize: pageSize,
      },
    });
  } catch (err) {
    throw err;
  }
};
