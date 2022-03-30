import {
  Container,
  TextField,
  Grid,
  Button,
  styled,
  Card,
  Stack
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../../components/Page";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";

const InputLabel = styled("label")(() => ({}));

export default function WorkSpaceAddPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const onCancelHandler = () => {
    navigate("/PA/workspace", { replace: true });
  };

  const onCreateHandler = () => {
    navigate("/PA/workspace", { replace: true });
  };
  return (
    <Page title="PA Add WorkSpace">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="Workspace Properties"
          links={[{ name: "PA", href: "/pa" }, { name: "Add Workspace" }]}
        />
        <form>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <InputLabel htmlFor="input-workplace-name">
                    Workspace name:
                  </InputLabel>
                  <TextField
                    id="input-workplace-name"
                    value={name}
                    fullWidth
                    size="small"
                    onChange={e => setName(e.target.value)}
                  />
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                    sx={{
                      "& > :not(style)": { marginLeft: 2 }
                    }}
                  >
                    <Button
                      variant="contained"
                      color="error"
                      onClick={onCancelHandler}
                    >
                      Cancel
                    </Button>
                    <Button variant="contained" onClick={onCreateHandler}>
                      Create
                    </Button>
                  </Grid>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Page>
  );
}
