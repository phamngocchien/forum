import { useMemo } from "react";
import { useFormik } from "formik";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchProps {
  onSubmitForm: (e: any) => void;
}

export default function Search({ onSubmitForm }: SearchProps) {
  const initialValues = useMemo(
    () => ({
      keyword: ""
    }),
    []
  );
  const handleSubmit = (values: any): void => {
    onSubmitForm(values.keyword);
  };
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl sx={{ m: 2, width: "50ch" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Search</InputLabel>
        <OutlinedInput
          value={formik.values.keyword}
          onChange={formik.handleChange}
          name="keyword"
          id="outlined-adornment-password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                edge="end"
                type="submit"
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
          label="Search"
        />
      </FormControl>
    </form>
  );
}
