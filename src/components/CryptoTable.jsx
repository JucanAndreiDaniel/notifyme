import React from "react";

import Grid from "@mui/material/Grid";
import { IconButton } from "@mui/material";
import MaUTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import { useTable } from "react-table";

import Filters from "../sections/Filters";
import FavoriteModal from "../components/FavoriteModal";

const CryptoCustomCell = ({
  value: initialValue,
  row,
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  if (id === "name") {
    return (
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <IconButton
            style={{
              color: "#ffc107",
            }}
            onClick={() => {
              updateMyData(row.index, {
                ...row.original,
                starred: !row.original.starred,
              });
            }}
          >
            {row.original.starred ? <StarIcon /> : <StarBorderIcon />}
          </IconButton>
        </Grid>
        <Grid item>
          <img
            style={{ width: "30px", height: "30px" }}
            src={row.original.image}
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
            <b>{row.original.name}</b>
          </span>
        </Grid>
      </Grid>
    );
  }
  return <>{initialValue}</>;
};

const defaultColumn = {
  Cell: CryptoCustomCell,
};

export default function CryptoTable({ columns, data }) {
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
    defaultColumn,
  });
  const [name, setName] = React.useState("");
  const [open, setOpen] = React.useState(false);

  // Render the UI for your table
  return (
    <>
      <FavoriteModal open={open} setOpen={setOpen}  />
      <TableContainer component={Paper}>
        <Filters name={name} setName={setName} setOpen={setOpen} />
        <MaUTable {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <TableCell {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </MaUTable>
      </TableContainer>
    </>
  );
}
