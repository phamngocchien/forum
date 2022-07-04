import { ListItem, ListItemText, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import NotListedLocationOutlinedIcon from "@mui/icons-material/NotListedLocationOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import moment from "moment";

import "./new-question.css";
import { getPostByStudentQuestionNow } from "store/post/action";
import { useHistory } from "react-router";

export default function NewQuestion() {
  const history = useHistory();
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.post.postsQuestionNow);
  useEffect(() => {
    dispatch(getPostByStudentQuestionNow());
  }, []);
  const dateNow = new Date().getDate();

  return (
    <div>
      <Paper elevation={0}>
        <Box className="uppercase text-blue-500 ml-4 pt-3  flex items-center">
          <NotListedLocationOutlinedIcon />
          New Question
        </Box>
        <ListItem className="cursor-pointer mt-4">
          <ListItemText>
            {posts.map((item: any) => (
              <>
                <Box className="border-Bottom mb-4">
                  <Typography sx={{ display: "inline" }} component="span">
                    <Box
                      className="text-md hover:text-blue-500 transition-all wrapper-content"
                      onClick={() => history.push(`/post-detail/${item._id}`)}
                    >
                      {item.title}
                    </Box>
                  </Typography>
                  <Box className="flex text-xs text-gray-400 cursor-default">
                    <Box className=" mt-2 flex justify-center items-center mr-2 ">
                      <EventAvailableIcon
                        className="text-gray-400 mr-1 "
                        fontSize="small"
                      />
                      {new Date(item.createdAt).getDate() === dateNow
                        ? moment(item.createdAt).startOf("second").fromNow()
                        : moment(item.createdAt).format("MMMM Do YYYY, h:mm a")}
                    </Box>
                    <Box className=" mt-2 flex justify-center items-center mx-2 ">
                      <RemoveRedEyeOutlinedIcon
                        className="text-gray-400 mr-2 "
                        fontSize="small"
                      />
                      {item.view.length}
                    </Box>
                    <Box className=" mt-2 flex justify-center items-center mx-2 ">
                      <ThumbUpAltIcon
                        className="text-gray-400 mr-2"
                        fontSize="small"
                      />
                      {item.vote.length !== 0 ? (
                        <>
                          {item.vote.reduce((a: any, b: any) => a + b.score, 0)}
                        </>
                      ) : (
                        0
                      )}
                    </Box>
                  </Box>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    className="cursor-default"
                  >
                    <Box className="text-sm my-1 text-opacity-70 text-gray-500 mt-2 flex items-center ">
                      <PersonOutlineOutlinedIcon className=" pb-1 mr-2 " />
                      {item.user.name}
                    </Box>
                  </Typography>
                </Box>
              </>
            ))}
          </ListItemText>
        </ListItem>
      </Paper>
    </div>
  );
}
