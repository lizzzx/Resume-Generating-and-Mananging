import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Card, Grid, Stack, TextField, Typography } from "@mui/material";
import "easymde/dist/easymde.min.css";
import React from "react";
import Button from "@mui/material/Button";

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

export default function PAViewSectorOnlyForm({ workspaceId, resumeId }) {
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate(`/pa/workspace/${workspaceId}`);
    console.log(resumeId);
  };

  return (
    <form>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <div>
                <LabelStyle>Sector Name</LabelStyle>
                <TextField
                  name="name"
                  size="small"
                  fullWidth
                  disabled
                  value="Sample Sector"
                />
              </div>
              <div>
                <LabelStyle>Attribute</LabelStyle>
                <TextField
                  name="name"
                  size="small"
                  fullWidth
                  disabled
                  value="Target Employee"
                />
              </div>
              <div>
                <LabelStyle>Attribute</LabelStyle>
                <TextField
                  name="name"
                  size="small"
                  fullWidth
                  disabled
                  value="Target Employee"
                />
              </div>
              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                sx={{
                  "& > :not(style)": { marginLeft: 2 }
                }}
              >
                <Button variant="contained" onClick={() => onSubmit()} color="error">
                  Back
                </Button>
                <Button variant="contained" onClick={() => onSubmit()}>
                  Save
                </Button>
              </Grid>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </form>
  );
}
