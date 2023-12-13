import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function DataTable() {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  
const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'email', headerName: 'Email', width: 400 },
  {
    field: 'role',
    headerName: 'Role',
    sortable: false,
    width: 400,
  },
  {
    field: 'delete',
    headerName: 'Delete',
    sortable: false,
    width: 200,
    renderCell: (params) => (
      <button 
      style={{
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
      }} onClick={() => handleDeletee(params.row.id)}>Delete</button>
    ),
  },
];
const handleDeletee = (id) => {
  const updatedRows = rows.filter((row) => row.id !== id);
  setRows(updatedRows);
  setFilteredRows(updatedRows);
};
  const fetchData = async () => {
    try {
      const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json', {
        method: 'GET',
      });
      const rr = await response.json();
      setRows(rr);
      setFilteredRows(rr);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = () => {
    const filtered = rows.filter((row) => row.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredRows(filtered);
  };

  // ...
// ...

const handleDelete = () => {
  console.log("---", selectedRows);
  const updatedRows = rows.filter((row) => !selectedRows.includes(row.id));
  setRows(updatedRows);
  setFilteredRows(updatedRows);
  setSelectedRows([]); // Clear selected rows after deletion
};

// ...


const handleSelectionModelChange = (newSelectionModel) => {
  setSelectedRows(newSelectionModel);
};
// ...

  return (
    <>
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '4px',
            marginRight: '8px',
            border: '1px solid #ced4da',
          }}
        />
        <button
          style={{
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
          onClick={handleSearch}
        >
          Search
        </button>
          <button
            style={{
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '4px',
              marginLeft: 'auto',
              cursor: 'pointer',
            }}
            onClick={handleDelete}
          >
            Delete Selected
          </button>
      </div>
//vfdvfdf
      <div style={{ height: 650, width: '100%' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
          checkboxSelection
          onRowSelectionModelChange={handleSelectionModelChange}
        />
      </div>
    </>
  );
}
