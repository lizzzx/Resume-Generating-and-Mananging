import {
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  styled,
  Grid,
  Card,
  CardContent,
  Autocomplete,
  Stack
} from "@mui/material";
import React, { useState } from "react";
import Page from "../components/Page";
import { useNavigate } from "react-router-dom";

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

const ResetButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2, 1),
  background: theme.palette.error.main,
  "&:hover": {
    backgroundColor: theme.palette.primary.main
  }
}));

const ComboBox = styled(Autocomplete)(({ theme }) => ({
  margin: theme.spacing(1, 0)
}));

const DescriptionStyle = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(4, 0)
}));

export default function EducationPage(props) {
  const [school, setSchool] = useState("");
  const [degree, setDegree] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [endYear, setEndYear] = useState("");
  const [description, setDescription] = useState("");
  // const getIcon = name => <Iconify icon={name} width={22} height={22} />;

  function onSubmit(e) {
    e.preventDefault();
    if (!school.trim()) {
      return;
    }
    let path = `../resume`;
    navigate(path, {
      state: {
        school: school,
        degree: degree,
        startMonth: startMonth,
        endMonth: endMonth,
        startYear: startYear,
        endYear: endYear,
        description: description
      }
    });
  }

  const sectorType = "Education Experience";

  const attributes = [
    { id: 0, name: "School", value: "School Name" },
    { id: 1, name: "Degree", value: "Degree/Major" },
    { id: 2, name: "Start Month", value: "" },
    { id: 3, name: "Start Year", value: "" },
    { id: 4, name: "End Month", value: "" },
    { id: 5, name: "End Year", value: "" },
    {
      id: 6,
      name: "Description",
      value: "Here is a description of my education experience."
    }
  ];
  const path = `../resume`;
  const navigate = useNavigate();
  const routeChangeCancel = () => {
    navigate(path);
  };

  function handleChange(e) {
    switch (e.target.name) {
      case "School":
        setSchool(e.target.value);
        break;
      case "Degree":
        setDegree(e.target.value || "N/A");
        break;
      case "StartMonth":
        setStartMonth(e.target.value || "N/A");
        break;
      case "StartYear":
        setStartYear(e.target.value || "N/A");
        break;
      case "EndMonth":
        setEndMonth(e.target.value || "N/A");
        break;
      case "EndYear":
        setEndYear(e.target.value || "N/A");
        break;
      case "Description":
        setDescription(e.target.value || "N/A");
        break;
    }
  }

  function StartEndTime() {
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
                name="StartMonth"
                options={months}
                renderInput={params => (
                  <TextField {...params} size="small" label="Month" />
                )}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <ComboBox
                disablePortal
                id="3"
                name="StartYear"
                onChange={handleChange}
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
                onChange={handleChange}
                id="4"
                name="EndMonth"
                margin="normal"
                options={months}
                renderInput={params => (
                  <TextField {...params} size="small" label="Month" />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <ComboBox
                onChange={handleChange}
                disablePortal
                id="5"
                name="EndYear"
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

  return (
    <Page title="Profile">
      <Container component="main">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Sector
          </Typography>
        </Stack>
        <CssBaseline />
        <FormContainer onSubmit={onSubmit} on>
          <Grid container>
            <Grid item xs={12} lg={10}>
              <Grid container direction="column">
                <Card>
                  <CardContent>
                    <Grid item xs={12}>
                      <SectorType variant="h4" sx={{ mb: 3 }}>
                        {"Add " + sectorType}
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
                          onChange={handleChange}
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
                        <ResetButton
                          onClick={routeChangeCancel}
                          type="cancel"
                          variant="contained"
                        >
                          Cancel
                        </ResetButton>
                        <SubmitButton
                          onClick={onSubmit}
                          type="submit"
                          variant="contained"
                        >
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

  function NormalAttribute({ attribute }) {
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
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    );
  }
}
