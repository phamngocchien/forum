import {
  CardContent,
  Chip,
  Grid,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useState
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import TableBody from "@mui/material/TableBody";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { getTags, searchTags } from "store/tag/action";
import "./tag-list.css";
import { debounce } from "debounce";
import { useHistory } from "react-router-dom";
import TablePaginationActions from "components/table-pagination";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary
}));

export default function TagList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const tags = useSelector((state: RootState) => state.tag.tags);

  useEffect(() => {
    dispatch(getTags());
  }, []);

  const debouncedSave = useCallback(
    debounce(
      (nextValue: string) => dispatch(searchTags({ name: nextValue })),
      1000
    ),
    []
  );
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: nextValue } = e.target;
    debouncedSave(nextValue);
  };
  const handleOpenTag = (id: any) => {
    history.push(`/tag/${id}/share`);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);

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
      <Box className="flex justify-center mb-10">
        <TextField
          onChange={handleChange}
          id="outlined-basic"
          label="Search"
          variant="outlined"
        />
      </Box>
      <TableBody sx={{ minHeight: "570px" }}>
        <Grid container spacing={2}>
          {(rowsPerPage > 0
            ? tags.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : tags
          ).map((item: any) => (
            <>
              <Grid item md={3}>
                <Item sx={{ height: "178px" }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      <Chip
                        label={item.name.toLowerCase()}
                        color="primary"
                        onClick={() => handleOpenTag(item._id)}
                      />
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <Box className="description">{item.description}</Box>
                    </Typography>
                  </CardContent>
                </Item>
              </Grid>
            </>
          ))}
        </Grid>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[12, 24, 48, { label: "All", value: -1 }]}
            colSpan={3}
            count={tags.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: {
                "aria-label": "tags per page"
              },
              native: true
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </TableRow>
      </TableFooter>
    </>
  );
}
