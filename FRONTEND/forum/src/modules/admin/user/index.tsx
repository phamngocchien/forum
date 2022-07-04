import { RootState } from "store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from "@mui/material";
import Search from "components/admin/search";
import { getUsers, searchUser } from "store/user/action";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import UserList from "./list";

export default function User() {
  const dispatch = useDispatch();
  const history = useHistory();
  const users = useSelector((state: RootState) => state.user.users);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleValueSearch = (e: string): void => {
    const key = { keyword: e };
    dispatch(searchUser(key));
  };
  const handleChangeRole = (e: SelectChangeEvent): void => {
    const key = { keyword: e.target.value };
    dispatch(searchUser(key));
  };

  const sortData = users.sort(
    (a: any, b: any) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <Box className="  ">
      <Card className="flex items-center justify-between px-5 mb-5">
        <Box className="font-bold">USER</Box>
        <Box className="flex items-center">
          <Search onSubmitForm={handleValueSearch} />
          <FormControl sx={{ m: 2, minWidth: 200 }}>
            <InputLabel id="demo-controlled-open-select-label">Role</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              label="Role"
              name="role"
              onChange={handleChangeRole}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"admin"}>Admin</MenuItem>
              <MenuItem value={"student"}>Student</MenuItem>
            </Select>
          </FormControl>
          <ButtonGroup disableElevation>
            <Button
              className="h-9 w-14"
              type="submit"
              variant="outlined"
              onClick={() => history.push(`/admin/user/add`)}
            >
              <AddIcon fontSize="large" />
            </Button>
            <Button
              className="h-9 w-14"
              type="submit"
              variant="outlined"
              onClick={() => history.push(`/admin/user/addlist`)}
            >
              <PlaylistAddIcon fontSize="large" />
            </Button>
          </ButtonGroup>
        </Box>
      </Card>
      <Box>
        <UserList data={sortData} />
      </Box>
    </Box>
  );
}
