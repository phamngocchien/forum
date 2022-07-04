import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useHistory } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogTitle,
  TableFooter,
  TablePagination
} from "@mui/material";
import { useDispatch } from "react-redux";
import TablePaginationActions from "components/table-pagination";
import { Transition } from "components/transition-dialog";
import { deleteUser } from "store/user/action";

interface TagProps {
  data: any;
  mode?: "addlist";
}
export default function UserList({ data, mode }: TagProps) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [idUser, setIdUser] = React.useState("");

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };
  const handleConfirmDelete = () => {
    dispatch(deleteUser(idUser));
    setOpenConfirm(false);
  };
  const handleClickOpenConfirm = (idItem: string) => {
    setIdUser(idItem);
    setOpenConfirm(true);
  };
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      {data.length === 0 ? (
        <Box className="flex justify-center text-xl mt-20">Nothing here!!!</Box>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell style={{ minWidth: 50 }}>ID</TableCell>
                <TableCell style={{ minWidth: 200 }}>Name</TableCell>
                <TableCell style={{ minWidth: 100 }}>Student Code</TableCell>
                <TableCell style={{ minWidth: 100 }}>Role</TableCell>
                <TableCell style={{ minWidth: 200 }}>Major</TableCell>
                {!mode && (
                  <>
                    <TableCell style={{ minWidth: 200 }}>Email</TableCell>
                    <TableCell style={{ minWidth: 200 }}>Facebook</TableCell>
                    <TableCell style={{ minWidth: 200 }}>Github</TableCell>
                    <TableCell style={{ minWidth: 100, paddingLeft: 38 }}>
                      Action
                    </TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? data.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : data
              ).map((row: any, key: any) => (
                <TableRow key={row.name}>
                  <TableCell>{key + 1}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.msv}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>{row.major}</TableCell>
                  {!mode && (
                    <>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.facebook}</TableCell>
                      <TableCell>{row.github}</TableCell>
                      <TableCell>
                        <ButtonGroup disableElevation>
                          <Button
                            onClick={() =>
                              history.push(`/admin/user/update/${row._id}`)
                            }
                          >
                            <EditIcon />
                          </Button>
                          <Button
                            onClick={() => handleClickOpenConfirm(row._id)}
                          >
                            <DeleteIcon />
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={10}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "Tags per page"
                    },
                    native: true
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}
      <Dialog
        open={openConfirm}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseConfirm}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Do you want to delete this user?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleConfirmDelete}>Agree</Button>
          <Button onClick={handleCloseConfirm}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

UserList.defaultProps = {
  mode: false
};
