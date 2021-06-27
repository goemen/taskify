import * as React from "react";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import HomeIcon from "@material-ui/icons/Home";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";

export const NavBar = () => {
  const history = useHistory();

  const goHome = () => history.push("/");

  return (
    <React.Fragment>
      <AppBar position="fixed" color="transparent" elevation={0.0}>
        <Toolbar>
          <IconButton aria-label="home" onClick={goHome}>
            <HomeIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
};
