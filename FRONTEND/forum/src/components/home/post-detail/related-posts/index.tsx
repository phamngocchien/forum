import Box from "@mui/material/Box";
import "./related-posts.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import moment from "moment";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { useEffect } from "react";
import { getPostByTags } from "store/post/action";

export default function RelatedPosts() {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const posts = useSelector((state: RootState) => state.post.posts);

  useEffect(() => {
    if (id) {
      dispatch(getPostByTags(id));
    }
  }, [id]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1165,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }
    ]
  };
  const dateNow = new Date().getDate();

  return (
    <Box>
      {posts.length !== 0 && (
        <>
          <Box className="font-bold text-xl mb-2">Related Posts</Box>
          {posts.length <= 4 ? (
            <Box className="flex items-center">
              {posts.map((item: any) => (
                <Box key={item._id} className="mx-2">
                  <div className="card">
                    <Box
                      className="mb-2 wrapper-content cursor-pointer"
                      onClick={() => history.push(`/post-detail/${item._id}`)}
                    >
                      {item.title}
                    </Box>
                    <Box
                      className="text-sm text-blue-400 hover:underline cursor-pointer transition"
                      onClick={() =>
                        history.push(`/user/${item.user._id}/post`)
                      }
                    >
                      {item.user.name}
                    </Box>
                    <Box className="text-xs my-1 text-gray-500">
                      {new Date(item.createdAt).getDate() === dateNow
                        ? moment(item.createdAt).startOf("second").fromNow()
                        : moment(item.createdAt).format("MMMM Do YYYY, h:mm a")}
                    </Box>
                    <Box className="flex items-center text-gray-400">
                      <Box className="text-xs mr-2 flex items-center">
                        <RemoveRedEyeOutlinedIcon
                          className="mr-1"
                          fontSize="small"
                        />
                        {item.view.length}
                      </Box>
                      <Box className="text-xs mr-2 flex items-center">
                        <ThumbUpAltIcon className="mr-1" fontSize="small" />
                        {item.vote.length !== 0 ? (
                          <>
                            {item.vote.reduce(
                              (a: any, b: any) => a + b.score,
                              0
                            )}
                          </>
                        ) : (
                          "0"
                        )}
                      </Box>
                    </Box>
                  </div>
                </Box>
              ))}
            </Box>
          ) : (
            <>
              <Slider {...settings}>
                {posts.map((item: any) => (
                  <Box key={item._id}>
                    <div className="card">
                      <Box
                        className="mb-2 wrapper-content cursor-pointer"
                        onClick={() => history.push(`/post-detail/${item._id}`)}
                      >
                        {item.title}
                      </Box>
                      <Box
                        className="text-sm text-blue-400 hover:underline cursor-pointer transition"
                        onClick={() =>
                          history.push(`/user/${item.user._id}/post`)
                        }
                      >
                        {item.user.name}
                      </Box>
                      <Box className="text-xs my-1 text-gray-500">
                        {new Date(item.createdAt).getDate() === dateNow
                          ? moment(item.createdAt).startOf("second").fromNow()
                          : moment(item.createdAt).format(
                              "MMMM Do YYYY, h:mm a"
                            )}
                      </Box>
                      <Box className="flex items-center text-gray-400">
                        <Box className="text-xs mr-2 flex items-center">
                          <RemoveRedEyeOutlinedIcon
                            className="mr-1"
                            fontSize="small"
                          />
                          {item.view.length}
                        </Box>
                        <Box className="text-xs mr-2 flex items-center">
                          <ThumbUpAltIcon className="mr-1" fontSize="small" />
                          {item.vote.length !== 0 ? (
                            <>
                              {item.vote.reduce(
                                (a: any, b: any) => a + b.score,
                                0
                              )}
                            </>
                          ) : (
                            "0"
                          )}
                        </Box>
                      </Box>
                    </div>
                  </Box>
                ))}
              </Slider>
            </>
          )}
        </>
      )}
    </Box>
  );
}
