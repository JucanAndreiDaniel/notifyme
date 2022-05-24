import React from "react";
import Card from "@mui/material/Card";
import {
  CardContent,
  Container,
  Typography,
  CardActions,
  Switch,
  IconButton,
  CardMedia,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import NotificationModal from "../components/NotificationModal";
import { addNotification, deleteNotification } from "../hooks/notification";

const PostCard = ({ noti, key, reload, setReload }) => {
  const [checked, setChecked] = React.useState(noti?.enabled);
  const [open, setOpen] = React.useState(false);
  const [complete, setComplete] = React.useState(false);

  const handleEnable = (e) => {
    setChecked(e.target.checked);
    var formdata = new FormData();
    formdata.append("crypto_id", noti.coin_id);
    formdata.append("state", e.target.checked);
    formdata.append("option", noti.value_type);
    formdata.append("value", noti.final_value);
    formdata.append("viamail", noti.check);
    formdata.append("currency", "usd");
    addNotification(formdata);
    setReload(!reload);
  };

  const handleDelete = () => {
    deleteNotification(noti.coin_id);
    setReload(!reload);
  };

  React.useEffect(() => {
    var operator = noti.value_type;
    switch (operator) {
      case "bigger":
        if (noti.final_value < noti.current) {
          setComplete(true);
        }
        break;
      case "lower":
        if (noti.final_value > noti.current) {
          setComplete(true);
        }
        break;
      case "equal":
        if (noti.final_value == noti.current) {
          setComplete(true);
        }
        break;
      case "g_perc":
        if (noti.final_value < noti.current) {
          setComplete(true);
        }
        break;
      case "d_perc":
        if (noti.final_value > noti.current) {
          setComplete(true);
        }
        break;
      default:
        setComplete(false);
        break;
    }
  }, []);

  return (
    <>
      <NotificationModal
        open={open}
        setOpen={setOpen}
        noti={noti}
        reload={reload}
        setReload={setReload}
      />

      <Container key={key}>
        <Card
          style={complete ? { borderStyle: "solid", borderColor: "green" } : {}}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {/* <img src={noti?.image} alt="new" style={{height:140}}/> */}
            <CardMedia
              component="img"
              sx={{ width: 150 }}
              image={noti?.image}
              alt="green iguana"
            ></CardMedia>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {noti?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Initial Value: {noti?.initial_value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Option: {noti?.value_type}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Final Value: {noti?.final_value}
              </Typography>

              <CardActions>
                <Typography>On/Off</Typography>
                <Switch
                  checked={checked}
                  onChange={handleEnable}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <IconButton
                  onClick={() => setOpen(true)}
                  type="button"
                  aria-label="edit"
                  size="large"
                  color="warning"
                >
                  <EditIcon fontSize="inherit" />
                </IconButton>
                <IconButton
                  onClick={handleDelete}
                  aria-label="delete"
                  size="large"
                  color="error"
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </CardActions>
            </CardContent>
          </div>
        </Card>
      </Container>
    </>
  );
};

export default PostCard;
