import { Switch, Route, useHistory } from "react-router-dom";
import { Avatar, CardMedia, Container, IconButton, Paper } from "@mui/material";
import { Box } from "@mui/system";

import wall from "assets/tlu.jpg";
import Header from "components/home/header";
import Navigation from "components/home/navigation";
import { appRoutes, appRoutesWritePost } from "routes/routes.routes";
import Footer from "components/home/footer";
import UserDetail from "pages/home/user-detail";
import TagLayout from "pages/home/tag";
import io from "socket.io-client";
import { Fragment, SyntheticEvent, useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import "./home.css";
import { randomColor } from "components/randomColor";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { getNotification, pushNotification } from "store/user/action";

interface LayoutProps {
  mode: "FormPost" | "UserDetail" | "Tag";
}

export const socket = io("http://localhost:5000");

export default function UserLayout({ mode }: LayoutProps) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<any>();
  const userLoginLocal = JSON.parse(localStorage.getItem("userLogin") || "");
  const { notification } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    socket.emit("newUser", userLoginLocal._id);
  }, [userLoginLocal._id]);

  useEffect(() => {
    socket.on("get_notification", (data) => {
      if (userLoginLocal._id !== data.userId) {
        dispatch(pushNotification(data));
        setNotifications(data);
      }
    });
    socket.on("get_new_post_admin", (data) => {
      if (userLoginLocal._id !== data.userId) {
        dispatch(pushNotification(data));
        setNotifications(data);
      }
    });
    socket.on("push_new_post_user", (data) => {
      if (userLoginLocal._id !== data.userId) {
        dispatch(pushNotification(data));
        setNotifications(data);
      }
    });
  }, [socket]);

  useEffect(() => {
    dispatch(getNotification(userLoginLocal._id));
  }, []);

  useEffect(() => {
    if (notifications !== undefined) {
      setOpen(true);
    }
  }, [notifications]);

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const renderRoutesNewPost = (routes: typeof appRoutesWritePost) =>
    routes.map((route) => (
      <Route
        key={route.path}
        exact={route.exact}
        path={route.path}
        component={route.component}
      />
    ));
  const renderRoutes = (routes: typeof appRoutes) =>
    routes.map((route) => (
      <Route
        key={route.path}
        exact={route.exact}
        path={route.path}
        component={route.component}
      />
    ));

  const handleClick = () => {
    history.push(`/post-detail/${notifications.postId}`);
    setOpen(false);
  };
  return (
    <>
      <Box className="fixed w-full top-0 left-0 right-0 z-50">
        <Header notification={notification} />
      </Box>
      <Box className="min-h-screen mt-14">
        {mode === "FormPost" ? (
          <Switch>{renderRoutesNewPost(appRoutesWritePost)}</Switch>
        ) : (
          <>
            {mode === "UserDetail" ? (
              <>
                <UserDetail />
              </>
            ) : (
              <>
                {mode === "Tag" ? (
                  <>
                    <TagLayout />
                  </>
                ) : (
                  <>
                    <CardMedia
                      component="img"
                      className="h-52"
                      image={wall}
                      alt="TLU"
                    />
                    <Navigation />
                    <Container maxWidth="lg">
                      <Box className="mt-10">
                        <Switch>{renderRoutes(appRoutes)}</Switch>
                      </Box>
                    </Container>
                  </>
                )}
              </>
            )}
          </>
        )}
      </Box>
      <Footer />
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Paper elevation={3} className="p-3 w-80">
          <Box className="flex justify-between items-center mb-2">
            <Box className="font-bold">Notification</Box>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box
            className="flex items-center p-1 hover:bg-gray-300 cursor-pointer rounded transition"
            onClick={handleClick}
          >
            <Avatar
              alt={notifications?.userName}
              src="student"
              sx={{ bgcolor: `#${randomColor}` }}
            />
            <Box className="pl-2 ">
              <Box className="inline">
                <span className="font-bold mr-1">
                  {notifications?.userName}
                </span>
                <span>{`${notifications?.type}: ${notifications?.post}`}</span>
              </Box>
              <Box className="text-xs text-blue-600">
                {moment(notifications?.createdAt).startOf("second").fromNow()}
              </Box>
            </Box>
          </Box>
        </Paper>
      </Snackbar>
    </>
  );
}
