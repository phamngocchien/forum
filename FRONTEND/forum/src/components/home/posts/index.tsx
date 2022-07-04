/* eslint-disable array-callback-return */
import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ReactHtmlParser from "react-html-parser";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import {
  Avatar,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar
} from "@mui/material";
import moment from "moment";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { useHistory } from "react-router-dom";
import { randomColor } from "components/randomColor";
import TablePaginationActions from "components/table-pagination";
import "./posts.css";

interface PostProps {
  data: any;
}
export default function PostList({ data }: PostProps) {
  const history = useHistory();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
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

  const dateNow = new Date().getDate();

  return (
    <>
      {data.length === 0 ? (
        <Box className="flex justify-center text-xl">Nothing here!!!</Box>
      ) : (
        <>
          <TableContainer>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
              <TableBody>
                <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                  {(rowsPerPage > 0
                    ? data.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : data
                  ).map((item: any) => (
                    <>
                      <ListItem alignItems="flex-start" className="">
                        <Box
                          onClick={() =>
                            history.push(`/user/${item.user._id}/post`)
                          }
                        >
                          <ListItemAvatar className="cursor-pointer">
                            <Avatar
                              alt={item.user.name}
                              src="student"
                              sx={{ bgcolor: `#${randomColor}` }}
                            />
                          </ListItemAvatar>
                        </Box>
                        <ListItemText>
                          <Box
                            component="span"
                            className="flex justify-between items-center mb-1"
                          >
                            <Box
                              className="text-xs cursor-pointer hover:text-blue-500 transition-all hover:underline"
                              onClick={() =>
                                history.push(`/user/${item.user._id}/post`)
                              }
                            >
                              {item.user.name}
                            </Box>
                            <Box className="flex">
                              <Box className="text-sm mx-2 ">
                                <EventAvailableIcon
                                  className="text-gray-400 mr-1"
                                  fontSize="small"
                                />
                                {new Date(item.createdAt).getDate() === dateNow
                                  ? moment(item.createdAt)
                                      .startOf("second")
                                      .fromNow()
                                  : moment(item.createdAt).format(
                                      "MMMM Do YYYY, h:mm a"
                                    )}
                              </Box>
                              <Box className="text-sm mx-2 ">
                                <RemoveRedEyeOutlinedIcon
                                  className="text-gray-400 mr-1"
                                  fontSize="small"
                                />
                                {item.view.length}
                              </Box>
                              <Box className="text-sm mx-2 ">
                                <ThumbUpAltIcon
                                  className="text-gray-400 mr-1"
                                  fontSize="small"
                                />
                                {item.vote.length !== 0 ? (
                                  <>
                                    {item.vote.reduce(
                                      (a: any, b: any) => a + b.score,
                                      0
                                    )}
                                  </>
                                ) : (
                                  0
                                )}
                              </Box>
                            </Box>
                          </Box>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                          >
                            <Grid item xs={12}>
                              <Box
                                className="text-lg hover:text-blue-500 transition-all cursor-pointer font-medium"
                                onClick={() =>
                                  history.push(`/post-detail/${item._id}`)
                                }
                              >
                                {item.title}
                              </Box>
                              <Box
                                className="text-md hover:text-blue-500 transition-all cursor-pointer wrapper-content"
                                onClick={() =>
                                  history.push(`/post-detail/${item._id}`)
                                }
                              >
                                {ReactHtmlParser(item.content)}
                              </Box>
                            </Grid>
                          </Typography>
                        </ListItemText>

                        {/* <Box className="text-sm mt-2 mx-2 flex justify-center">
                          <ChatOutlinedIcon
                            className="text-gray-400 mr-1"
                            fontSize="small"
                          />
                          {item.reply.length}
                        </Box> */}
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </>
                  ))}
                </List>
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      10,
                      25,
                      40,
                      { label: "All", value: -1 }
                    ]}
                    colSpan={3}
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        "aria-label": "posts per page"
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
      )}
    </>
  );
}
