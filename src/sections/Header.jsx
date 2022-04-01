import React from "react";
import { Link,useHistory } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { UserContext } from "../hooks/UserContext";
import useLogout from "../hooks/useLogout";

export default function Header() {
  const history = useHistory();
  const { user } = React.useContext(UserContext);
  const { logoutUser } = useLogout();
  const runCode = () => {
    history.push("/code");
  };

  const [userDropdownOpen, setUserDropdownOpen] = React.useState(false);
  const userOpen = Boolean(userDropdownOpen);

  const [addDropdownOpen, setAddDropdownOpen] = React.useState(false);
  const addOpen = Boolean(addDropdownOpen);

  const handleUserDropdownClick = (event) => {
    setUserDropdownOpen(event.currentTarget);
  };
  const handleUserDropdownCloseClick = () => {
    setUserDropdownOpen(null);
  };

  const handleAddDropdownClick = (event) => {
    setAddDropdownOpen(event.currentTarget);
  };
  const handleAddDropdownCloseClick = () => {
    setAddDropdownOpen(null);
  };

  if (!user) {
    return (
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            <Link to="/">
              <Button size="small">NotifyMe</Button>
            </Link>
          </Typography>
          <Link to="/login">
            <Button variant="outlined" sx={{ my: 1, mx: 1.5 }}>
              Sign in
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="outlined" sx={{ my: 1, mx: 1.5 }}>
              Sign up
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    );
  } else {
    return (
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            <Link to="/">
              <Button size="small">NotifyMe</Button>
            </Link>
          </Typography>
          <div>
            <IconButton
              onClick={handleAddDropdownClick}
              aria-controls={addOpen ? "add-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={addOpen ? "true" : undefined}
            >
              <AddIcon />
            </IconButton>
            <Menu
              id="add-menu"
              anchorEl={addDropdownOpen}
              open={addOpen}
              onClose={handleAddDropdownCloseClick}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              MenuListProps={{
                "aria-labelledby": "add-button",
              }}
            >
              <MenuItem onClick={handleUserDropdownCloseClick}>
                Create a new Course
              </MenuItem>
              <MenuItem onClick={runCode}>Run Code</MenuItem>
            </Menu>

            <IconButton
              onClick={handleUserDropdownClick}
              aria-controls={userOpen ? "user-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={userOpen ? "true" : undefined}
            >
              <Avatar
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "primary.main",
                  },
                }}
              >
                {user.username.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
            <Menu
              id="user-menu"
              anchorEl={userDropdownOpen}
              open={userOpen}
              onClose={handleUserDropdownCloseClick}
              MenuListProps={{
                "aria-labelledby": "user-button",
              }}
            >
              <MenuItem onClick={handleUserDropdownCloseClick}>
                Profile
              </MenuItem>
              <MenuItem onClick={logoutUser}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}
