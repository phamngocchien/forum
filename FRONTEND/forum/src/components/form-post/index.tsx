import { socket } from "layout/home";
import { useFormik } from "formik";
import { useState, useMemo, useEffect } from "react";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField
} from "@mui/material";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { addPost, editPost, getPostDetail } from "store/post/action";
import {
  PATH_ADMIN_POST,
  PATH_ADMIN_POST_LIST,
  PATH_JOB,
  PATH_SHARE,
  PATH_USER_QUESTION
} from "routes/routes.paths";
import { getUserDetail } from "store/user/action";
import { useHistory, useParams } from "react-router-dom";
import "./form-post.css";
import { getTags } from "store/tag/action";
import { Transition } from "components/transition-dialog";
import { RootState } from "store";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import FormCreateTag from "./form-tag";

const { CKEditor } = require("@ckeditor/ckeditor5-react");

interface UserFormProps {
  mode: "create" | "edit";
}

export default function FormPost({ mode }: UserFormProps) {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const tags = useSelector((state: RootState) => state.tag.tags);
  const { userDetail } = useSelector((state: RootState) => state.user);
  const { postDetail } = useSelector((state: RootState) => state.post);
  const userLogin: any = JSON.parse(localStorage.getItem("userLogin") || "");
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const fixedOptions: any[] = [];
  const [valueTag, setValueTag] = useState([...fixedOptions]);
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);
  const [openNoti, setOpenNoti] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getPostDetail(id));
    }
  }, []);

  useEffect(() => {
    dispatch(getTags());
  }, []);

  useEffect(() => {
    if (userLogin._id) {
      dispatch(getUserDetail(userLogin._id));
    }
  }, [userLogin._id]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangeContent = (event: any, editor: any) => {
    const data = editor.getData();
    setContent(data);
  };

  const initialValues = useMemo(() => {
    if (mode === "edit") {
      setValueTag(postDetail[0].tag);
      return {
        title: postDetail[0].title,
        tag: valueTag,
        type: postDetail[0].type,
        content: postDetail[0].content
      };
    }
    return {
      title: "",
      tag: [],
      type: "",
      content: ""
    };
  }, []);
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values: any) => {
      if (mode === "create") {
        console.log(values);

        if (
          values.title === "" ||
          valueTag.length === 0 ||
          content === "" ||
          values.type === ""
        ) {
          setError(true);
        } else {
          const tag = valueTag.map((item: any) => item._id);
          let statusPost: boolean = false;
          let categoryPost: string = "student";
          if (userDetail.role === "admin") {
            if (values.type === "notification") {
              statusPost = true;
              categoryPost = "admin";
            }
            if (values.type === "job") {
              statusPost = true;
              categoryPost = "admin";
            }
            if (values.type === "share") {
              statusPost = true;
              categoryPost = "admin";
            }
            if (values.type === "question") {
              statusPost = true;
              categoryPost = "admin";
            }
          }
          const post = {
            ...values,
            tag,
            content,
            user: userLogin._id,
            status: statusPost,
            category: categoryPost,
            vote: [],
            view: [],
            isFinish: false
          };
          dispatch(addPost(post));
          if (userDetail.role === "admin") {
            socket?.emit("push_new_post_admin", {
              type: "have a new post",
              userName: userDetail.name,
              userId: userLogin._id,
              read: false,
              postId: "",
              writer: userLogin._id,
              post: values.title,
              createdAt: Date.now()
            });
            if (
              values.type === "notification" ||
              values.type === "job" ||
              values.type === "share" ||
              values.type === "question"
            ) {
              setOpenNoti(false);
              if (values.type === "share") {
                history.push(PATH_SHARE);
              } else if (values.type === "question") {
                history.push(PATH_USER_QUESTION);
              } else if (values.type === "notification") {
                history.push(PATH_ADMIN_POST);
              } else if (values.type === "job") {
                history.push(PATH_JOB);
              }
            }
          } else {
            setOpenNoti(true);
          }
        }
      }
      if (mode === "edit") {
        const tag = valueTag.map((item: any) => item._id);
        const item = {
          ...values,
          tag,
          content
        };
        dispatch(editPost(id, item));
        history.push(PATH_ADMIN_POST_LIST);
      }
    }
  });
  const handleCloseNoti = () => {
    setOpenNoti(false);
    history.push(PATH_ADMIN_POST);
  };

  return (
    <>
      <form className="p-10" onSubmit={formik.handleSubmit}>
        <Grid lg={12}>
          <Box className="mb-6 flex">
            <TextField
              fullWidth
              error={!!formik.touched.title && !!formik.errors.title}
              label="Title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              helperText={
                formik.touched.title &&
                formik.errors.title &&
                formik.errors.title
              }
            />
            <Box>
              <FormControl sx={{ minWidth: 145, marginLeft: 1 }}>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="type"
                  value={formik.values.type}
                  label="Type"
                  onChange={formik.handleChange}
                >
                  {userDetail.role === "admin" && (
                    <MenuItem value="notification">Notification</MenuItem>
                  )}
                  {userDetail.role === "admin" && (
                    <MenuItem value="job">Jobs</MenuItem>
                  )}
                  <MenuItem value="share">Share</MenuItem>
                  <MenuItem value="question">Question</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Grid>
        <Box className="mb-6 flex">
          <Grid lg={12}>
            <Box className="flex items-center">
              <Autocomplete
                fullWidth
                multiple
                value={valueTag}
                onChange={(event, newValue) => {
                  setValueTag([
                    ...fixedOptions,
                    ...newValue.filter(
                      (option) => fixedOptions.indexOf(option.id) === -1
                    )
                  ]);
                }}
                options={tags}
                getOptionLabel={(option) => option.name.toLowerCase()}
                filterSelectedOptions
                renderInput={(params) => <TextField {...params} label="Tag" />}
              />
              <Box className="ml-6">
                <Button variant="text" className="w-32" onClick={handleOpen}>
                  Create Tag
                </Button>
                <FormCreateTag isOpen={open} onClose={handleClose} />
              </Box>
            </Box>
          </Grid>
        </Box>

        <Grid item lg={12} md={12}>
          <CKEditor
            editor={ClassicEditor}
            name="content"
            data={formik.values.content}
            onChange={handleChangeContent}
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
        </Grid>
        <Box className="mt-6 flex justify-end">
          {/* {loading === true ? (
            <Box className="mr-1 h-3">
              <CircularProgress />
            </Box>
          ) : null} */}
          <Box className="mr-2">
            <Button
              variant="contained"
              onClick={() => history.push(PATH_ADMIN_POST)}
            >
              Cancel
            </Button>
          </Box>
          <Button
            type="submit"
            variant="contained"
            endIcon={<AddTaskOutlinedIcon />}
          >
            Publish
          </Button>
        </Box>
        {error && (
          <Box className="text-md italic text-red-400 text-right">
            Please enter all fields
          </Box>
        )}
      </form>
      <Dialog
        open={openNoti}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseNoti}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Notification"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            The admin will review and approve the post!! Thanks
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNoti}>Agree</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
