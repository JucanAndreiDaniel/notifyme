import React from "react";
import { Snackbar } from "@mui/material";
import { Button } from "@mui/material";

export default function NotiToast({ noti, key }) {
  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button
        onClick={handleClose}
      >
        Close
      </Button>
    </React.Fragment>
  );

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={ noti.name + " has reached " + noti.current }
        action={action}
      />
    </>
  );
}
