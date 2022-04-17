import React from "react";

import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const FavoriteModal = ({ open, setOpen, favs }) => {
  const handleClose = () => setOpen(false);

  return (
    <Dialog maxWidth="sm" fullWidth={true} open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography variant="h5" align="center">
          Favorites
        </Typography>
      </DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">Name</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Price</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">24h High</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">24h Low</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {favs.map((fav) => (
                <TableRow key={fav.id}>
                  <TableCell>
                    <Grid
                      container
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                      spacing={2}
                    >
                      <Grid item>
                        <img
                          style={{ width: "30px", height: "30px" }}
                          src={fav.image}
                          alt="crypto"
                        />
                      </Grid>
                      <Grid item>
                        <span
                          style={{
                            fontSize: "1.3em",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          <b>{fav.name}</b>
                        </span>
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">{fav.current}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">{fav.high_1d}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">{fav.low_1d}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FavoriteModal;
