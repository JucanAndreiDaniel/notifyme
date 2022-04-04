import React from "react";

import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";

import CryptoTable from "../components/CryptoTable";
import { getCoins } from "../hooks/useCoins";
import Header from "../sections/Header";

export default function Home() {
  const columnsCrypto = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        canFilter: true,
      },
      {
        Header: "Symbol",
        accessor: "symbol",
      },
      {
        Header: "Price",
        accessor: "current",
      },
      {
        Header: "24h High",
        accessor: "high_1d",
      },
      {
        Header: "24h Low",
        accessor: "low_1d",
      },
      {
        Header: "Last 24 Hours",
        accessor: "last_24h",
      },
    ],
    []
  );

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    getCoins()
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <Header />
      <Container
        disableGutters
        maxWidth="xl"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <CryptoTable columns={columnsCrypto} data={data} />
      </Container>
    </React.Fragment>
  );
}
