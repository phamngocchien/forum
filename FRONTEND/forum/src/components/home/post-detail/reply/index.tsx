import moment from "moment";
import {
  Avatar,
  Box,
  Grid,
  Button,
  IconButton,
  Menu,
  MenuItem
} from "@mui/material";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import "../post-detail.css";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import SendIcon from "@mui/icons-material/Send";
import { getPostDetail } from "store/post/action";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import ReactHtmlParser from "react-html-parser";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { randomColor } from "components/randomColor";
import {
  addReply,
  deleteReply,
  editReply,
  getReplyByIdPost
} from "store/reply/action";
import { getUserDetail } from "store/user/action";
import { socket } from "layout/home";

const { CKEditor } = require("@ckeditor/ckeditor5-react");

export default function Replies() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const [value, setValue] = useState("");
  const [valueReply, setValueReply] = useState("");
  const [idReply, setIdReply] = useState("");
  const [idReplyInput, setIdReplyInput] = useState("");
  const postDetail = useSelector((state: RootState) => state.post.postDetail);
  const { replies } = useSelector((state: RootState) => state.reply);
  const { userDetail } = useSelector((state: RootState) => state.user);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const userLogin = JSON.parse(localStorage.getItem("userLogin") || "");
  const isMenuOpen = Boolean(anchorEl);
  const dateNow = new Date().getDate();
  useEffect(() => {
    if (id) {
      dispatch(getPostDetail(id));
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      dispatch(getReplyByIdPost(id));
    }
  }, [id, replies.length]);

  useEffect(() => {
    if (userLogin._id) {
      dispatch(getUserDetail(userLogin._id));
    }
  }, [userLogin._id]);

  const handleChange = (event: any, editor: any) => {
    const data = editor.getData();
    setValue(data);
  };
  const handleClickComment = async () => {
    if (value) {
      const reply = {
        user: userLogin._id,
        post: id,
        content: value
      };
      dispatch(addReply(reply));
      socket?.emit("push_notification", {
        type: "commented your post",
        userName: userDetail.name,
        userId: userDetail._id,
        post: postDetail[0].title,
        postId: postDetail[0]._id,
        writer: postDetail[0].user._id,
        read: false,
        createdAt: Date.now()
      });
      setValue("");
    }
  };

  const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleIdReply = (content: string, idRep: string) => {
    setValueReply(content);
    setIdReply(idRep);
  };

  const handleOpenInput = () => {
    setIdReplyInput(idReply);
    setAnchorEl(null);
  };

  const handleCancelUpdate = () => {
    setIdReplyInput("");
  };

  const handleChangeUpdate = (
    event: ChangeEvent<HTMLInputElement>,
    editor: any
  ) => {
    const data = editor.getData();
    setValueReply(data);
  };

  const handleUpdate = () => {
    if (valueReply) {
      const item = {
        content: valueReply,
        post: id,
        user: userLogin._id
      };
      dispatch(editReply(idReplyInput, item));
      setIdReplyInput("");
    }
  };

  const handleDelete = () => {
    dispatch(deleteReply(idReply));
    setAnchorEl(null);
  };

  return (
    <>
      {/* {loading ? (
        <Box className="flex justify-center mt-10">
          <CircularProgress />
        </Box>
      ) : (
        <> */}
      {postDetail.map((item: any) => (
        <>
          <Grid container spacing={2}>
            {replies.map((rep: any) => (
              <>
                <Grid item className="flex mb-4" xs={12}>
                  <Grid item>
                    <Box
                      onClick={() => history.push(`/user/${rep.user._id}/post`)}
                      key={rep._id}
                    >
                      <Avatar
                        alt={rep.user.name}
                        src="Thanglongedu"
                        sx={{
                          width: 35,
                          height: 35,
                          bgcolor: `#${randomColor}`
                        }}
                        className="mr-3 cursor-pointer"
                      />
                    </Box>
                  </Grid>
                  <Grid justifyContent="left" item zeroMinWidth>
                    <Box className="flex items-center">
                      <Box className="mb-1 bg-gray-100 py-1 px-2 rounded-xl">
                        <Box
                          onClick={() =>
                            history.push(`/user/${rep.user._id}/post`)
                          }
                        >
                          <h4
                            style={{
                              margin: 0,
                              textAlign: "left",
                              fontSize: "13px"
                            }}
                            className="hover:underline transition transition-all cursor-pointer text-black font-bold"
                          >
                            {rep.user.name}
                          </h4>
                        </Box>
                        <Box
                          style={{
                            textAlign: "left",
                            wordWrap: "break-word",
                            maxWidth: "750px"
                          }}
                          className="text-base reset"
                        >
                          {ReactHtmlParser(rep.content)}
                        </Box>
                      </Box>
                      {userLogin._id === rep.user._id && (
                        <Box
                          onClick={() => {
                            handleIdReply(rep.content, rep._id);
                          }}
                        >
                          <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                            sx={{ marginLeft: "10px" }}
                          >
                            <MoreHorizIcon />
                          </IconButton>
                        </Box>
                      )}
                    </Box>
                    {rep.createdAt === rep.updatedAt ? (
                      <>
                        <Box className="text-sm mx-2 flex items-center">
                          <Box className="text-gray-400 mr-1">answered</Box>
                          {new Date(rep.createdAt).getDate() === dateNow
                            ? moment(rep.createdAt).startOf("second").fromNow()
                            : moment(rep.createdAt).format(
                                "MMMM Do YYYY, h:mm a"
                              )}
                        </Box>
                      </>
                    ) : (
                      <>
                        <Box className="text-sm mx-2 flex items-center">
                          <Box className="text-gray-400 mr-1">edited</Box>
                          {new Date(rep.updatedAt).getDate() === dateNow
                            ? moment(rep.updatedAt).startOf("second").fromNow()
                            : moment(rep.updatedAt).format(
                                "MMMM Do YYYY, h:mm a"
                              )}
                        </Box>
                      </>
                    )}
                  </Grid>
                </Grid>
                {rep._id === idReplyInput && (
                  <Box className="w-full mt-5 ml-16">
                    <CKEditor
                      editor={ClassicEditor}
                      name="content"
                      data={valueReply}
                      onChange={handleChangeUpdate}
                      config={{
                        ckfinder: {
                          uploadUrl: "http://localhost:5000/upload",
                          withCredentials: true,
                          headers: {
                            "X-CSRF-TOKEN": "CSFR-Token",
                            Authorization: "Bearer <JSON Web Token>"
                          }
                        },
                        image: {
                          styles: [
                            "alignLeft",
                            "alignCenter",
                            "alignRight",
                            "resizeImage"
                          ]
                        }
                      }}
                    />

                    <Box className="mt-2 flex justify-end">
                      <Button
                        sx={{ marginRight: "15px" }}
                        onClick={handleCancelUpdate}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        endIcon={<SendIcon />}
                        onClick={handleUpdate}
                      >
                        Update
                      </Button>
                    </Box>
                  </Box>
                )}
              </>
            ))}

            <>
              {
                <Menu
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  keepMounted
                  open={isMenuOpen}
                  onClose={handleMenuClose}
                >
                  <Box sx={{ width: "200px" }}>
                    <MenuItem onClick={handleOpenInput}>Edit</MenuItem>
                    <MenuItem onClick={handleDelete}>Delete</MenuItem>
                  </Box>
                </Menu>
              }
            </>
          </Grid>
          <Grid item wrap="nowrap" spacing={2} xs={12}>
            <Box className="my-5 flex">
              <Grid item>
                <Avatar
                  alt={userDetail.name}
                  src="Thanglongedu"
                  sx={{
                    width: 35,
                    height: 35,
                    bgcolor: `#${randomColor}`
                  }}
                />
              </Grid>
              <Box className="ml-4 w-full" sx={{ maxWidth: "810px" }}>
                <CKEditor
                  editor={ClassicEditor}
                  name="content"
                  data={value}
                  onChange={handleChange}
                  config={{
                    ckfinder: {
                      uploadUrl: "http://localhost:5000/upload",
                      withCredentials: true,
                      headers: {
                        "X-CSRF-TOKEN": "CSFR-Token",
                        Authorization: "Bearer <JSON Web Token>"
                      }
                    },
                    image: {
                      styles: [
                        "alignLeft",
                        "alignCenter",
                        "alignRight",
                        "resizeImage"
                      ]
                    }
                  }}
                />

                <Box className="mt-2 flex justify-end">
                  <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={handleClickComment}
                  >
                    Comment
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </>
      ))}
      {/* </>
      )} */}
    </>
  );
}
