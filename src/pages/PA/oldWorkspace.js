import {
  Box,
  Container,
  styled,
  Typography,
  Grid,
  Card,
  CardContent
} from "@mui/material";

import Page from "../../components/Page";

import { Link as RouterLink } from "react-router-dom";

const CardStyle = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  height: "224px",
  position: "relative",
  color: theme.palette.primary.contrastText,
  padding: "5px 0 0 5px",
  boxShadow: "0 0 2px 1px #826AF9"
}));

const TypographyStyle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.contrastText
}));

const NewCardTypographyStyle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main
}));

const Subheader = styled(Typography)(({ theme }) => ({
  position: "absolute",
  bottom: "25px",
  right: "30px",
  color: theme.palette.primary.contrastText
}));

const NewCardStyle = styled(Card)(({ theme }) => ({
  backgroundColor: "none",
  height: "224px",
  borderStyle: "dotted",
  borderColor: theme.palette.primary.main,
  boxShadow: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}));

export default function PAWorkspace() {
  // TODO: the data below is mock data, the real one should be fetched from backend API
  const workSpaces = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
  return (
    <Page title="PA Dashboard">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Workspace</Typography>
        </Box>
        <Box textAlign="center">
          <Grid container spacing={4}>
            {workSpaces.map(workspace => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  key={workspace.id}
                  component={RouterLink}
                  to={`/PA/workspace/${workspace.id}`}
                >
                  <CardStyle>
                    <CardContent>
                      <TypographyStyle variant="h6" align="left">
                        WorkSpace {workspace.id}
                      </TypographyStyle>
                      <Subheader>{`Proposal #: ${workspace.id}`}</Subheader>
                    </CardContent>
                  </CardStyle>
                </Grid>
              );
            })}
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              component={RouterLink}
              to="/PA/workspace/add"
            >
              <NewCardStyle>
                <CardContent>
                  <NewCardTypographyStyle variant="h6" align="left">
                    + New WorkSpace
                  </NewCardTypographyStyle>
                </CardContent>
              </NewCardStyle>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Page>
  );
}
