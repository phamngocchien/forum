import { Button, Card } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import Search from "components/admin/search";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { getTags, searchTags } from "store/tag/action";
import AddIcon from "@mui/icons-material/Add";
import TagList from "./list";
import FormTag from "./form";

export default function Tag() {
  const dispatch = useDispatch();
  const tags = useSelector((state: RootState) => state.tag.tags);
  const [openTag, setOpenTag] = React.useState(false);

  const handleClickOpenTag = () => {
    setOpenTag(true);
  };

  const handleCloseTag = () => {
    setOpenTag(false);
  };
  const handleValueSearch = (e: string) => {
    const item = {
      name: e
    };
    dispatch(searchTags(item));
  };

  useEffect(() => {
    dispatch(getTags());
  }, []);

  const sortData = tags.sort(
    (a: any, b: any) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <Box className="">
      <Card className="flex items-center justify-between px-5 mb-5">
        <Box className="font-bold">TAG</Box>
        <Box className="flex items-center">
          <Search onSubmitForm={handleValueSearch} />
        </Box>
        <Button
          className="h-8 w-12"
          type="submit"
          variant="outlined"
          onClick={handleClickOpenTag}
        >
          <AddIcon fontSize="large" />
        </Button>
      </Card>
      <Box>
        <TagList data={sortData} />
      </Box>
      <FormTag mode={"create"} isOpen={openTag} onClose={handleCloseTag} />
    </Box>
  );
}
