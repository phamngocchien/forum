import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useHistory } from "react-router";
import { PATH_ADMIN_DASHBOARD } from "routes/routes.paths";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "store/user/action";

interface avatarProps {
  mode: "admin" | "user";
  userLogin: any;
}
export default function Avatar({ mode, userLogin }: avatarProps) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const userLoginLocal = JSON.parse(localStorage.getItem("userLogin") || "");

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleOpenProfie = () => {
    history.push(`/user/${userLoginLocal._id}/post`);
    setAnchorEl(null);
  };
  const hanldeLogout = (): void => {
    dispatch(logOut());
    history.push("/login");
  };
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Box className="cursor-default mx-4 my-1 font-medium">
        hi, {userLogin.name}
      </Box>
      {mode === "admin" ? (
        <Link to="/">
          <MenuItem>Home</MenuItem>
        </Link>
      ) : (
        <>
          {userLogin.role === "admin" && (
            <Link to={PATH_ADMIN_DASHBOARD}>
              <MenuItem>DashBoard</MenuItem>
            </Link>
          )}
        </>
      )}
      <MenuItem onClick={() => handleOpenProfie()}>Profile</MenuItem>
      <MenuItem onClick={hanldeLogout}>Log Out</MenuItem>
    </Menu>
  );

  return (
    <>
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </Box>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="show more"
          aria-haspopup="true"
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
      </Box>
      {renderMenu}
    </>
  );
}
