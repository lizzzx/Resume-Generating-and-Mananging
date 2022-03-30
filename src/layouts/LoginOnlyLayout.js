import React from "react";
import { AppBar, Toolbar, Typography, styled } from "@mui/material";

import { Link as RouterLink } from "react-router-dom";
import { Outlet } from "react-router";
import AELogo from "../components/Logo";

const AppBarStyle = styled(AppBar)(({ theme }) => ({
  background: theme.palette.background.default,
  borderBottom: `solid ${theme.palette.primary.lighter} 1px`,
  minHeight: "70px"
}));

const TitleStyle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.dark,
  margin: theme.spacing(0, 3)
}));

export default function LoginOnlyLayout({ title }) {
  return (
    <div>
      <AppBarStyle position="relative" elevation={1}>
        <Toolbar>
          <AELogo />
          <RouterLink to="/login">
            <TitleStyle align="left" variant="h5" aria-label="title">
              {title}
            </TitleStyle>
          </RouterLink>
        </Toolbar>
      </AppBarStyle>
      <Outlet />
    </div>
  );
}
