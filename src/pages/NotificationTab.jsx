import React from "react";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Header from "../sections/Header";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import NotiCard from "../components/NotiCard";
import { getNotifications } from "../hooks/notification";
import { Grid, Typography } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import NotiSaveModal from "../components/NotiSaveModal";
import { getFavoriteCoins } from "../hooks/useFavorite";
import NotiToast from "../components/NotiToast";

import { useSnackbar } from 'notistack';


export default function NotificationTab() {
  const [notifications, setNotifications] = useState([]);

  const [open, setOpen] = useState(false);
  const [favs, setFavs] = useState([{ coin_id: "" }]);
  const [reload, setReload] = useState(false);

  const style = {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  };

  function checkType(noti) {
    switch (noti.value_type) {
      case "bigger":
        return noti.current > noti.final_value;
      case "lower":
        return noti.current < noti.final_value;
      case "equal":
        return noti.current == noti.final_value;
      case "g_perc":
        return noti.current > noti.final_value;
      case "l_perc":
        return noti.current < noti.final_value;
      default:
        return "";
    }
  }

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const addToast = React.useCallback((noti, k) => {
    enqueueSnackbar(`${noti.name} has reached the value of ${noti.current}`, {
      variant: 'default',
    });
  }, [enqueueSnackbar, closeSnackbar]);

  React.useEffect(() => {
    getNotifications()
      .then((res) => {
        res.data.map((noti, k) => {
          if (checkType(noti)) {
            addToast(noti, k);
          }
        });
        setNotifications(res.data);
      })
      .catch((err) => {
        console.log(err);
        setNotifications([]);
      });
  }, [reload]);

  useEffect(() => {
    getFavoriteCoins()
      .then((res) => {
        if (res.data.length == 0) {
          setFavs([{ coin_id: "" }]);
        } else {
          setFavs(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setFavs({});
      });
  }, []);

  return (
    <>
      <NotiSaveModal
        open={open}
        setOpen={setOpen}
        favs={favs}
        setReload={setReload}
        reload={reload}
      />
      <CssBaseline />
      <Header />
      <Container
        disableGutters
        maxWidth="xl"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Grid
          container
          direction="row"
          justifyContent={notifications.length > 0 ? "flex-start" : "center"}
          alignItems="center"
          spacing={2}
        >
          {notifications.length > 0 ? (
            notifications?.map((noti, k) => (
              <Grid item>
                <NotiCard
                  noti={noti}
                  key={noti?.id}
                  reload={reload}
                  setReload={setReload}
                />
              </Grid>
            ))
          ) : (
            <Grid item>
              <Typography>No notifications to show</Typography>
            </Grid>
          )}
        </Grid>
        <Fab
          onClick={() => setOpen(true)}
          style={style}
          color="primary"
          aria-label="add"
        >
          <AddIcon />
        </Fab>
      </Container>
    </>
  );
}
