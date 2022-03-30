import {
  Box,
  Container,
  styled,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Button
} from "@mui/material";

import Page from "../../components/Page";

import { Link as RouterLink, useParams } from "react-router-dom";
import { toFormattedString } from "../../utils/dateFormatter";

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

export default function PAWorkspaceDetail() {
  const { workspaceId } = useParams();
  // TODO: get Proposal number and latest updated time.
  const resumes = [
    { id: 0, employee: "A", uploaded: new Date() },
    { id: 1, employee: "B", uploaded: new Date() },
    { id: 2, employee: "C", uploaded: new Date() }
  ];
  return (
    <Page title="PA WorkSpace Detail">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Workspace {workspaceId}</Typography>
          <Typography variant="body1">Proposal No. {workspaceId}</Typography>
          <Typography variant="body1">Updated Time {workspaceId}</Typography>
        </Box>
        <Box textAlign="center">
          <Grid container spacing={4}>
            {resumes.map(resume => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  key={resume.id}
                  component={RouterLink}
                  to=""
                >
                  <CardStyle>
                    <CardHeader title={`Resume ${resume.id}`} align="left" />
                    <CardContent>
                      <TypographyStyle variant="body1" align="left">
                        {`Employee: ${resume.employee}`}
                      </TypographyStyle>
                    </CardContent>
                    <Subheader>{toFormattedString(resume.uploaded)}</Subheader>
                  </CardStyle>
                </Grid>
              );
            })}
            <Grid item xs={12} sm={6} md={3} component={RouterLink} to="/PA/resume">
              <NewCardStyle>
                <CardContent>
                  <NewCardTypographyStyle variant="h6" align="left">
                    + New Resume
                  </NewCardTypographyStyle>
                </CardContent>
              </NewCardStyle>
            </Grid>
          </Grid>
        </Box>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="end"
          sx={{ marginTop: 5 }}
        >
          <Button variant="contained" sx={{ marginLeft: 2 }} color="error">
            Delete
          </Button>
          <Button variant="contained" sx={{ marginLeft: 2 }}>
            Save
          </Button>
          <Button variant="contained" sx={{ marginLeft: 2 }} color="info">
            Export
          </Button>
        </Grid>
      </Container>
    </Page>
  );
}
