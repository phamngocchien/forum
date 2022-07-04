import * as React from "react";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Box } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import { Avatar, Menu } from "@mui/material";
import MoreIcon from "@mui/icons-material/MoreVert";
import "./notification.css";
import moment from "moment";
import { randomColor } from "components/randomColor";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleNotification } from "store/user/action";

interface INotification {
  notification: any[];
}
export default function Notification({ notification }: INotification) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const [number, setNumber] = React.useState(0);
  // eslint-disable-next-line no-var
  var dateNow = new Date().getDate();
  const history = useHistory();
  const userLoginLocal = JSON.parse(localStorage.getItem("userLogin") || "");
  React.useEffect(() => {
    if (notification.length !== 0) {
      const notiFilter = notification?.filter(
        (item: any) => item.read === false
      );
      setNumber(notiFilter.length);
    }
  }, [notification]);

  const sortNotifications = notification?.sort(
    (a: any, b: any) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (idPost: string, id: string) => {
    dispatch(handleNotification(userLoginLocal._id, { idNoti: id }));
    history.push(`/post-detail/${idPost}`);
    setAnchorEl(null);
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
      <Box width="380px">
        <Box className="text-center pb-1 font-bold border-b-2 rounded">
          Notification
        </Box>
        <Box className="overflow-y-scroll notificaton">
          {sortNotifications?.length === 0 || notification === undefined ? (
            <Box className="text-xl text-gray-300 text-center mt-3">
              Nothing here!!!
            </Box>
          ) : (
            <Box className="my-2">
              {sortNotifications?.map((item: any) => (
                <>
                  <Box
                    className=" p-2 mx-2 flex items-center hover:bg-gray-200 transition cursor-pointer rounded-lg "
                    onClick={() => handleClick(item?.postId, item?._id)}
                  >
                    <Avatar
                      alt={item?.userName}
                      src="Thanglongedu"
                      sx={{
                        width: 50,
                        height: 50,
                        bgcolor: `#${randomColor}`
                      }}
                      className="mr-3"
                    />
                    <Box className="w-full">
                      <Box className="inline content">
                        <span className="font-bold mr-1">{item?.userName}</span>
                        <span>{`${item?.type}: ${item?.post}`}</span>
                      </Box>
                      <Box className="text-xs text-blue-600">
                        {new Date(item?.createdAt).getDate() === dateNow
                          ? moment(item?.createdAt).startOf("second").fromNow()
                          : moment(item?.createdAt).format(
                              "MMMM Do YYYY, h:mm a"
                            )}
                      </Box>
                    </Box>
                    <Box sx={{ width: "5%" }}>
                      {item.read === false && (
                        <Box className="w-3 h-3 bg-blue-500 rounded-full">
                          {" "}
                        </Box>
                      )}
                    </Box>
                  </Box>
                </>
              ))}
            </Box>
          )}
        </Box>
        <Box className="text-center pt-2 border-t-2">All</Box>
      </Box>
    </Menu>
  );
  return (
    <>
      <Box sx={{ display: { xs: "none", md: "flex" } }} className="mr-5">
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <Badge
            badgeContent={number}
            color="error"
            onClick={handleProfileMenuOpen}
          >
            <NotificationsIcon />
          </Badge>
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
