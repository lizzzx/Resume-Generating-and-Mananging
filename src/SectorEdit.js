import {
  Button,
  Container,
  TextField,
  Typography,
  styled,
  Grid,
  Card,
  CardContent,
  Autocomplete
} from "@mui/material";
import React from "react";
import useAlert from "../hooks/useAlert";
import Page from "../components/Page";
import { useNavigate, useParams } from "react-router-dom";
import sectors from "../_mocks_/sector";
import HeaderBreadcrumbs from "../components/HeaderBreadcrumbs";
import { PATH_EE } from "../paths";
import { capitalCase } from "change-case";

const FormContainer = styled("div")(({ theme }) => ({
  marginLeft: theme.spacing(0)
}));

const SectorType = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2, 1),
  background: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: theme.palette.error.main
  }
}));

const ComboBox = styled(Autocomplete)(({ theme }) => ({
  margin: theme.spacing(1, 0)
}));

const DescriptionStyle = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(4, 0)
}));

export default function SectorEdit() {
  const { sectorID } = useParams();
  const navigate = useNavigate();

  const sector = sectors.find(sector => sector.sectorID === sectorID);
  const sectorType = capitalCase(sector.sectorTypeName);
  const alert = useAlert();

  const onSubmit = () => {
    navigate(PATH_EE.workspace.list);

    // TODO: this is the temporary solution for midterm progress only.
    alert.switchToFailure("Authentication Failed.");
  };

  const attributes = [
    { id: 0, name: "Company Name", value: "Company Name" },
    { id: 1, name: "Position", value: "Position Title" },
    { id: 2, name: "Start Month", value: "" },
    { id: 3, name: "Start Year", value: "" },
    { id: 4, name: "End Month", value: "" },
    { id: 5, name: "End Year", value: "" },
    {
      id: 6,
      name: "Description",
      value: "Here is a description of my past work experience."
    }
  ];

  return (
    <Page title="Workspace Sector: Edit">
      <Container maxWidth={"lg"}>
        <HeaderBreadcrumbs
          heading="Sector Details"
          links={[
            { name: "Workspace", href: PATH_EE.workspace.list },
            { name: sector?.sectorName || "" }
          ]}
        />
        <FormContainer onSubmit={onSubmit}>
          <Grid container>
            <Grid item xs={12} lg={10}>
              <Grid container direction="column">
                <Card>
                  <CardContent>
                    <Grid item xs={12}>
                      <SectorType variant="h4" sx={{ mb: 3 }}>
                        {"Edit " + sectorType}
                      </SectorType>
                    </Grid>
                    {attributes.map(attribute => {
                      if (
                        attribute.name.split(" ")[1] !== "Month" &&
                        attribute.name.split(" ")[1] !== "Year" &&
                        attribute.name !== "Description"
                      )
                        return NormalAttribute({ attribute });
                    })}
                    {StartEndTime()}
                    <Grid item xs={12} container alignItems="center" sx={{ mt: 3 }}>
                      <Grid item xs={12}>
                        <Typography height="5px">Description</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <DescriptionStyle
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          multiline
                          id="6"
                          name="Description"
                          placeholder={attributes[6].value}
                          autoFocus
                          rows={8}
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={12} container>
                      <Grid item xs={4} />
                      <Grid
                        item
                        xs={8}
                        spacing={1}
                        container
                        justifyContent="flex-end"
                      >
                        <SubmitButton type="submit" variant="contained">
                          Submit
                        </SubmitButton>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid item xs={0} lg={2} />
          </Grid>
        </FormContainer>
      </Container>
    </Page>
  );
}

export function NormalAttribute({ attribute }) {
  return (
    <Grid
      item
      key={attribute.id.toString()}
      xs={12}
      container
      alignItems="center"
      sx={{ mb: 2 }}
    >
      <Grid item xs={12} justifyContent="center">
        <Typography height="15px">{attribute.name}</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id={attribute.id.toString()}
          name={attribute.name}
          placeholder={attribute.value}
          autoFocus
          size="small"
        />
      </Grid>
    </Grid>
  );
}

export function StartEndTime() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const years = [];

  for (let i = 0; i < 15; i++) {
    years.push((2022 - i).toString());
  }

  return (
    <Grid item container>
      <Grid item xs={12} container alignItems="center" sx={{ mb: 2 }}>
        <Grid item xs={12}>
          <Typography>Start Date</Typography>
        </Grid>
        <Grid item xs={12} container spacing={1}>
          <Grid item xs={6}>
            <ComboBox
              disablePortal
              id="2"
              options={months}
              renderInput={params => (
                <TextField {...params} size="small" label="Month" />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <ComboBox
              disablePortal
              id="3"
              options={years}
              renderInput={params => (
                <TextField {...params} size="small" label="Year" />
              )}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} container alignItems="center" sx={{ mb: 2 }}>
        <Grid item xs={12}>
          <Typography>End Date</Typography>
        </Grid>
        <Grid item xs={12} container spacing={1}>
          <Grid item xs={6}>
            <ComboBox
              disablePortal
              id="4"
              margin="normal"
              options={months}
              renderInput={params => (
                <TextField {...params} size="small" label="Month" />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <ComboBox
              disablePortal
              id="5"
              options={years}
              renderInput={params => (
                <TextField {...params} size="small" label="Year" />
              )}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}