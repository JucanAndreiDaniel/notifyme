import React from "react";

import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MaUTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import { Sparklines, SparklinesLine } from "react-sparklines";

import { useTable, usePagination, useFlexLayout } from "react-table";

import Filters from "../sections/Filters";
import FavoriteModal from "../components/FavoriteModal";
import CryptoTablePaginationActions from "../components/CryptoTablePaginationActions";
import { getFavoriteCoins } from "../hooks/useFavorite";
import { UserContext } from "../hooks/UserContext";

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
              updateMyData(row.index, "favorite", !row.original.favorite);
            }}
          >
            {row.original.favorite ? <StarIcon /> : <StarBorderIcon />}
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
  if (id === "sparkline") {
    return (
      <Sparklines data={row.original.sparkline}  height={28}>
        <SparklinesLine color="#ffc107" />
      </Sparklines>
    );
  }
  return <>{initialValue}</>;
};

export default function CryptoTable({
  columns,
  data,
  updateMyData,
  skipPageReset,
  fetchData,
  loading,
  cryptoNumber,
  coinName,
  setCoinName,
  pageCount: controlledPageCount,
}) {
  const defaultColumn = React.useMemo(
    () => ({
      Cell: CryptoCustomCell,
      minWidth: 20,
      width: 100,
      maxWidth: 500,
    }),
    []
  );
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    // Get the state from the instance
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      autoResetPage: !skipPageReset,
      updateMyData,
      initialState: { pageIndex: 0, pagesize: 25 },
      manualPagination: true,
      pageCount: controlledPageCount,
    },
    usePagination,
    useFlexLayout
  );
  React.useEffect(() => {
    fetchData({ pageIndex, pageSize, coinName });
  }, [fetchData, pageIndex, pageSize, coinName]);

  const handleChangePage = (_event, newPage) => {
    gotoPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(Number(event.target.value));
    handleChangePage(0);
  };

  const { user } = React.useContext(UserContext);
  const [open, setOpen] = React.useState(false);
  const [favs, setFavs] = React.useState([]);

  const handleOpen = () => {
    setOpen(true);
    const getFavs = async () => {
      const res = await getFavoriteCoins(user);
      setFavs(res.data);
    };
    getFavs();
  };

  return (
    <>
      <FavoriteModal open={open} setOpen={setOpen} favs={favs} />
      <TableContainer component={Paper}>
        <Filters name={coinName} setName={setCoinName} setOpen={handleOpen} />
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
            {page.map((row, _i) => {
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
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[
                  5,
                  10,
                  25,
                  { label: "All", value: cryptoNumber },
                ]}
                colSpan={3}
                count={parseInt(cryptoNumber)}
                rowsPerPage={pageSize}
                page={pageIndex}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={CryptoTablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </MaUTable>
      </TableContainer>
    </>
  );
}
