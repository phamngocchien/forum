import { Box, Card, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Search from "components/admin/search";
import { getDocumentTypes, searchDocType } from "store/document-type/action";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { useEffect, useState } from "react";
import DocmentTypeList from "./list";
import FormDocumentType from "./form";

export default function DocumentType() {
  const dispatch = useDispatch();
  const documenttypes = useSelector(
    (state: RootState) => state.documenttype.documenttypes
  );
  useEffect(() => {
    dispatch(getDocumentTypes());
  }, []);
  const handleValueSearch = (e: string) => {
    const item = {
      name: e
    };
    dispatch(searchDocType(item));
  };

  const [openFrom, setOpenForm] = useState(false);

  const handleClickOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };
  return (
    <>
      <Card className="flex items-center justify-between px-5 mb-5">
        <Box className="font-bold">DOCUMENT TYPE</Box>
        <Box className="flex items-center">
          <Search onSubmitForm={handleValueSearch} />
        </Box>
        <Button
          className="h-8 w-12"
          type="submit"
          variant="outlined"
          onClick={handleClickOpenForm}
        >
          <AddIcon fontSize="large" />
        </Button>
      </Card>
      <Box>
        <DocmentTypeList data={documenttypes} />
      </Box>
      <FormDocumentType
        mode={"create"}
        isOpen={openFrom}
        onClose={handleCloseForm}
      />
    </>
  );
}
