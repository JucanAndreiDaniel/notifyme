import React from "react";

import MaUTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useTable } from "react-table";

import Filters from "./Filters";

const CryptoCustomCell = ({
  value: initialValue,
  row,
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  const [value, setValue] = React.useState(initialValue);

  if (id === "name") {
    return (
      <>
        <img
          style={{ width: "5%", minWidth: "3vh",height:"auto" }}
          src={row.original.image}
          alt="crypto"
        />
        <span><b>{row.original.name}</b></span>
      </>
    );
  }
  return <>{initialValue}</>;
};

const defaultColumn = {
  Cell: CryptoCustomCell,
};

export default function CryptoTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
  } = useTable({
    columns,
    data,
    defaultColumn,
  });
  const [name, setName] = React.useState("");

  // Render the UI for your table
  return (
    <TableContainer component={Paper}>
      <Filters name={name} setName={setName} />
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
  );
}
