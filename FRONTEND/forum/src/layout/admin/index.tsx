import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PostAddIcon from "@mui/icons-material/PostAdd";
import GroupIcon from "@mui/icons-material/Group";
import StyleIcon from "@mui/icons-material/Style";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ApprovalIcon from "@mui/icons-material/Approval";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";
import { Collapse, ListItemButton } from "@mui/material";
import "./admin.css";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import CategoryIcon from "@mui/icons-material/Category";
import { appRoutesAdmin } from "routes/routes.routes";
import { Link, Route, Switch } from "react-router-dom";
import {
  PATH_ADMIN_DOCUMENT,
  PATH_ADMIN_DOCUMENT_TYPE,
  PATH_ADMIN_POST_APPROVAL,
  PATH_ADMIN_POST_LIST,
  PATH_ADMIN_TAG,
  PATH_ADMIN_USER
} from "routes/routes.paths";
import Avatar from "components/home/header/components/avatar";
import { socket } from "layout/home";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { getUserLogin } from "store/user/action";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: "hidden"
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`
  }
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme)
  })
}));

export default function AdminLayout() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [openSidebar, setOpenSideBar] = React.useState(false);
  const [openPost, setOpenPost] = React.useState(false);
  const [openDocument, setOpenDocument] = React.useState(false);
  const userLoginLocal = JSON.parse(localStorage.getItem("userLogin") || "");
  const { userLogin } = useSelector((state: RootState) => state.user);

  React.useEffect(() => {
    if (userLoginLocal._id) {
      dispatch(getUserLogin(userLoginLocal._id));
    }
  }, []);

  React.useEffect(() => {
    socket.emit("newUser", userLoginLocal._id);
  }, [userLoginLocal._id]);

  const handleClickOpenPost = () => {
    setOpenPost(!openPost);
    setOpenSideBar(true);
  };
  const handleClickOpenDocument = () => {
    setOpenDocument(!openDocument);
    setOpenSideBar(true);
  };
  const handleDrawerOpenSideBar = () => {
    setOpenSideBar(true);
  };

  const handleDrawerCloseSideBar = () => {
    setOpenSideBar(false);
    setOpenPost(false);
    setOpenSideBar(false);
  };
  const renderRoutesAdmin = (routes: typeof appRoutesAdmin) =>
    routes.map((route) => (
      <Route
        key={route.path}
        exact={route.exact}
        path={route.path}
        component={route.component}
      />
    ));
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={openSidebar}>
        <Toolbar className="flex justify-between">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpenSideBar}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(openSidebar && { display: "none" })
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            TLU
          </Typography>
          <Avatar mode={"admin"} userLogin={userLogin} />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={openSidebar}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerCloseSideBar}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <Link to="dashboard">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
          </Link>
          <ListItemButton onClick={handleClickOpenPost}>
            <ListItemIcon>
              <PostAddIcon />
            </ListItemIcon>
            <ListItemText primary="Posts" />
            {openPost ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openPost} timeout="auto" unmountOnExit>
            <Link to={PATH_ADMIN_POST_LIST}>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ListAltIcon />
                  </ListItemIcon>
                  <ListItemText primary="List" />
                </ListItemButton>
              </List>
            </Link>
            <Link to={PATH_ADMIN_POST_APPROVAL}>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ApprovalIcon />
                  </ListItemIcon>
                  <ListItemText primary="Approval" />
                </ListItemButton>
              </List>
            </Link>
          </Collapse>
          <ListItemButton onClick={handleClickOpenDocument}>
            <ListItemIcon>
              <ArticleIcon />
            </ListItemIcon>
            <ListItemText primary="Document" />
            {openDocument ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openDocument} timeout="auto" unmountOnExit>
            <Link to={PATH_ADMIN_DOCUMENT}>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ListAltIcon />
                  </ListItemIcon>
                  <ListItemText primary="List" />
                </ListItemButton>
              </List>
            </Link>
            <Link to={PATH_ADMIN_DOCUMENT_TYPE}>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <CategoryIcon />
                  </ListItemIcon>
                  <ListItemText primary="Genre" />
                </ListItemButton>
              </List>
            </Link>
          </Collapse>
          <Link to={PATH_ADMIN_TAG}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <StyleIcon />
                </ListItemIcon>
                <ListItemText primary="Tag" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to={PATH_ADMIN_USER}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="User" />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
        className="bg-gray-100 min-h-screen"
      >
        <DrawerHeader />
        <Switch>{renderRoutesAdmin(appRoutesAdmin)}</Switch>
      </Box>
    </Box>
  );
}
