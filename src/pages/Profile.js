import { capitalCase } from "change-case";
import { Container, Tab, Box, Tabs, Stack, Typography } from "@mui/material";
import Page from "../components/Page";
import Iconify from "../components/Iconify";
import useTabs from "../hooks/useTabs";
import { ProfileDetail } from "../components/account/ProfileDetail";
import AccountChangePassword from "../components/account/AccountChangePassword";
import Grid from "@mui/material/Grid";
import React from "react";

export default function UserAccount() {
  const { currentTab, onChangeTab } = useTabs("general");

  const ACCOUNT_TABS = [
    {
      value: "general",
      icon: <Iconify icon={"ic:round-account-box"} width={20} height={20} />,
      component: <ProfileDetail />
    },
    {
      value: "change_password",
      icon: <Iconify icon={"ic:round-vpn-key"} width={20} height={20} />,
      component: <AccountChangePassword />
    }
  ];

  return (
    <Page title="Profile">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Profile
          </Typography>
        </Stack>
        <Grid item lg={8} md={6} xs={12}>
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={currentTab}
            onChange={onChangeTab}
          >
            {ACCOUNT_TABS.map(tab => (
              <Tab
                disableRipple
                key={tab.value}
                label={capitalCase(tab.value)}
                icon={tab.icon}
                value={tab.value}
              />
            ))}
          </Tabs>

          <Box sx={{ mb: 5 }} />

          {ACCOUNT_TABS.map(tab => {
            const isMatched = tab.value === currentTab;
            return isMatched && <Box key={tab.value}>{tab.component}</Box>;
          })}
        </Grid>
      </Container>
    </Page>
  );
}
