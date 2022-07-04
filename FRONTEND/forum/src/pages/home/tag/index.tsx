import { Box, Container, Grid, Paper } from "@mui/material";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Switch, useParams } from "react-router-dom";
import { appRoutesTag } from "routes/routes.routes";
import { RootState } from "store";
import { getTagById } from "store/tag/action";
import "./tag.css";

export default function TagLayout() {
  const { idTag } = useParams<{ idTag: string }>();
  const dispatch = useDispatch();
  const tagDetail = useSelector((state: RootState) => state.tag.tagDetails);
  const posts = useSelector((state: RootState) => state.post.postTag);

  useEffect(() => {
    if (idTag) {
      dispatch(getTagById(idTag));
    }
  }, [idTag]);

  const renderRoutesTag = (routes: typeof appRoutesTag) =>
    routes.map((route) => (
      <Route
        key={route.path}
        exact={false}
        path={route.path}
        component={route.component}
      />
    ));
  return (
    <>
      <Grid container spacing={2}>
        <Container maxWidth="lg" className="mt-14 mb-10">
          <Grid item xs={12} className="flex ">
            <Box className="bg-blue-400 rounded text-white p-7 font-bold text-xl uppercase mr-5">
              {tagDetail.name}
            </Box>
            <Box>{tagDetail.description}</Box>
          </Grid>
          <Box className="flex justify-end">
            <Box className="mr-4">
              Created: {moment(tagDetail.createdAt).format("L")}
            </Box>
            {tagDetail.createdAt !== tagDetail.updatedAt && (
              <Box>Updated: {moment(tagDetail.updatedAt).format("L")}</Box>
            )}
          </Box>
        </Container>
        <Grid xs={12} className="flex  border-t-2 shadow-md">
          <Container maxWidth="lg">
            <Grid xs={9} className="flex items-center my-3">
              <Box className="mx-5 cursor-pointer hover:text-blue-500 transition-all transform hover:-translate-y-1">
                <Link to={`/tag/${idTag}/share`}>Share</Link>
              </Box>
              <Box className="mx-5 cursor-pointer hover:text-blue-500 transition-all transform hover:-translate-y-1">
                <Link to={`/tag/${idTag}/question`}>Question</Link>
              </Box>
            </Grid>
          </Container>
        </Grid>
      </Grid>
      <Grid className="mt-10" spacing={4}>
        <Container maxWidth="lg" className="flex">
          <Box className="flex">
            <Grid xs={9}>
              <Switch>{renderRoutesTag(appRoutesTag)}</Switch>
            </Grid>
            <Grid xs={3} className="ml-5">
              <Paper elevation={1}>
                <Box className="py-7 px-5">
                  <ul>
                    <li className="flex justify-between mb-2">
                      <p className="opacity-70">Post</p>
                      <p className="text-base font-bold">{posts.length}</p>
                    </li>
                    <li className="flex justify-between mb-2">
                      <p className="opacity-70">Post views</p>
                      <p className="text-base font-bold">10</p>
                    </li>
                    <li className="flex justify-between mb-2">
                      <p className="opacity-70">Questions</p>
                      <p className="text-base font-bold">{posts.length}</p>
                    </li>
                    <li className="flex justify-between mb-2">
                      <p className="opacity-70">Share</p>
                      <p className="text-base font-bold">{posts.length}</p>
                    </li>
                    <li className="flex justify-between mb-2">
                      <p className="opacity-70">Answer</p>
                      <p className="text-base font-bold">10</p>
                    </li>
                  </ul>
                </Box>
              </Paper>
            </Grid>
          </Box>
        </Container>
      </Grid>
    </>
  );
}
