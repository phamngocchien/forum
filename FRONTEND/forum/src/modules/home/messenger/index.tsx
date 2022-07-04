import {
  Avatar,
  Button,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem
} from "@mui/material";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import Paper from "@mui/material/Paper";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase
} from "components/home/header/components/search/style";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { debounce } from "debounce";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "./messenger.css";
import { Link } from "react-router-dom";
import {
  createReplyInMessage,
  getMessagesById,
  getMessagesByUser,
  handleListMessage
} from "store/messenger/action";
import { RootState } from "store";
import IMessenger from "types/messenger";
import { randomColor } from "components/randomColor";
import moment from "moment";
import GroupIcon from "@mui/icons-material/Group";
import { socket } from "layout/home";

export default function Messenger() {
  const dispatch = useDispatch();
  const messageEl = useRef(null);
  const userLoginLocal = JSON.parse(localStorage.getItem("userLogin") || "");
  const { messages, messageUsers } = useSelector(
    (state: RootState) => state.messenger
  );
  const [nameUser, setNameUser] = useState("");
  const [idMessage, setIdMessage] = useState("");
  const [valueSearch, setValueSearch] = useState("");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const debouncedSave = useCallback(
    debounce((nextValue: string) => nextValue, 500),
    []
  );

  useEffect(() => {
    socket.emit("newUser", userLoginLocal._id);
  }, [userLoginLocal._id]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      const item = {
        user: data.user,
        content: data.content,
        createdAt: data.createdAt,
        _id: ""
      };
      dispatch(createReplyInMessage(item));
      dispatch(handleListMessage(data.idMessage, item));
    });
  }, []);

  useEffect(() => {
    dispatch(getMessagesByUser(userLoginLocal._id));
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // setOpenSearch(true);
    const { value: nextValue } = e.target;
    debouncedSave(nextValue);
    setValueSearch(nextValue);
  };

  const handleClick = (id: string, isGroup: boolean, name: string) => {
    dispatch(getMessagesById(id));
    setIdMessage(id);
    if (isGroup === true) {
      setNameUser("TLU");
    } else {
      setNameUser(name);
    }
  };

  const initialValues = useMemo(
    () => ({
      content: ""
    }),
    []
  );

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values: any, { resetForm }) => {
      const item = {
        idMessage,
        user: userLoginLocal._id,
        content: values.content,
        createdAt: Date.now()
      };
      socket?.emit("send_message", item);
      // eslint-disable-next-line spaced-comment
      //dispatch(createReplyInMessage(idMessage, item));
      resetForm();
    }
  });
  const newMessage = Object(messages).filter((item: IMessenger) => {
    if (
      item.participants[0].name
        .toLowerCase()
        .includes(valueSearch.toLowerCase())
    ) {
      return item;
    }
    return "";
  });

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDeleteMessage = () => {};

  return (
    <Grid container>
      <Grid item xs={2.5}>
        <Box className="h-screen border-right">
          <Box className="p-3 flex items-center ml-3">
            <Avatar src="Thanglongedu" className="mr-3 cursor-pointer" />
            <p className="text-3xl font-bold text-black ml-2">Chat</p>
          </Box>

          <Search className="mb-5">
            <SearchIconWrapper className="z-10">
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={handleChange}
              className="w-full bg-gray-200 rounded-2xl my-2"
            />
          </Search>
          <Divider className="mx-4" />
          <Box className="overflow-y-visible" sx={{ height: "85%" }}>
            {Object(newMessage)?.map((item: IMessenger) => (
              <Box
                key={item._id}
                className="flex items-center justify-between w-full"
              >
                <Box
                  className="w-full mx-4 my-1 flex items-center p-2 hover:bg-gray-100 cursor-pointer rounded-xl transition"
                  onClick={() =>
                    handleClick(
                      item._id,
                      item.isGroup,
                      item.participants[0].name
                    )
                  }
                >
                  {item.isGroup === true ? (
                    <Avatar
                      className="mr-3 cursor-pointer"
                      sx={{
                        width: 56,
                        height: 56
                      }}
                    >
                      <GroupIcon />
                    </Avatar>
                  ) : (
                    <Avatar
                      alt={item.participants[0].name}
                      src="Thanglongedu"
                      sx={{
                        width: 56,
                        height: 56,
                        bgcolor: `#${randomColor}`
                      }}
                      className="mr-3 cursor-pointer"
                    />
                  )}

                  <Box className="pl-2 w-full">
                    <Box className="text-left text-black">
                      {item.isGroup === true
                        ? "TLU"
                        : item.participants[0].name}
                    </Box>
                    <Box className="flex items-center">
                      <Box className="font-light max-w-4/5 truncate">
                        {item.messages.content}
                      </Box>
                      <Box className="text-xs ml-1">
                        {" "}
                        · {moment(item.updatedAt).startOf("second").fromNow()}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={9.5}>
        <Box className="h-screen">
          <Paper
            elevation={2}
            className="h-16 px-4 flex items-center justify-between"
          >
            <Box className="flex items-center">
              {nameUser === "TLU" ? (
                <Avatar
                  className="mr-3 cursor-pointer"
                  sx={{
                    width: 45,
                    height: 45
                  }}
                >
                  <GroupIcon />
                </Avatar>
              ) : (
                <Avatar
                  src="student"
                  alt={nameUser}
                  sx={{ width: 45, height: 45, bgcolor: `#${randomColor}` }}
                />
              )}
              <Box className="text-left text-black font-bold ml-2 text-xl">
                {nameUser}
              </Box>
            </Box>
            <Link to="/">
              <Button>Home</Button>
            </Link>
          </Paper>
          {Object(messageUsers)._id !== "" && (
            <>
              <Box
                className="p-4 mt-2 overflow-y-scroll"
                ref={messageEl}
                sx={{ height: "86%" }}
              >
                {Object(messageUsers).messages.map((item: any) => (
                  <>
                    {item.user._id !== userLoginLocal._id && (
                      <Box className="flex items-center">
                        <Avatar
                          src="student"
                          alt={item.user.name}
                          sx={{
                            bgcolor: `#${randomColor}`
                          }}
                        />
                        <Box>
                          <Box className="ml-2 bg-gray-100 p-2 my-1 rounded-xl flex items-center">
                            {item.content}
                          </Box>
                        </Box>
                      </Box>
                    )}
                    {item.user._id === userLoginLocal._id && (
                      <Box className="flex justify-end block items-center">
                        <Box className="ml-2 bg-gray-100 p-2 my-1 rounded-xl flex items-center">
                          {item.content}
                        </Box>
                      </Box>
                    )}
                  </>
                ))}
              </Box>
              <form onSubmit={formik.handleSubmit}>
                <Box className="flex items-center mx-3">
                  <input
                    className="bg-gray-200 rounded-full px-4 py-2 w-full my-2 focus:outline-none"
                    name="content"
                    value={formik.values.content}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  <Button type="submit">
                    <SendIcon fontSize="large" className="ml-2" />
                  </Button>
                </Box>
              </form>
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
