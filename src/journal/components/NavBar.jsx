import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  Toolbar,
  Typography,
} from "@mui/material";
import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import { startLogout } from "../../store/auth";
import { SideBarItem } from "./SideBarItem";

export const NavBar = ({ drawerWidth = 240 }) => {

  const [searchTerm, setSearchTerm] = useState("")


  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(startLogout());
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { notes } = useSelector((state) => state.journal);

  let filterEmptyNotes = notes.filter((note) => note.body.length > 0);
  const notesCount = filterEmptyNotes.length;

  function SortArray(a, b) {
    return a.title.localeCompare(b.title);
  }

  const sortedNotes = filterEmptyNotes.sort(SortArray);


  return (
    <React.Fragment>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: "0px 0px 1px 0px black",
        }}
      >
        <Toolbar>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <IconButton
              sx={{ color: "#E9A6A6" }}
              onClick={() => setIsDrawerOpen(true)}
            >
              <MenuOutlined />
            </IconButton>
            <Typography variant="h6" noWrap component="div" color="#E9A6A6">
              Banco de palabras
            </Typography>
            <IconButton color="error" onClick={onLogout}>
              <LogoutOutlined />
            </IconButton>
          </Grid>
        </Toolbar>
      </AppBar>
      <Box component="nav" height="100vh">
        <Drawer
          variant="temporary"
          open={isDrawerOpen}
          sx={{
            display: { xs: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "content-box",
              width: drawerWidth,
              backgroundColor: "#3F3351",
            },
          
          }}
          onClose={() => setIsDrawerOpen(false)}
        >
          <Toolbar
            sx={{
              backgroundColor: "primary.main",
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                color: "#E9A6A6",
              }}
            >
              {notesCount} palabras.
            </Typography>
          </Toolbar>
          <Divider />

          <List
            onClick={() => setIsDrawerOpen(false)}
            sx={{
              backgroundColor: "primary.main",
            }}
          >
            {sortedNotes.map((note) => (
              <SideBarItem key={note.id} {...note} />
            ))}
          </List>
        </Drawer>
      </Box>
    </React.Fragment>
  );
};
