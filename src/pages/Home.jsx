import React from "react";

import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";

import CryptoTable from "../components/CryptoTable";
import { getCoins } from "../hooks/useCoins";
import Header from "../sections/Header";
import { UserContext } from "../hooks/UserContext";
import {
  setFavoriteCoins,
  deleteFavoriteCoins,
  getFavoriteCoins,
} from "../hooks/useFavorite";

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

  const { user } = React.useContext(UserContext);
  const [data, setData] = React.useState([]);
  const [skipPageReset, setSkipPageReset] = React.useState(false);

  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    console.log("Try to update");
    setSkipPageReset(true);
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
    if (columnId === "favorite") {
      const coin = data[rowIndex];
      const fav = coin.favorite ? false : true;
      if (fav) {
        setFavoriteCoins(coin);
      } else {
        deleteFavoriteCoins(coin);
      }
    }
  };

  React.useEffect(() => {
    console.log(user);
    getCoins(user.currency).then((res) => {
      getFavoriteCoins()
        .then((favs) => {
          const favsIds = favs.data.map((fav) => fav.id);
          const newData = res.data.map((coin) => {
            const fav = favsIds.includes(coin.id);
            return {
              ...coin,
              favorite: fav,
            };
          });
          console.log(newData);
          setData(newData);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, [user]);

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
        <CryptoTable
          columns={columnsCrypto}
          data={data}
          updateMyData={updateMyData}
          skipPageReset={skipPageReset}
        />
      </Container>
    </React.Fragment>
  );
}
