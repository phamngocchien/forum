import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Footer() {
  return (
    <div>
      <AppBar position="static" className="mt-40 relative bottom-0">
        <Toolbar className="flex justify-center">
          <Typography color="inherit">Developed By A31946</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
