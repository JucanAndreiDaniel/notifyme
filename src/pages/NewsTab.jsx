import React from "react";
import Header from "../sections/Header";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { Grid } from "@mui/material";
import NewsCard from "../components/NewsCard";
import { Typography } from "@mui/material";
import { getNews } from "../hooks/useNews";

export default function NewsTab() {
  const [news,setNews] = React.useState([]);
  const [reload, setReload] = React.useState(false);

  React.useEffect(() => {
    getNews()
      .then((res) => {
        console.log(res.data);
        setNews(res.data);
      })
      .catch((err) => {
        console.log(err);
        setNews([]);
      });
  }, [reload]);

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
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={2}
        >
          {news.length > 0 ? (
            news?.map((ne, k) => (
              <Grid item style={{display:"flex" ,justifyContent: 'space-between', flexDirection: 'column'}}>
                <NewsCard news={ne} key={k}/>
              </Grid>
            ))
          ) : (
            <Grid item>
              <Typography>Nothing here</Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
