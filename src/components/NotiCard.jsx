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
import { deleteNotification } from "../hooks/notification";

const PostCard = ({ noti, key, reload, setReload }) => {
  const [checked, setChecked] = React.useState(noti?.enabled);
  const [open, setOpen] = React.useState(false);

  const handleChange = (e) => {
    setChecked(e.target.checked);
  };

  const handleDelete = () =>{
    var formdata = new FormData();
    formdata.append("id",noti.id);
    deleteNotification(formdata);
    setReload(!reload);
  }

  return (
    <>
      <NotificationModal open={open} setOpen={setOpen} noti={noti} />

      <Container key={key}>
        <Card>
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
                  onChange={handleChange}
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
                <IconButton onClick={handleDelete} aria-label="delete" size="large" color="error">
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
