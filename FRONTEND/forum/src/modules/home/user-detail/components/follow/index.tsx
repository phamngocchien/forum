import { Avatar, Box, Button } from "@mui/material";
import { randomColor } from "components/randomColor";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "store";
import { getUserFollow } from "store/user/action";
import IUser from "types/user";

export interface IUserFollowProps {}

export default function UserFollow(props: IUserFollowProps) {
  const dispatch = useDispatch();
  const history = useHistory();
  const userLoginLocal = JSON.parse(localStorage.getItem("userLogin") || "");
  const { userFollow } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(getUserFollow(userLoginLocal._id));
  }, []);

  const handleClick = (idUser: string | undefined) => {
    history.push(`/user/${idUser}/post`);
  };
  return (
    <>
      {userFollow.length === 0 ? (
        <Box className="flex justify-center text-xl">Nothing here!!!</Box>
      ) : (
        <>
          {userFollow.map((item: IUser) => (
            <Box key={item._id} className="flex justify-between mr-6">
              <Box className="flex mb-3">
                <Avatar
                  alt={item.name}
                  src="Thanglongedu"
                  sx={{
                    width: 50,
                    height: 50,
                    bgcolor: `#${randomColor}`
                  }}
                  className="mr-5"
                />
                <Box>
                  <Box className="flex items-center">
                    <h1 className="text-xl mr-5">{item.name}</h1>
                  </Box>

                  <h2>Email: {item.email}</h2>
                  <h3>Major: {item.major}</h3>
                </Box>
              </Box>

              <Button
                variant="outlined"
                className="h-6 flex items-center w-32"
                onClick={() => handleClick(item._id)}
              >
                <Box className="px-2">Profile</Box>
              </Button>
            </Box>
          ))}
        </>
      )}
    </>
  );
}
