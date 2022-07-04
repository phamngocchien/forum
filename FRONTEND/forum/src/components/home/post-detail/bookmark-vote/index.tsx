import { Box } from "@mui/material";
import clsx from "clsx";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useEffect, useState } from "react";
import { getUserDetail, handleMarkPost } from "store/user/action";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { useParams } from "react-router-dom";
import "../post-detail.css";
import { handlePostVote, handleIsFinish } from "store/post/action";

import { socket } from "layout/home";

interface IBookmarkVote {
  vote: [];
  post: any;
}
export default function BookmarkVote({ vote, post }: IBookmarkVote) {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const [isMark, setIsMark] = useState(false);
  const [upVote, setUpVote] = useState(true);
  const [downVote, setDownVote] = useState(true);
  const [voteNumber, setVoteNumber] = useState(0);
  const { userDetail } = useSelector((state: RootState) => state.user);
  const userLogin = JSON.parse(localStorage.getItem("userLogin") || "");

  useEffect(() => {
    let number: number = 0;
    vote.map((item: any) => (number += Number(item.score)));
    setVoteNumber(number);
  }, [vote]);

  useEffect(() => {
    // eslint-disable-next-line array-callback-return
    vote.map((item: any) => {
      if (item.user === userLogin._id) {
        if (item.direction === "increment") {
          setUpVote(false);
        }
        if (item.direction === "decrement") {
          setDownVote(false);
        }
        if (
          (item.direction === "increment" || item.direction === "decrement") &&
          item.score === 0
        ) {
          setDownVote(true);
          setUpVote(true);
        }
      }
    });
  }, [vote, voteNumber]);
  useEffect(() => {
    const handleUser = async () => {
      if (userLogin._id) {
        dispatch(getUserDetail(userLogin._id));
      }
      if (userDetail) {
        // eslint-disable-next-line array-callback-return
        await userDetail?.bookmark?.map((item: string) => {
          if (item === id) {
            setIsMark(true);
          }
        });
      }
    };
    handleUser();
  }, [userLogin._id]);

  const handleMark = () => {
    setIsMark(!isMark);
    if (isMark === false) {
      const item = {
        mode: "create",
        idUser: userLogin._id
      };
      dispatch(handleMarkPost(id, item));
    }
    if (isMark === true) {
      const item = {
        mode: "delete",
        idUser: userLogin._id
      };
      dispatch(handleMarkPost(id, item));
    }
  };

  const handleVoteIncrement = () => {
    if (downVote === false) {
      setDownVote(true);
      setVoteNumber(voteNumber + 1);
      const item = {
        user: userLogin._id,
        direction: "increment",
        score: 0
      };
      dispatch(handlePostVote(id, item));
    } else {
      setDownVote(true);
      setVoteNumber(voteNumber + 1);
      const item = {
        user: userLogin._id,
        direction: "increment",
        score: +1
      };
      dispatch(handlePostVote(id, item));
      socket?.emit("push_notification", {
        type: "voted",
        userName: userDetail.name,
        userId: userDetail._id,
        post: post.title,
        postId: id,
        writer: post.user._id,
        read: false,
        createdAt: Date.now()
      });
    }
  };

  const handleVoteDecrement = () => {
    if (upVote === false) {
      setUpVote(true);
      setVoteNumber(voteNumber - 1);
      const item = {
        user: userLogin._id,
        direction: "decrement",
        score: 0
      };
      dispatch(handlePostVote(id, item));
    } else {
      setUpVote(true);
      setVoteNumber(voteNumber - 1);
      const item = {
        user: userLogin._id,
        direction: "decrement",
        score: -1
      };
      dispatch(handlePostVote(id, item));
      socket?.emit("push_notification", {
        type: "voted",
        userName: userDetail.name,
        userId: userDetail._id,
        post: post.title,
        postId: post._id,
        writer: post.user._id,
        read: false,
        createdAt: Date.now()
      });
    }
    if (downVote === false) {
      // eslint-disable-next-line no-useless-return
      return;
    }
  };

  const handleFinish = (status: boolean) => {
    if (post.user._id === userLogin._id) {
      dispatch(handleIsFinish(post._id, { status }));
    }
  };
  return (
    <Box className="absolute -left-20 top-0 text-center">
      {post.type === "question" && (
        <>
          {post.isFinish ? (
            <CheckCircleIcon
              color="primary"
              sx={{ fontSize: "46px", marginBottom: "10px" }}
              className={clsx("cursor-default", {
                "cursor-pointer": post.user._id === userLogin._id
              })}
              onClick={() => handleFinish(false)}
            />
          ) : (
            <CheckCircleOutlineIcon
              color="primary"
              className={clsx("cursor-default", {
                "cursor-pointer": post.user._id === userLogin._id
              })}
              sx={{ fontSize: "46px", marginBottom: "10px" }}
              onClick={() => handleFinish(true)}
            />
          )}
        </>
      )}

      {isMark === true ? (
        <BookmarkAddedIcon
          color="primary"
          sx={{ fontSize: "50px", cursor: "pointer", color: "#1976d2" }}
          onClick={handleMark}
        />
      ) : (
        <BookmarkAddOutlinedIcon
          color="primary"
          sx={{ fontSize: "50px", cursor: "pointer" }}
          onClick={handleMark}
        />
      )}
      <Box>
        <ArrowDropUpIcon
          className={clsx("button-on", {
            "button-off": upVote === false
          })}
          sx={{ fontSize: "60px", cursor: "pointer" }}
          onClick={handleVoteIncrement}
        />
        <Box className="text-3xl">{voteNumber}</Box>

        <ArrowDropDownIcon
          className={clsx("button-on", {
            "button-off": downVote === false
          })}
          sx={{ fontSize: "60px", cursor: "pointer" }}
          onClick={handleVoteDecrement}
        />
      </Box>
    </Box>
  );
}
