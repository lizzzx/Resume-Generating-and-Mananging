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
  Stack,
  FormControl
} from "@mui/material";

import useAlert from "../../hooks/useAlert";
import useEmployee from "../../hooks/useEmployee";

import AlertMessage from "../../components/AlertMessage";
import { useParams, useNavigate } from "react-router-dom";
import Page from "../../components/Page";
import { useState } from "react";
import Iconify from "../../components/Iconify";
// import DeleteIcon from '@mui/icons-material/Delete';

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2, 1),
  background: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: theme.palette.error.main
  }
}));

const CancelButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2, 1),
  background: theme.palette.error.main
}));

const FormContainer = styled("form")(({ theme }) => ({
  marginLeft: theme.spacing(0)
}));

const roles = [
  {
    value: "Employee",
    label: "Employee"
  },
  {
    value: "Project Administrator",
    label: "Project Administrator"
  },
  {
    value: "System Administrator",
    label: "System Administrator"
  }
];

export default function AssignRolePage() {
  const alert = useAlert();
  const navigate = useNavigate();
  const { findEmployee, updateEmployeeRole } = useEmployee();
  let { id } = useParams();
  const Employee = findEmployee(id);
  const [role, setRole] = useState(Employee.role);

  const handleSubmitClicked = e => {
    e.preventDefault();
    updateEmployeeRole(id, role);
    alert.switchToSuccess("New Role Assigned");
  };

  const handleCancelClicked = () => {
    setTimeout(function() {
      navigate("/sa/employee");
    }, 500);
  };

  const handleBackClicked = () => {
    setTimeout(function() {
      navigate("/sa/employee");
    }, 500);
  };

  return (
    <Page title="Assign Role">
      <Container component="main">
        <Stack alignItems="flex-start" justifyContent="center" spacing={2} mb={5}>
          <Button
            onClick={handleBackClicked}
            startIcon={<Iconify icon="bi:arrow-left" width={20} height={20} />}
          >
            back
          </Button>
          <Typography variant="h4">Assign Role for {Employee.name}</Typography>
        </Stack>
        <CssBaseline />
        <FormContainer onSubmit={handleSubmitClicked}>
          <Grid container>
            <Grid item xs={12} lg={10}>
              <Grid item xs={12} lg={6}>
                <Card>
                  <CardContent>
                    <Grid container direction="row">
                      <Grid
                        item
                        xs={12}
                        container
                        alignItems="center"
                        sx={{ mt: 1 }}
                      >
                        <Grid item xs={12} justifyContent="center">
                          <Typography height="15px">Role</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            variant="outlined"
                            margin="normal"
                            sx={{ mb: 3 }}
                            required
                            select
                            fullWidth
                            autoFocus
                            size="small"
                            defaultValue={Employee.role}
                            SelectProps={{ native: true }}
                            onChange={e => {
                              setRole(e.target.value);
                            }}
                          >
                            {roles.map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </TextField>
                        </Grid>
                      </Grid>
                      <FormControl component="fieldset">
                        <AlertMessage alertStatus={alert} />
                      </FormControl>
                      <Grid item xs={12} container>
                        <Grid item xs={4}></Grid>
                        <Grid
                          item
                          xs={8}
                          spacing={1}
                          container
                          justifyContent="flex-end"
                        >
                          <CancelButton
                            variant="contained"
                            onClick={handleCancelClicked}
                          >
                            Cancel
                          </CancelButton>
                          <SubmitButton type="submit" variant="contained">
                            Submit
                          </SubmitButton>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={0} lg={6}></Grid>
            </Grid>
            <Grid item xs={0} lg={2}></Grid>
          </Grid>
        </FormContainer>
      </Container>
    </Page>
  );
}
