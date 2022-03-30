import { useState } from "react";
import { Box, Card, CardContent, CardHeader, Grid, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import states from "../../_mocks_/state";

export const ProfileDetail = props => {
  const [values, setValues] = useState({
    firstName: "Tester",
    lastName: "AE",
    email: "tester@ae.com",
    phone: "",
    state: "British Columbia",
    country: "Canada",
    password: "",
    confirm: ""
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <CardContent>
          <Grid container spacing={5}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
                onChange={handleChange}
                required
                size={"small"}
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the last name"
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                size={"small"}
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                disabled
                size={"small"}
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                size={"small"}
                value={values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Country"
                name="country"
                onChange={handleChange}
                disabled
                size={"small"}
                value={values.country}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Select State"
                name="state"
                onChange={handleChange}
                required
                size={"small"}
                select
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined"
              >
                {states.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: 3,
            paddingBottom: 2
          }}
        >
          <LoadingButton variant="contained">Save details</LoadingButton>
        </Box>
      </Card>
    </form>
  );
};
