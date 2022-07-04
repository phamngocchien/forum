import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <>
      <Link to="/">
        <Typography variant="h6" noWrap component="div">
          TLU
        </Typography>
      </Link>
    </>
  );
}
