import { Grid, Paper } from "@mui/material";
import NewQuestion from "components/home/new-question";
import PostList from "components/home/posts";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { getPostByTrending } from "store/post/action";

export default function TrendingList() {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.post.posts);
  useEffect(() => {
    dispatch(getPostByTrending());
  }, []);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Paper elevation={0}>
            <PostList data={posts} />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <NewQuestion />
        </Grid>
      </Grid>
    </>
  );
}
