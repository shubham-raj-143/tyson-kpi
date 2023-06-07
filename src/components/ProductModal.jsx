import React, { useEffect, useState, memo } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { useTable } from 'react-table';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  overflow:"auto",
  '@media(min-width: 220px)' : {
    width: '200px'
  },
  '@media(min-width: 340px)' : {
    width: '310px'
  },
  '@media(min-width: 460px)' : {
    width: '420px'
  },
  '@media(min-width: 760px)' : {
    width: '700px'
  },
  '@media(min-width: 1000px)' : {
    width: '920px'
  },
  '@media(min-width: 1200px)' : {
    width: '1120px'
  },
  '@media(min-width: 1600px)' : {
    width: '1520px'
  },
  
};

const TableComponent = memo(({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <table {...getTableProps()} className="table table-responsive table-bordered responsive-lg responsive-md responsive-sm sap-system-table">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()} key="header-row">
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} key={column.Header}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={row.original.SystemID}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()} key={cell.column.Header}>
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
});

const ProductModal = ({ open, handleClose, sapSystemId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (sapSystemId) {
        const response = await axios.get(`http://localhost:3000/api/tables/${sapSystemId}`);
        setData(response.data);
      }
    };

    fetchData();
  }, [sapSystemId]);

  const columns = [
    { Header: 'System ID', accessor: 'SystemID' },
    { Header: 'Product Name', accessor: 'ProductName' },
    { Header: 'Version', accessor: 'Version' },
    { Header: 'Description', accessor: 'Description' },
    { Header: 'Modified Date', accessor: 'ModifiedDate' },
    { Header: 'Modified Time', accessor: 'ModifiedTime' },
    { Header: 'Installed Year', accessor: 'InstalledYear' },
  ];

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <TableComponent columns={columns} data={data} />
      </Box>
    </Modal>
  );
};

export default ProductModal;