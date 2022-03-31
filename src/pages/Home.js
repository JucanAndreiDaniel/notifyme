import React from 'react';
import axios from 'axios';
import Header from '../sections/Header';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import CryptoTable from './CryptoTable';
import pathString from '../PathString';

export default function Home() {


    const columnsCrypto = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
                canFilter: true,
            },
            {
                Header: 'Symbol',
                accessor: 'symbol',
            },
            {
                Header: 'Price',
                accessor: 'current',
            },
            {
                Header: '24h High',
                accessor: 'high_1d',
            },
            {
                Header: '24h Low',
                accessor: 'low_1d',
            },
            {
                Header: "Last 24 Hours",
                accessor: "last_24h",
            }

        ],
        []
    )

    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        axios.get(pathString+"/old/coins", {
            params: {
                currency: "usd",
                limit: 15
            }
        }).then(res => {
            setData(res.data);
        })
    }, [])



    return (
        <React.Fragment>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            <Header />
            <Container disableGutters maxWidth="xl" component="main" sx={{ pt: 8, pb: 6 }}>
                <CryptoTable columns={columnsCrypto} data={data} />

            </Container>
        </React.Fragment>
    )
};