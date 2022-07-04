import {
  Box,
  Card,
  Button,
  Paper,
  TableContainer,
  TableRow,
  TablePagination,
  TableCell,
  ButtonGroup,
  TableFooter,
  TableHead,
  Table,
  TableBody,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Dialog,
  DialogTitle,
  DialogActions
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { PATH_ADMIN_DOCUMENT_ADD } from "routes/routes.paths";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { RootState } from "store";
import { deleteFile, getFiles, getFilesByDoc } from "store/file/action";
import TablePaginationActions from "components/table-pagination";
import moment from "moment";
import { getDocumentTypes } from "store/document-type/action";
import { Transition } from "components/transition-dialog";

export interface IDocumentProps {}

export default function Document(props: IDocumentProps) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<string | number>("");
  const [idDelete, setIdDelete] = useState("");

  const files = useSelector((state: RootState) => state.file.files);
  const { documenttypes } = useSelector(
    (state: RootState) => state.documenttype
  );
  const [openConfirm, setOpenConfirm] = useState(false);

  useEffect(() => {
    dispatch(getFiles());
    dispatch(getDocumentTypes());
  }, []);

  const handleChange = (event: SelectChangeEvent<typeof category>) => {
    setCategory(event.target.value);
    dispatch(getFilesByDoc(String(event.target.value)));
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - files.length) : 0;

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClickOpenConfirm = (idItem: string) => {
    setIdDelete(idItem);
    setOpenConfirm(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteFile(idDelete));
    setOpenConfirm(false);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  return (
    <>
      <Card className="flex items-center justify-between p-5 mb-5">
        <Box className="font-bold">DOCUMENT</Box>
        <Box className="flex items-center">
          <FormControl sx={{ width: "300px" }}>
            <InputLabel id="demo-controlled-open-select-label">
              Category
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={category}
              label="Category"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {documenttypes.map((item: any) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Link to={PATH_ADMIN_DOCUMENT_ADD}>
          <Button className="h-8 w-12" type="submit" variant="outlined">
            <AddIcon fontSize="large" />
          </Button>
        </Link>
      </Card>
      <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell style={{ minWidth: 100 }}>ID</TableCell>
                <TableCell style={{ minWidth: 150 }}>Name</TableCell>
                <TableCell style={{ minWidth: 150 }}>Category</TableCell>
                <TableCell style={{ minWidth: 200 }}>Created At</TableCell>
                <TableCell style={{ minWidth: 100, paddingLeft: 38 }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? files.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : files
              ).map((row: any, key: any) => (
                <TableRow key={row.name}>
                  <TableCell>{key + 1}</TableCell>
                  <TableCell>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={`http://localhost:5000/files/${row.filename}`}
                    >
                      {row.filename}
                    </a>
                  </TableCell>
                  <TableCell>
                    {documenttypes.map((item: any) =>
                      // eslint-disable-next-line array-callback-return
                      item.files.map((item2: any) => {
                        if (item2 === row.filename) {
                          return item.name;
                        }
                      })
                    )}
                  </TableCell>
                  <TableCell>
                    {moment(row.createdAt).format("dd/MM/YYYY")}
                  </TableCell>
                  <TableCell>
                    <ButtonGroup>
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
                  rowsPerPageOptions={[10, 25, { label: "All", value: -1 }]}
                  colSpan={5}
                  count={files.length}
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
          <DialogTitle>{"Do you want to delete this file?"}</DialogTitle>
          <DialogActions>
            <Button onClick={handleConfirmDelete}>Agree</Button>
            <Button onClick={handleCloseConfirm}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </>
    </>
  );
}
