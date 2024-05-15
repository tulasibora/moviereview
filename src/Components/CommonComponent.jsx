import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import cinema from "../assets/cinema.png";
import camera from "../assets/cinema.png";
import home from "../assets/home.png";
import profile from "../assets/profile-user.png";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleListItemClick } from "../redux/action";
import "../App.css";
const CommonComponent = () => {
  const selectedIndexValue = useSelector((state) => state.selectedIndexValue);
  const navigate = useNavigate();
  const hadleLogout = () => {
    signOut(auth).then((res) => {});
  };

  const dispatch = useDispatch();
  return (
    <div>
      <Box sx={{ flexGrow: 1, marginLeft: "2rem" }}>
        <AppBar className="appBar">
          <Toolbar className="ToolBar">
            <img src={cinema} />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              className="cineElkHead"
            >
              CINEMA ELK
            </Typography>
            <Button
              className="LoginBtn"
              variant="contained"
              onClick={hadleLogout}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Divider />
      <div id="classSidebar">
        <Drawer className="drawer" variant="permanent" anchor="left">
          <List>
            <ListItemButton
              selected={selectedIndexValue === 0}
              onClick={() => {
                dispatch(handleListItemClick(0));
                navigate("/");
              }}
            >
              <ListItem className="LeftBarIcons ">
                <div className="LeftBarIconsDiv ">
                  <img src={home} />
                </div>
              </ListItem>
            </ListItemButton>
            <ListItemButton
              selected={selectedIndexValue === 1}
              onClick={() => {
                dispatch(handleListItemClick(1));
                navigate("/review");
              }}
            >
              <ListItem className="LeftBarIcons">
                <div className="LeftBarIconsDiv">
                  <img src={camera} />
                </div>
              </ListItem>
            </ListItemButton>
            <ListItemButton
              selected={selectedIndexValue === 2}
              onClick={() => {
                dispatch(handleListItemClick(2));
                navigate("/account");
              }}
            >
              <ListItem className="LeftBarIcons">
                <div className="LeftBarIconsDiv">
                  <img src={profile} />
                </div>
              </ListItem>
            </ListItemButton>
          </List>
        </Drawer>
      </div>
    </div>
  );
};

export default CommonComponent;
