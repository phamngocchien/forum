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
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

import {
  Avatar,
  Button,
  ButtonGroup,
  Card,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar
} from "@mui/material";
import moment from "moment";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useHistory } from "react-router-dom";
import { randomColor } from "components/randomColor";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  editPost,
  getPostDetail,
  handleApproval
} from "store/post/action";
import { RootState } from "store";
import "./post-list-table.css";

import { Transition } from "components/transition-dialog";
import TablePaginationActions from "components/table-pagination";
import ReactHtmlParser from "react-html-parser";
import { deleteAllReply } from "store/reply/action";
import { socket } from "layout/home";

interface PostProps {
  data: any;
  mode: "approval" | "list";
}
export default function PostListTable({ data, mode }: PostProps) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [idPost, setIdPost] = React.useState("");
  const [openDetail, setOpenDetail] = React.useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);

  const postDetail = useSelector((state: RootState) => state.post.postDetail);

  const handleClickOpenDetail = (idItem: string) => {
    dispatch(getPostDetail(idItem));
    setOpenDetail(true);
  };

  const handleClickOpenConfirm = (idItem: string) => {
    setIdPost(idItem);
    setOpenConfirm(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deletePost(idPost));
    dispatch(deleteAllReply(idPost));
    setOpenConfirm(false);
  };

  const handleCloseDetail = () => {
    setOpenDetail(false);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleApprovalPost = (id: string) => {
    // eslint-disable-next-line array-callback-return
    postDetail.map((ele: any) => {
      const postFixed = { ...ele, status: true };
      dispatch(editPost(id, postFixed));
    });
    dispatch(handleApproval(id));
    socket?.emit("push_new_post_user", {
      type: "have a new post",
      userName: postDetail[0].user.name,
      userId: postDetail[0].user._id,
      read: false,
      postId: postDetail[0]._id,
      writer: postDetail[0].user._id,
      post: postDetail[0].title,
      createdAt: Date.now()
    });
    setOpenDetail(false);
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
  const sortData = data.sort(
    (a: any, b: any) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  const handleEditPost = (id: string) => {
    history.push(`/update-post/${id}`);
  };
  return (
    <>
      {data.length === 0 ? (
        <Box className="flex justify-center text-xl mt-20">Nothing here!!!</Box>
      ) : (
        <>
          <Card>
            <TableContainer>
              <Table
                sx={{ minWidth: 500 }}
                aria-label="custom pagination table"
              >
                <TableBody>
                  <List sx={{ width: "100%" }}>
                    {(rowsPerPage > 0
                      ? sortData.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : sortData
                    ).map((item: any) => (
                      <>
                        <ListItem alignItems="flex-start" className="">
                          <Box>
                            <ListItemAvatar className="">
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
                              className="flex items-center mb-1"
                            >
                              <Link to={`/user/${item.user._id}/post`}>
                                <Box className="text-xs">{item.user.name}</Box>
                              </Link>
                              <Box className="flex">
                                <Box className="text-sm mx-2 ">
                                  <EventAvailableIcon
                                    className="text-gray-400 mr-1"
                                    fontSize="small"
                                  />
                                  {moment(item.createdAt).format(
                                    "dd MM, h:mm a"
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
                              <Grid
                                item
                                xs={12}
                                className="flex justify-between"
                              >
                                <Box className="text-lg ">{item.title}</Box>
                                <ButtonGroup disableElevation>
                                  <Button
                                    onClick={() =>
                                      handleClickOpenDetail(item._id)
                                    }
                                  >
                                    <AssignmentIcon />
                                  </Button>

                                  <Button
                                    onClick={() =>
                                      handleClickOpenConfirm(item._id)
                                    }
                                  >
                                    <DeleteIcon />
                                  </Button>
                                </ButtonGroup>
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
                        5,
                        10,
                        25,
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
          </Card>
        </>
      )}
      <Dialog
        maxWidth="lg"
        open={openDetail}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDetail}
        aria-describedby="alert-dialog-slide-description"
        className=""
      >
        {postDetail.map((item: any) => (
          <>
            <DialogTitle>
              {item.title}
              <Box className="flex">
                <Box className="text-sm mr-2 flex items-center">
                  <Box className="text-gray-400 mr-1">Asked</Box>
                  {moment(item.createdAt).startOf("second").fromNow()}
                </Box>
                <Box className="text-sm mx-2 flex items-center">
                  <Box className="text-gray-400 mr-1 ">Viewer</Box>
                  {item.view.length}
                </Box>
                <Box className="text-sm mx-2 flex items-center">
                  <Box className="text-gray-400 mr-1 ">Category</Box>
                  {item.category}
                </Box>
                <Box className="text-sm mx-2 flex items-center">
                  <Box className="text-gray-400 mr-1 ">Type</Box>
                  {item.type}
                </Box>
                <Box className="text-sm mx-2 flex items-center">
                  <Box className="text-gray-400 mr-1 ">Writer</Box>
                  {item.user.name}
                </Box>
              </Box>
            </DialogTitle>
            <Box className="ml-6 mb-2">
              {item.tag.map((tag: any) => (
                <>
                  <Chip
                    color="primary"
                    label={tag.name}
                    variant="outlined"
                    className="opacity-70 mr-1"
                  />
                </>
              ))}
            </Box>

            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                <Box className="reset text-black">
                  {ReactHtmlParser(item.content)}
                </Box>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleEditPost(item._id)}>Edit</Button>
              {mode === "approval" && (
                <Button onClick={() => handleApprovalPost(item._id)}>
                  Approval
                </Button>
              )}
              <Button onClick={handleCloseDetail}>Cancel</Button>
            </DialogActions>
          </>
        ))}
      </Dialog>
      <Dialog
        open={openConfirm}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseConfirm}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Do you want to delete this post?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleConfirmDelete}>Agree</Button>
          <Button onClick={handleCloseConfirm}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
