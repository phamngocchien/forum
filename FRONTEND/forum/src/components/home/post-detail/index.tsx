import moment from "moment";
import {
  Box,
  Grid,
  ListItemText,
  Typography,
  Chip,
  Divider
} from "@mui/material";
import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./post-detail.css";
import { getPostDetail, handleView } from "store/post/action";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import ReactHtmlParser from "react-html-parser";
import ITag from "types/tag";
import Replies from "./reply";
import UserPost from "./user-post";
import BookmarkVote from "./bookmark-vote";
import RelatedPosts from "./related-posts";

export default function PostDetail() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const { postDetail } = useSelector((state: RootState) => state.post);
  const userLogin = JSON.parse(localStorage.getItem("userLogin") || "");

  const dateNow = new Date().getDate();
  useEffect(() => {
    if (id) {
      dispatch(getPostDetail(id));
      dispatch(
        handleView(id, {
          idUser: userLogin._id
        })
      );
    }
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleOpenTag = (idTag: any) => {
    history.push(`/tag/${idTag}/share`);
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          {/* {loading ? (
            <Box className="flex justify-center mt-10">
              <CircularProgress />
            </Box>
          ) : ( */}
          <ListItemText>
            {postDetail.map((item: any) => (
              <>
                <Typography
                  sx={{ display: "inline", position: "relative" }}
                  component="span"
                >
                  <Box className="text-2xl mb-4 font-bold">{item.title}</Box>
                  <BookmarkVote vote={item.vote} post={item} />
                </Typography>
                <Box className="flex">
                  <Box className="text-sm mr-2 flex items-center">
                    <Box className="text-gray-400 mr-1">Asked</Box>
                    {new Date(item.createdAt).getDate() === dateNow
                      ? moment(item.createdAt).startOf("second").fromNow()
                      : moment(item.createdAt).format("MMMM Do YYYY, h:mm a")}
                  </Box>
                  <Box className="text-sm mx-2 flex items-center">
                    <Box className="text-gray-400 mr-1 ">Viewer</Box>
                    {item.view.length}
                  </Box>
                </Box>
                <Box className="my-5">
                  <Divider />
                </Box>
                <Typography sx={{ display: "outline" }} component="span">
                  <Grid item xs={12}>
                    <Box className="text-md mt-8 leading-7 reset">
                      {ReactHtmlParser(item.content)}
                    </Box>
                    {item.tag.map((tag: ITag) => (
                      <>
                        <Chip
                          label={tag.name}
                          color="primary"
                          variant="outlined"
                          className="opacity-70 cursor-pointer"
                          sx={{ marginRight: 1, marginTop: "20px" }}
                          onClick={() => {
                            handleOpenTag(tag._id);
                          }}
                        />
                      </>
                    ))}
                    <Box className="mt-5">
                      <Divider />
                    </Box>
                  </Grid>
                </Typography>
              </>
            ))}
          </ListItemText>
          {/* )} */}
        </Grid>
        <UserPost />
        <Grid item xs={9}>
          <Replies />
        </Grid>
        <Grid item xs={12}>
          <RelatedPosts />
        </Grid>
      </Grid>
    </>
  );
}
