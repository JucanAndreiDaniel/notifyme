import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function Filters(props) {
  const handleChangeName = (event) => {
    props.setName(event.target.value);
  };
  return (
    <Grid container>

      <Grid item>

        <TextField
        sx={{
            width: "100%",
            marginTop: "1rem",
            marginBottom: "1rem",
            marginLeft: "1rem",
            marginRight: "1rem",

        }}
          label="Search"
          variant="outlined"
          value={props.name}
          onChange={handleChangeName}
        />
      </Grid>
    </Grid>
  );
}
