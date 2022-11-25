import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

const AppNavBar = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
            <Button color="inherit">Home</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AppNavBar;
