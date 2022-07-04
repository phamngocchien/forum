import { Link, NavLink } from "react-router-dom";

import {
  PATH_NEW_POST,
  PATH_TRENDING,
  PATH_SHARE,
  PATH_WRITE_POST,
  PATH_JOB,
  PATH_LIST_TAG
} from "routes/routes.paths";
import { Button, Container } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { Box } from "@mui/system";
import "./navigation.css";

export default function Navigation() {
  const userLogin: any = JSON.parse(localStorage.getItem("userLogin") || "");

  return (
    <Box bgcolor="#425068" padding={1}>
      <Container maxWidth="md">
        <Box className="flex justify-around items-center">
          <Box>
            <NavLink
              to={PATH_NEW_POST}
              activeClassName="Active_link"
              className="Navigation_link mx-2 pb-1"
            >
              Newest
            </NavLink>
            <NavLink
              to={PATH_TRENDING}
              activeClassName="Active_link"
              className="Navigation_link mx-2 pb-1"
            >
              Trending
            </NavLink>
            <NavLink
              to={PATH_SHARE}
              activeClassName="Active_link"
              className="Navigation_link mx-2 pb-1"
            >
              Share
            </NavLink>
            <NavLink
              to={PATH_LIST_TAG}
              activeClassName="Active_link"
              className="Navigation_link mx-2 pb-1"
            >
              Tags
            </NavLink>
            <NavLink
              to={PATH_JOB}
              activeClassName="Active_link"
              className="Navigation_link mx-2 pb-1"
            >
              Jobs
            </NavLink>
          </Box>
          {userLogin.length !== 0 && (
            <Box>
              <Link to={PATH_WRITE_POST}>
                <Button variant="contained" endIcon={<CreateIcon />}>
                  Create Post
                </Button>
              </Link>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}
