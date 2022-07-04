import { Box, Button, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { getUserDetail } from "store/user/action";
import FormUpdate from "./form";
import "./user-info.css";

export default function UserInfo() {
  const dispatch = useDispatch();
  const userLogin = JSON.parse(localStorage.getItem("userLogin") || "");
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<string>("name");

  const { userDetail } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (userLogin._id) {
      dispatch(getUserDetail(userLogin._id));
    }
  }, [userLogin._id]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleModeName = () => {
    setOpen(true);
    setMode("name");
  };
  const handleModeGithub = () => {
    setOpen(true);
    setMode("github");
  };
  const handleModeFacebook = () => {
    setOpen(true);
    setMode("facebook");
  };
  const handleModePassword = () => {
    setOpen(true);
    setMode("password");
  };
  return (
    <>
      <Paper className="mr-10 p-7">
        <ul>
          <li className="flex items-center mb-4">
            <p className="w-36">Name: </p>
            <Box sx={{ minWidth: "200px" }}>{userDetail.name}</Box>
            <Button size="medium" onClick={handleModeName}>
              Update
            </Button>
          </li>
          <li className="flex items-center mb-4">
            <p className="w-36">Student code: </p>
            <Box sx={{ minWidth: "200px" }}>{userDetail.msv}</Box>
          </li>
          <li className="flex items-center mb-4">
            <p className="w-36">Major: </p>
            <Box sx={{ minWidth: "200px" }}>{userDetail.major}</Box>
          </li>
          <li className="flex items-center mb-4">
            <p className="w-36">Email address: </p>
            <Box sx={{ minWidth: "200px" }}>{userDetail.email}</Box>
          </li>
          <li className="flex items-center mb-4">
            <p className="w-36">Facebook: </p>
            <Box sx={{ minWidth: "200px" }}>{userDetail.facebook}</Box>
            <Button size="medium" onClick={handleModeFacebook}>
              Update
            </Button>
          </li>
          <li className="flex items-center mb-4">
            <p className="w-36">Github: </p>
            <Box sx={{ minWidth: "200px" }}>{userDetail.github}</Box>
            <Button size="medium" onClick={handleModeGithub}>
              Update
            </Button>
          </li>
          <li className="flex items-center mb-4">
            <p className="w-36">Password: </p>
            <Box sx={{ minWidth: "200px" }}>*****</Box>
            <Button size="medium" onClick={handleModePassword}>
              Update
            </Button>
          </li>
        </ul>
      </Paper>
      <FormUpdate
        mode={mode}
        isOpen={open}
        onClose={handleClose}
        data={userDetail}
      />
    </>
  );
}
