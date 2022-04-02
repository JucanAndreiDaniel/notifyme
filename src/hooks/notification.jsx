import axios from "axios";
import pathString from "../PathString";

export const getNotifications = async () => {
  try {
    const res = await axios.get(pathString + `/notifications`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return res;
  } catch (err) {
    throw err;
  }
};

export const setNotifications = async (notification) => {
  try {
    const res = await axios.post(pathString + `/notifications`, notification, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return res;
  } catch (err) {
    throw err;
  }
};
