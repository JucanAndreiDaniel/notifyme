import axios from "axios";
import pathString from "../PathString";

export const getNews = async () => {
  try {
    return axios.get(pathString + "/news/", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  } catch (err) {
    throw err;
  }
};