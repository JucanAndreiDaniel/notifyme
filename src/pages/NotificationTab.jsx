import React from "react";
import { useEffect, useState } from "react";
import Header from "../sections/Header";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import NotiCard from "../components/NotiCard";
import { getNotifications } from "../hooks/notification";
import { Grid } from "@mui/material";

export default function NotificationTab() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getNotifications()
      .then((res) => {
        setNotifications(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setNotifications([]);
      });
  }, []);

  return (
    <React.Fragment>
      {/* Line Below to make the page grey color */}
      <CssBaseline />
      <Header />
      <Container
        disableGutters
        maxWidth="xl"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Grid container>
          {notifications.length > 0 ? (
            notifications?.map((noti, k) => (
              <Grid item>
                <NotiCard noti={noti} key={noti?.id} />
              </Grid>
            ))
          ) : (
            <p>No notifications to show</p>
          )}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
