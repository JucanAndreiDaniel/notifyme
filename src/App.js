import React from 'react'

import Navbar from './components/Navbar';
import CryptoTable from './components/CryptoTable';
import axios from 'axios';



function App() {

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
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
          },
        ],
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Age',
            accessor: 'age',
          },
          {
            Header: 'Visits',
            accessor: 'visits',
          },
          {
            Header: 'Status',
            accessor: 'status',
          },
          {
            Header: 'Profile Progress',
            accessor: 'progress',
          },
        ],
      },
    ],
    []
  )

  // const data = React.useMemo(() => makeData(20), [])
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    axios.get("http://localhost:7000/coins", {
      params: {
        currency: "usd",
        limit: 15
      }
    }).then(res => {
      setData(res.data);
    })
  }, [])



  return (
    <div>
      {/* material ui navbar */}
      <Navbar />
      <CryptoTable columns={columnsCrypto} data={data} />
    </div>
  )
}

export default App
