import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { CardMedia } from "@mui/material";
import { Checkbox } from "@mui/material";
import { FormGroup } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { useHistory } from "react-router";
import { addNotification } from "../hooks/notification";

const NotificationModal = ({ open, setOpen, noti, setReload, reload }) => {
  const options = [
    {
      value: "bigger",
      label: "Value Bigger than",
    },
    {
      value: "lower",
      label: "Value Lower than",
    },
    {
      value: "equal",
      label: "Value Equal to",
    },
    {
      value: "g_perc",
      label: "Growth with Percentage",
    },
    {
      value: "d_perc",
      label: "Decrease with Percentage",
    },
  ];

  const history = useHistory();
  const handleClose = () => setOpen(false);
  const [option, setOption] = React.useState("bigger");
  const [value, setValue] = React.useState(0);
  const [check, setCheck] = React.useState(false);

  const handleChange = (e) => {
    setOption(e.target.value);
  };
  const handleChangeValue = (e) => {
    setValue(e.target.value);
  };
  const handleSave = (e) => {
    var notificare = new FormData();
    notificare.append("crypto_id", noti?.coin_id);
    notificare.append("option", option);
    notificare.append("value", value);
    notificare.append("viamail", check);
    notificare.append("currency","usd");
    addNotification(notificare);
    setOpen(false);
    setReload(!reload);
  };

  return (
    <Dialog maxWidth="md" fullWidth={true} open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography variant="h5" align="center">
          Modify Notification
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          spacing={2}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <CardMedia
              component="img"
              sx={{ width: 150 }}
              image={noti?.image}
              alt="noti_image"
            />
          </Grid>
          <Grid item>
            <TextField
              id="outlined-basic"
              label="Value"
              style={{ width: "30vw" }}
              value={value}
              type="number"
              variant="outlined"
              onChange={handleChangeValue}
            />
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Option</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                style={{ width: "30vw" }}
                value={option}
                label="option"
                onChange={handleChange}
              >
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormGroup>
              <FormControlLabel
                // disabled
                control={
                  <Checkbox
                    checked={check}
                    onChange={() => setCheck(!check)}
                    name="checkedB"
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                }
                label="Via Email"
              />
            </FormGroup>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NotificationModal;
