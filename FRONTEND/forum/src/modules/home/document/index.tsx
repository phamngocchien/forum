import {
  Box,
  Paper,
  TableContainer,
  TableRow,
  TablePagination,
  TableCell,
  TableFooter,
  TableHead,
  Table,
  TableBody,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { RootState } from "store";
import { getFiles, getFilesByDoc } from "store/file/action";
import TablePaginationActions from "components/table-pagination";
import moment from "moment";
import { getDocumentTypes } from "store/document-type/action";

export interface IDocumentProps {}

export default function Document(props: IDocumentProps) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<string | number>("");
  const files = useSelector((state: RootState) => state.file.files);
  const documenttypes = useSelector(
    (state: RootState) => state.documenttype.documenttypes
  );
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

  return (
    <>
      <Box className="flex justify-start pb-5">
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
      <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell style={{ minWidth: 100 }}>ID</TableCell>
                <TableCell style={{ minWidth: 200 }}>Name</TableCell>
                <TableCell style={{ minWidth: 150 }}>Category</TableCell>
                <TableCell style={{ minWidth: 150 }}>Created At</TableCell>
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
                    {moment(row.uploadDate).format("MMMM Do YYYY, h:mm:ss a")}
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
      </>
    </>
  );
}
