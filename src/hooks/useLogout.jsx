import { useHistory } from "react-router-dom";
import axios from "axios";
import pathString from "../PathString";

export default function useLogout() {
  let history = useHistory();

  const logoutUser = async () => {
    try {
      axios.defaults.xsrfHeaderName = "X-CSRFToken";
      axios.defaults.xsrfCookieName = "csrftoken";
      await axios
        .post(pathString + "/api/logout/", {
          config: {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        })
        .then((res) => {
          // console.log(res);
          localStorage.removeItem("token");
          history.go("/login");
        })
        .catch((err) => {
          console.log("E:" + err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return {
    logoutUser,
  };
}
