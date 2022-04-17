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
import { Checkbox } from "@mui/material";
import { FormGroup } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { addNotification } from "../hooks/notification";
import { useHistory } from "react-router";

const NotiSaveModal = ({ open, setOpen, favs, setReload, reload }) => {
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
  const [option, setOption] = React.useState("bigger");
  const [value, setValue] = React.useState(0);
  const [check, setCheck] = React.useState(false);
  const [favOption, setFavOption] = React.useState({});

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setOption(e.target.value);
  };

  const handleChangeValue = (e) => {
    setValue(e.target.value);
  };

  const handleChangeFav = (e) => {
    setFavOption(e.target.value);
    setValue(
      favs.find((favourite) => {
        return favourite.coin_id == e.target.value;
      }).current
    );
  };

  const handleSave = () => {
    var notificare = new FormData();
    const va = favs.find(elem => favOption === elem.coin_id);
    notificare.append("crypto_id", va.id)
    // notificare.append("crypto_id", favOption);
    notificare.append("option", option);
    notificare.append("value", value);
    notificare.append("viamail", check);
    notificare.append("currency","usd");
    addNotification(notificare);
    setOpen(false);
    setReload(!reload);
  };

  React.useEffect(() => {
    setFavOption(favs[0].coin_id);
    setValue(favs[0].current);
  }, [favs]);

  return (
    <Dialog maxWidth="sm" fullWidth={true} open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography variant="h5" align="center">
          Create Notification
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
          {/* <Grid item>
            <CardMedia
              component="img"
              sx={{ width: 150 }}
              image={favs?.image}
              alt="noti_image"
            />
          </Grid> */}
          <Grid item>
            <FormControl margin="dense" fullWidth>
              <InputLabel id="select-fav-label">Coin</InputLabel>
              <Select
                labelId="select-fav-label"
                id="select-fav"
                style={{ width: "30vw" }}
                value={favOption}
                label="fav"
                onChange={handleChangeFav}
              >
                {favs.map((fav, id) => (
                  <MenuItem key={id} value={fav.coin_id}>
                    {fav.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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

export default NotiSaveModal;
