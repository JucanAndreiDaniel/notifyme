import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function Filters(props) {
  const handleChangeName = (event) => {
    props.setName(event.target.value);
  };
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      rowSpacing={1}
    >
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          // size="large"
          style={{ marginLeft: 10 }}
          onClick={props.handleOpen}
        >
          Favorite
        </Button>
      </Grid>

      <Grid item>
        <TextField
          sx={{
            width: "100%",
            marginTop: "1rem",
            marginBottom: "1rem",
            marginLeft: "1rem",
            marginRight: "1rem",
          }}
          size="small"
          label="Search"
          variant="outlined"
          value={props.name}
          onChange={handleChangeName}
        />
      </Grid>
    </Grid>
  );
}
