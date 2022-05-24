import React from "react";
import Card from "@mui/material/Card";
import {
  CardContent,
  Typography,
  CardActions,
  IconButton,
  CardMedia,
  CardHeader,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CardGroup } from "react-bootstrap";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const NewsCard = ({ news }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const stringDate = (date) => {
    const d = new Date(date);
    return d.toDateString();
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="194"
        image={news?.image_url ? news?.image_url : ""}
        alt="placeholder"
      />
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: "#efb66e" }}
            aria-label="recipe"
            label-type="placeholder"
          >
            {news?.author ? news?.author.slice(0, 1) : news?.author}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <a
            href={news?.url ? news?.url : "#"}
            style={{ color: "#efb66e", textDecoration: "none"}}
            target="_blank"
            rel="noreferrer noopener"
          >
            {news.title}
          </a>
        }
        subheader={news.author}
      />

      <CardContent>
        
        <Typography variant="body2" color="">
          {news.description}
        </Typography>
        <CardGroup style={{marginTop:10}}>
          <Typography>{news?.source_name}</Typography>
          <Typography>{stringDate(news?.published_at)}</Typography>
        </CardGroup>

        
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph></Typography>
          <Typography paragraph>{news.content}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default NewsCard;
