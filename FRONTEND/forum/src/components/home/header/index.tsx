import { RootState } from "store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserLogin } from "store/user/action";
import { NavLink, useHistory } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import {
  PATH_ADMIN_POST,
  PATH_DOCUMENT,
  PATH_USER_QUESTION
} from "routes/routes.paths";
import MessageIcon from "@mui/icons-material/Message";
import Avatar from "./components/avatar";
import Logo from "./components/logo";
import Notification from "./components/notification";
import SearchBar from "./components/search";
import "./header.css";

interface INotification {
  notification: any[];
}
export default function Header({ notification }: INotification) {
  const history = useHistory();
  const dispatch = useDispatch();
  const userLoginLocal = JSON.parse(localStorage.getItem("userLogin") || "");
  const { userLogin } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (userLoginLocal._id) {
      dispatch(getUserLogin(userLoginLocal._id));
    }
  }, []);

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Box
            margin={1}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Logo />
            <Box>
              <NavLink
                to={PATH_ADMIN_POST}
                className="Header_link mx-2 pb-1"
                activeClassName="Active_link"
              >
                Admin
              </NavLink>
              <NavLink
                to={PATH_USER_QUESTION}
                className="Header_link mx-2 pb-1"
                activeClassName="Active_link"
              >
                Question
              </NavLink>
              <NavLink
                to={PATH_DOCUMENT}
                className="Header_link mx-2 pb-1"
                activeClassName="Active_link"
              >
                Document
              </NavLink>
            </Box>
            <SearchBar />
            <Box className="flex items-center">
              <Box
                sx={{ display: { xs: "none", md: "flex" } }}
                className="mr-4"
                onClick={() => history.push(`/messenger/${userLoginLocal._id}`)}
              >
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <MessageIcon />
                </IconButton>
              </Box>

              <Notification notification={notification} />
              <Avatar mode={"user"} userLogin={userLogin} />
            </Box>
          </Box>
        </Container>
      </AppBar>
    </>
  );
}
