import { useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import { alpha } from "@mui/material/styles";
import {
  Button,
  Box,
  Divider,
  MenuItem,
  Typography,
  Avatar,
  IconButton
} from "@mui/material";

import Iconify from "../../components/Iconify";
import MenuPopover from "../../components/MenuPopover";

import account from "../../_mocks_/account";
import useAuth from "../../hooks/useAuth";

const MENU_OPTIONS = {
  "EE": [
    {
      label: "Home",
      icon: "eva:home-fill",
      linkTo: "/ee/request"
    },
    {
      label: "Profile",
      icon: "eva:person-fill",
      linkTo: "/ee/profile"
    }
  ],
  "PA": [
    {
      label: "Home",
      icon: "eva:home-fill",
      linkTo: "/PA/workspace"
    },
    {
      label: "Profile",
      icon: "eva:person-fill",
      linkTo: "/PA/profile"
    }
  ],
  "SA": [
    {
      label: "Home",
      icon: "eva:home-fill",
      linkTo: "/SA/profile"
    },
    {
      label: "Profile",
      icon: "eva:person-fill",
      linkTo: "/SA/profile"
    }
  ]
};

export default function AccountPopover({ userType }) {
  const { logout } = useAuth();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: theme => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      >
        <Avatar src={account[userType].photoURL} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {account[userType].displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {account[userType].email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS[userType].map(option => (
          <MenuItem
            key={option.linkTo}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: "body2", py: 1, px: 2.5 }}
          >
            <Iconify
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button fullWidth color="inherit" variant="outlined" onClick={logout}>
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}