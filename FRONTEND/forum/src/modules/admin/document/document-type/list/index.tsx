import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogTitle,
  TableFooter,
  TablePagination
} from "@mui/material";

import TablePaginationActions from "components/table-pagination";
import { Transition } from "components/transition-dialog";
import { deleteDocType, getDocTypeById } from "store/document-type/action";
import { useDispatch } from "react-redux";
import FormDocumentType from "../form";

interface TagProps {
  data: any;
}
export default function DocmentTypeList({ data }: TagProps) {
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [idDoc, setIdDoc] = React.useState("");
  const [openForm, setOpenForm] = React.useState(false);

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

  const handleClickOpenConfirm = (idItem: string) => {
    setIdDoc(idItem);
    setOpenConfirm(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteDocType(idDoc));
    setOpenConfirm(false);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleClickOpenForm = (id: string) => {
    dispatch(getDocTypeById(id));
    setIdDoc(id);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell style={{ minWidth: 100 }}>ID</TableCell>
              <TableCell style={{ minWidth: 150 }}>Name</TableCell>
              <TableCell style={{ minWidth: 200 }}>Create At</TableCell>
              <TableCell style={{ minWidth: 200 }}>Update At</TableCell>
              <TableCell style={{ minWidth: 100, paddingLeft: 38 }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
            ).map((row: any, key: any) => (
              <TableRow key={row.name}>
                <TableCell>{key + 1}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  {moment(row.createdAt).format("dd MM YYYY, h:mm a")}
                </TableCell>

                <TableCell>
                  {moment(row.updatedAt).format("dd MM YYYY, h:mm a")}
                </TableCell>
                <TableCell>
                  <ButtonGroup disableElevation>
                    <Button onClick={() => handleClickOpenForm(row._id)}>
                      <EditIcon />
                    </Button>
                    <Button onClick={() => handleClickOpenConfirm(row._id)}>
                      <DeleteIcon />
                    </Button>
                  </ButtonGroup>
                </TableCell>
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
                colSpan={5}
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
      <Dialog
        open={openConfirm}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseConfirm}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Do you want to delete this document type?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleConfirmDelete}>Agree</Button>
          <Button onClick={handleCloseConfirm}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <FormDocumentType
        mode={"edit"}
        isOpen={openForm}
        onClose={handleCloseForm}
      />
    </>
  );
}
