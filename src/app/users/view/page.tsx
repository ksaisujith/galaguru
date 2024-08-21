'use client';

import { useState, useEffect } from 'react';
import FetchData from '@/app/fetchData/fetch';
import Loader from '@/app/Loader';
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Autocomplete, TextField, Box } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';


const Page = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, SetLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    SetLoading(true);
    FetchData('/api/users/view', setUsers)
    SetLoading(false);
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      (user.UserPhone && user.UserPhone.startsWith(searchTerm)) ||
      (user.UserEmail && user.UserEmail.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.UserName && user.UserName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSearchChange = (event: React.SyntheticEvent, value: string | null) => {
    setSearchTerm(value || '');
  };

  return (
    <>
      <Autocomplete
        freeSolo
        options={users.map((user) => `${user.UserName}`)}
        onInputChange={handleSearchChange}
        renderInput={(params) => (
          <TextField {...params} label="Name, email or phone" variant="outlined" />
        )}
        style={{ marginBottom: '20px' }}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User id</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">User type</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Date of birth</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow
                key={user.UserId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.UserId}
                </TableCell>
                <TableCell align="right">{user.UserName}</TableCell>
                <TableCell align="right">{user.UserType}</TableCell>
                <TableCell align="right">{user.UserEmail}</TableCell>
                <TableCell align="right">{user.UserPhone}</TableCell>
                <TableCell align="right">{user.UserDOB}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Page;