/* eslint-disable react/jsx-no-target-blank */
import { Avatar, Box, Grid, Paper, Button } from "@mui/material";
import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import { getPostDetail } from "store/post/action";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { randomColor } from "components/randomColor";
import { getReplyByIdPost } from "store/reply/action";
import { getUserDetail } from "store/user/action";

export default function UserPost() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const postDetail = useSelector((state: RootState) => state.post.postDetail);
  const replies = useSelector((state: RootState) => state.reply.replies);

  const userLogin = JSON.parse(localStorage.getItem("userLogin") || "");
  useEffect(() => {
    if (id) {
      dispatch(getPostDetail(id));
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      dispatch(getReplyByIdPost(id));
    }
  }, [id, replies.length]);

  useEffect(() => {
    if (userLogin._id) {
      dispatch(getUserDetail(userLogin._id));
    }
  }, [userLogin._id]);

  return (
    <Grid item xs={3}>
      {postDetail.map((item: any) => (
        <>
          <Paper elevation={1} className="h-80 text-center">
            <Box
              className="flex justify-center pt-8 pb-4"
              onClick={() => history.push(`/user/${item.user._id}/post`)}
            >
              <Avatar
                alt={item.user.name}
                src="student"
                sx={{ bgcolor: `#${randomColor}` }}
                className="flex justify-center"
              />
            </Box>
            <Box
              className="text-xl mb-1 cursor-pointer hover:text-blue-500 hover:underline transition-all"
              onClick={() => history.push(`/user/${item.user._id}/post`)}
            >
              {item.user.name}
            </Box>
            <Box className="text-md mb-1 ">{item.user.email}</Box>
            <Box className="my-3">
              <a href={item.user.facebook} target="_blank">
                <FacebookRoundedIcon
                  fontSize="large"
                  className="text-blue-500 hover:text-blue-400 mx-2 transition-all cursor-pointer"
                />
              </a>
              <a href={item.user.github} target="_blank">
                <GitHubIcon
                  className="hover:text-gray-500 transition-all cursor-pointer"
                  fontSize="large"
                />
              </a>
            </Box>
            <Box className="flex justify-center my-4">
              <Button
                variant="contained"
                endIcon={<BookmarksOutlinedIcon />}
                onClick={() => history.push(`/user/${item.user._id}/post`)}
              >
                {item.user.name}'s post
              </Button>
            </Box>
          </Paper>
        </>
      ))}
    </Grid>
  );
}
