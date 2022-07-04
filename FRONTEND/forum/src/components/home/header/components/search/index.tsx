import { debounce } from "debounce";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent, useCallback, useState } from "react";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import List from "@mui/material/List";
import ReactHtmlParser from "react-html-parser";
import ListItem from "@mui/material/ListItem";

import { Avatar, Divider } from "@mui/material";
import ListSubheader from "@mui/material/ListSubheader";
import { RootState } from "store";
import { Link, useHistory } from "react-router-dom";

import { searchAll } from "store/search/action";
import { Search, SearchIconWrapper, StyledInputBase } from "./style";
import "./search.css";

export default function SearchBar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.search);

  const [openSearch, setOpenSearch] = useState(false);
  const [valueSearch, setValueSearch] = useState("");

  const debouncedSave = useCallback(
    debounce(
      (nextValue: string) => dispatch(searchAll({ keyword: nextValue })),
      500
    ),
    []
  );
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOpenSearch(true);
    const { value: nextValue } = e.target;
    debouncedSave(nextValue);
    setValueSearch(nextValue);
  };

  const handleCloseSearch = () => {
    setOpenSearch(false);
  };
  const handleOpenPost = (id: string) => {
    history.push(`/post-detail/${id}`);
    setOpenSearch(false);
  };
  const handleOpenUserDetail = (id: string) => {
    history.push(`/user/${id}/post`);
    setOpenSearch(false);
  };
  const handleOpenTag = (id: string) => {
    history.push(`/tag/${id}/share`);
    setOpenSearch(false);
  };

  return (
    <Box onClick={handleCloseSearch}>
      <Search className="relative">
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          onChange={handleChange}
        />
        {openSearch && (
          <List
            className="list"
            sx={{
              bgcolor: "background.paper",
              position: "absolute",
              overflow: "auto",
              "& ul": { padding: 0 }
            }}
            subheader={<li />}
          >
            <li>
              <ul>
                <ListSubheader sx={{ bgcolor: "#3b8ad9", color: "white" }}>
                  Posts
                </ListSubheader>
                <Divider />
                {data.post?.map((item: any) => (
                  <>
                    <ListItem
                      sx={{ display: "block", marginY: 1, cursor: "pointer" }}
                      onClick={() => handleOpenPost(item._id)}
                    >
                      <Box className="list-item-post-title text-gray-700 ">
                        {item.title}
                      </Box>
                      <Box className="list-item-post-created text-gray-500">
                        {item.user.name} posted on{" "}
                        {moment(item.createdAt).format("dd MM, h:mm a")}
                      </Box>
                      <Box className="list-item-post-content text-gray-500">
                        {ReactHtmlParser(item.content)}
                      </Box>
                      <Divider variant="inset" component="li" />
                    </ListItem>
                  </>
                ))}
              </ul>
              <ul>
                <Divider />
                <ListSubheader sx={{ bgcolor: "#3b8ad9", color: "white" }}>
                  Users
                </ListSubheader>
                <Divider />
                {data.user?.map((item: any) => (
                  <>
                    <ListItem
                      className="block text-gray-600"
                      sx={{ display: "block", cursor: "pointer" }}
                      onClick={() => handleOpenUserDetail(item._id)}
                    >
                      <Box className="flex items-center my-2">
                        <Avatar alt={item.name} src="student" />
                        <Box className="ml-3">
                          <p className="list-item-user-name">{item.name}</p>
                          <p className="list-item-user-major">{item.major}</p>
                        </Box>
                      </Box>
                    </ListItem>
                  </>
                ))}
              </ul>
              <ul>
                <Divider />
                <ListSubheader sx={{ bgcolor: "#3b8ad9", color: "white" }}>
                  Tags
                </ListSubheader>
                <Divider />
                {data.tag?.map((item: any) => (
                  <>
                    <ListItem
                      className="block text-gray-600 my-2 cursor-pointer"
                      sx={{ display: "block" }}
                      onClick={() => handleOpenTag(item._id)}
                    >
                      {item.name}
                    </ListItem>
                  </>
                ))}
              </ul>
            </li>
            <Link to={`/search/${valueSearch.toLowerCase()}`}>
              <Box className="text-black text-center hover:underlined cursor-pointer border-top pt-1">
                All
              </Box>
            </Link>
          </List>
        )}
      </Search>
    </Box>
  );
}
