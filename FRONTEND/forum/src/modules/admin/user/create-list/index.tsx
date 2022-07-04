import { Box, Button, Card, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { styled } from "@mui/system";
import { PATH_ADMIN_USER } from "routes/routes.paths";
import { addListUser } from "store/user/action";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { RootState } from "store";
import XLSX from "xlsx";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import UserList from "../list";

const Input = styled("input")({
  display: "none"
});

export default function CreateList() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [errorAdd, setErrorAdd] = useState(false);
  const { errorAddList } = useSelector((state: RootState) => state.user);

  const readExcel = (file: any) => {
    setErrorAdd(false);
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e: any) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };
      fileReader.onerror = (error: any) => {
        reject(error);
      };
    });
    promise.then((d: any) => {
      setItems(d);
    });
  };

  function handleAddListUser() {
    // eslint-disable-next-line array-callback-return
    items.map((item: any) => {
      item.password = "123456";
      item.email = `${item.msv}@thanglong.edu.vn`;
      item.facebook = "";
      item.github = "";
      item.follow = [];
      item.notification = [];
    });
    dispatch(addListUser(items));
    if (Object(errorAddList)) {
      setItems(errorAddList);
      setErrorAdd(true);
    } else {
      history.push(PATH_ADMIN_USER);
    }
  }

  return (
    <>
      <Card className="px-5 mb-5 flex items-center justify-between">
        <Link to={PATH_ADMIN_USER}>
          <Button className="h-10">
            <ArrowBackIcon />
          </Button>
        </Link>
        <Box className="font-bold py-8 mr-10">ADD LIST USER</Box>
      </Card>
      <Box className="mb-3 flex justify-between ">
        <Stack direction="row" alignItems="center" spacing={2}>
          <label htmlFor="icon-button-file">
            <Input
              id="icon-button-file"
              type="file"
              onChange={(e: any) => {
                const file = e.target.files[0];
                readExcel(file);
              }}
            />
            <Button
              variant="contained"
              component="span"
              className="flex items-center"
            >
              Upload
              <FileUploadIcon fontSize="small" className="ml-1" />
            </Button>
          </label>
        </Stack>
        {items.length > 0 && (
          <Button className="" variant="contained" onClick={handleAddListUser}>
            Add list
          </Button>
        )}
      </Box>
      <UserList data={items} mode="addlist" />
      {errorAdd && (
        <Box className="text-md italic text-red-400 mt-1 text-right">
          The above student codes already exist
        </Box>
      )}
    </>
  );
}
