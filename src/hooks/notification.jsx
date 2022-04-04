 import axios from "axios";
import pathString from "../PathString";

export const getNotifications = async () => {
  try {
    return await axios.get(pathString + `/notifications`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  } catch (err) {
    throw err;
  }
};

export const setNotifications = async (notification) => {
  try {
    return await axios.post(pathString + `/notifications`, notification, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  } catch (err) {
    throw err;
  }
};

export const addNotification = async (notification) => {
  try {
    return await axios.post(pathString + `/notifications/create`, notification, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  } catch (err) {
    throw err;
  }
};

export const deleteNotification = async (id) => {
  try {
    return await axios.post(pathString + `/notifications/delete`, id, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  } catch (err) {
    throw err;
  }
};