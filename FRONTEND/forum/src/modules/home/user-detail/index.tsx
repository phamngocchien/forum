import { Avatar, Box, Button, Container, Grid, Paper } from "@mui/material";
import { randomColor } from "components/randomColor";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Switch, useHistory, useParams } from "react-router-dom";
import { appRoutesUserInformation } from "routes/routes.routes";
import { RootState } from "store";
import { getPostByUserId } from "store/post/action";
import { getReplyByIdUser } from "store/reply/action";
import { getUserDetail, getUserLogin, handleFollow } from "store/user/action";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import MessageIcon from "@mui/icons-material/Message";
import { createMessenger } from "store/messenger/action";

export default function UserDetailLayout() {
  const { idUser } = useParams<{ idUser: string }>();
  const history = useHistory();
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.post.posts);
  const replies = useSelector((state: RootState) => state.reply.replies);
  const userLogin = useSelector((state: RootState) => state.user.userLogin);
  const { userDetail } = useSelector((state: RootState) => state.user);
  const [isFollow, setisFollow] = useState(false);

  const userLoginLocal = JSON.parse(localStorage.getItem("userLogin") || "");

  const postfilterQuestion = posts.filter(
    (element: any) => element.type === "question"
  );
  const postfilterShare = posts.filter(
    (element: any) => element.type === "share"
  );

  useEffect(() => {
    if (userLoginLocal._id) {
      dispatch(getUserLogin(userLoginLocal._id));
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line array-callback-return
    userLogin?.follow?.map((item: any) => {
      if (item === idUser) {
        setisFollow(true);
      }
    });
  }, [userLogin, userDetail]);

  useEffect(() => {
    if (idUser) {
      dispatch(getPostByUserId(idUser));
      dispatch(getUserDetail(idUser));
      dispatch(getReplyByIdUser(idUser));
    }
  }, [idUser]);

  const renderRoutesUserDetail = (routes: typeof appRoutesUserInformation) =>
    routes.map((route) => (
      <Route
        key={route.path}
        exact={false}
        path={route.path}
        component={route.component}
      />
    ));

  const handleFollowUser = () => {
    dispatch(
      handleFollow(userLogin._id, {
        mode: "follow",
        id: userDetail._id
      })
    );
  };
  const handleUnfollowUser = () => {
    dispatch(
      handleFollow(userLogin._id, {
        mode: "unfollow",
        id: userDetail._id
      })
    );
    setisFollow(false);
  };

  const handleClickMessage = (id: string, nameUser: string) => {
    const item = {
      isGroup: false,
      participants: [id, userLoginLocal._id],
      messages: []
    };
    dispatch(createMessenger(item));
    history.push(`/messenger/${userLoginLocal._id}`);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Container maxWidth="lg" className="mt-14 mb-10 flex ">
          <Grid item xs={12} className="flex">
            <Box className="flex w-full">
              <Avatar
                alt={userDetail.name}
                src="Thanglongedu"
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: `#${randomColor}`
                }}
                className="mr-8"
              />
              <Box className="w-full">
                <Box className="flex items-center justify-between">
                  <Box className="flex items-center">
                    <h1 className="text-3xl mr-1">{userDetail.name}</h1>
                    <Button
                      onClick={() => {
                        handleClickMessage(userDetail._id, userDetail.name);
                      }}
                    >
                      <MessageIcon />
                    </Button>
                  </Box>
                  {isFollow === false ? (
                    <>
                      {userLoginLocal._id !== idUser && (
                        <Button
                          variant="outlined"
                          className="h-6 flex items-center w-28"
                          onClick={handleFollowUser}
                        >
                          <AddRoundedIcon fontSize="small" />
                          <Box className="px-1">Follow</Box>
                        </Button>
                      )}
                    </>
                  ) : (
                    <>
                      {userLoginLocal._id !== idUser && (
                        <Button
                          variant="outlined"
                          className="h-6 flex items-center w-32"
                          onClick={handleUnfollowUser}
                        >
                          <CheckRoundedIcon fontSize="small" />
                          <Box className="px-2">Following</Box>
                        </Button>
                      )}
                    </>
                  )}
                </Box>

                <h2>Email: {userDetail.email}</h2>
                <h3>Major: {userDetail.major}</h3>
              </Box>
            </Box>
          </Grid>
        </Container>
        <Grid xs={12} className="flex  border-t-2 shadow-md">
          <Container maxWidth="lg">
            <Grid xs={9} className="flex items-center my-3">
              <Box className="mx-5 cursor-pointer hover:text-blue-500 transition-all transform hover:-translate-y-1">
                <Link to={`/user/${idUser}/post`}>Post</Link>
              </Box>
              <Box className="mx-5 cursor-pointer hover:text-blue-500 transition-all transform hover:-translate-y-1">
                <Link to={`/user/${idUser}/share`}>Share</Link>
              </Box>
              <Box className="mx-5 cursor-pointer hover:text-blue-500 transition-all transform hover:-translate-y-1">
                <Link to={`/user/${idUser}/question`}>Question</Link>
              </Box>
              {userLogin._id === idUser && (
                <>
                  <Box className="mx-5 cursor-pointer hover:text-blue-500 transition-all transform hover:-translate-y-1">
                    <Link to={`/user/${idUser}/bookmark`}>Bookmark</Link>
                  </Box>
                  <Box className="mx-5 cursor-pointer hover:text-blue-500 transition-all transform hover:-translate-y-1">
                    <Link to={`/user/${idUser}/user-information`}>
                      Your Details
                    </Link>
                  </Box>
                  <Box className="mx-5 cursor-pointer hover:text-blue-500 transition-all transform hover:-translate-y-1">
                    <Link to={`/user/${idUser}/following`}>Following</Link>
                  </Box>
                </>
              )}
            </Grid>
          </Container>
        </Grid>
      </Grid>
      <Grid className="mt-10" spacing={4}>
        <Container maxWidth="lg" className="flex">
          <Box className="flex">
            <Grid xs={9}>
              <Switch>
                {renderRoutesUserDetail(appRoutesUserInformation)}
              </Switch>
            </Grid>
            <Grid xs={3} className="">
              <Paper elevation={1}>
                <Box className="py-7 px-5">
                  <ul>
                    <li className="flex justify-between mb-2">
                      <p className="opacity-70">Post views</p>
                      <p className="text-base font-bold">10</p>
                    </li>
                    <li className="flex justify-between mb-2">
                      <p className="opacity-70">Posts</p>
                      <p className="text-base font-bold">{posts.length}</p>
                    </li>
                    <li className="flex justify-between mb-2">
                      <p className="opacity-70">Questions</p>
                      <p className="text-base font-bold">
                        {postfilterQuestion.length}
                      </p>
                    </li>
                    <li className="flex justify-between mb-2">
                      <p className="opacity-70">Share</p>
                      <p className="text-base font-bold">
                        {postfilterShare.length}
                      </p>
                    </li>
                    <li className="flex justify-between mb-2">
                      <p className="opacity-70">Answer</p>
                      <p className="text-base font-bold">{replies.length}</p>
                    </li>
                    {/* {userLogin._id === idUser && (
                      <li className="flex justify-between mb-2">
                        <p className="opacity-70">Bookmark</p>
                        <p className="text-base font-bold">
                          {userDetail.bookmark.length}
                        </p>
                      </li>
                    )} */}
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
