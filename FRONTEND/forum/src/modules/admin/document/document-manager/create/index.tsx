import { Box, Button, Card, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { PATH_ADMIN_DOCUMENT } from "routes/routes.paths";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { useDispatch, useSelector } from "react-redux";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { RootState } from "store";
import { getDocumentTypes } from "store/document-type/action";
import { createFile } from "store/file/action";

export default function Create() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [pdfFile, setPdfFile] = useState(null);
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState<string | number>("");
  const [open, setOpen] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch();
  const { documenttypes, loading } = useSelector(
    (state: RootState) => state.documenttype
  );
  useEffect(() => {
    dispatch(getDocumentTypes());
  }, []);
  const handleChange = (event: SelectChangeEvent<typeof category>) => {
    setCategory(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const fileType = ["application/pdf"];

  const handlePdfFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (fileType.includes(selectedFile.type)) {
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (a: any) => {
          setPdfFile(a.target.result);
        };
      } else {
        setPdfFile(null);
      }
    }
    setFile(selectedFile);
    setIsValid(false);
  };

  const handleUpload = () => {
    if (category === "" || file === null) {
      setIsValid(true);
    } else {
      const data = new FormData();
      data.append("file", file);
      dispatch(createFile(String(category), data));
      if (loading === false) {
        setIsSuccess(true);
      }
    }
  };
  return (
    <>
      <Card className="px-5 mb-5 flex items-center justify-between">
        <Link to={PATH_ADMIN_DOCUMENT}>
          <Button className="h-10">
            <ArrowBackIcon />
          </Button>
        </Link>
        <Box className="font-bold py-8 mr-10">ADD DOCUMENT</Box>
      </Card>
      <Box className="flex">
        <Box>
          <Box>
            <input
              type="file"
              className="form-control"
              required
              onChange={handlePdfFileChange}
            />
          </Box>
          <FormControl sx={{ width: "300px", marginTop: "20px" }}>
            <InputLabel id="demo-controlled-open-select-label">
              Category
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={category}
              label="Category"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {documenttypes.map((item: any) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box className="mt-4">
            <Button variant="contained" onClick={handleUpload}>
              UPLOAD
            </Button>
          </Box>
          {isValid && (
            <Box className="text-md italic text-red-400 text-left mt-1">
              Please enter all fields
            </Box>
          )}
          {isSuccess && (
            <Box className="text-md italic text-green-400 text-left mt-1">
              Add success
            </Box>
          )}
        </Box>
        {pdfFile && (
          <Container maxWidth="lg">
            <h4 className="text-center font-bold my-3">View PDF</h4>
            <Box
              className="h-screen overflow-hidden flex justify-center"
              sx={{ width: "100%" }}
            >
              <>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.js">
                  <Viewer
                    fileUrl={pdfFile}
                    plugins={[defaultLayoutPluginInstance]}
                  />
                </Worker>
              </>
            </Box>
          </Container>
        )}
      </Box>
    </>
  );
}
