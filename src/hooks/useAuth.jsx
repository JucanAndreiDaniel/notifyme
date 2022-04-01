import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";
import pathString from "../PathString";

export default function useAuth() {
  let history = useHistory();
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState(null);

  //set user
  const setUserContext = async (username) => {
    setUser(username);
    history.go("/");
  };

  //register user
  const registerUser = async (data) => {
    console.log(data);
    const { username, email, password, passwordConfirm } = data;
    return axios
      .post(pathString + "/api/registration/", {
        username,
        email,
        password,
        passwordConfirm,
      })
      .then((response) => {
        setUserContext(response.data.user);
        //store token in local storage
        localStorage.setItem("token", response.data.access_token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //login user
  const loginUser = async (data) => {
    const { username, password } = data;
    return axios
      .post(pathString + "/api/login/", {
        username,
        password,
      })
      .then((response) => {
        setUserContext(response.data.user);
        localStorage.setItem("token", response.data.access_token);
      })
      .catch((err) => {
        setError(err.response.data.non_field_errors[0].toString());
        console.log(err.response.data.non_field_errors[0]);
      });
  };

  return {
    registerUser,
    loginUser,
    error,
  };
}
