import { Link as RouterLink, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Card, Grid, Stack, TextField, Typography } from "@mui/material";
import "easymde/dist/easymde.min.css";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import { RequestMoreMenu } from "../paEditResume";
import Iconify from "../../../components/Iconify";

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

const SectorLabelWrapper = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
}));

export default function PAEditResumeForm({ workspaceId, resumeId }) {
  const navigate = useNavigate();
  const [employeeId, setEmployeeId] = useState("");

  const onSubmit = () => {
    navigate(`/pa/workspace/${workspaceId}`);
    console.log(employeeId);
    console.log(resumeId);
    setEmployeeId("");
  };

  function createData(name, calories, protein) {
    return { name, calories, protein };
  }

  const rows = [
    createData("Sector 1", "22 March 2022", 4.0),
    createData("Sector 2", "22 March 2022", 4.3)
  ];

  const rows2 = [
    createData("Sector 3", "21 March 2022", 4.0),
    createData("Sector 4", "22 March 2022", 4.3)
  ];

  const rows3 = [
    createData("Sector 5", "23 March 2022", 4.0),
    createData("Sector 6", "24 March 2022", 4.3)
  ];

  return (
    <form>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <div>
                <LabelStyle>Resume Name</LabelStyle>
                <TextField
                  name="name"
                  size="small"
                  style={{ width: "60%" }}
                  value="Sample Resume"
                />
                <Button
                  variant="contained"
                  onClick={() => onSubmit()}
                  sx={{ marginLeft: 2 }}
                >
                  Save
                </Button>
              </div>
              <div>
                <LabelStyle>Target Employee</LabelStyle>
                <TextField
                  name="name"
                  size="small"
                  disabled
                  style={{ width: "60%" }}
                  value="Target Employee"
                />
              </div>
              <div>
                {rows && (
                  <SectorLabelWrapper>
                    <LabelStyle>WorkExperience</LabelStyle>
                    <Button
                      variant="contained"
                      startIcon={<Iconify icon="eva:plus-fill" />}
                      component={RouterLink}
                      to={`/pa/workspace/${workspaceId}/resume/${resumeId}/addFromExisting`}
                    >
                      Add Existing Sector
                    </Button>
                  </SectorLabelWrapper>
                )}
                {rows && (
                  <div>
                    <TableContainer component={Paper}>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Sector Name</TableCell>
                            <TableCell align="left">Modified Date</TableCell>
                            <TableCell align="right" />
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map(row => (
                            <TableRow
                              key={row.name}
                              sx={{
                                "&:last-child td, &:last-child th": { border: 0 }
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {row.name}
                              </TableCell>
                              <TableCell align="left">{row.calories}</TableCell>
                              <TableCell align="right">
                                <RequestMoreMenu
                                  workspaceId={workspaceId}
                                  resumeId={resumeId}
                                  sectorId={1}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                )}
                {rows2 && (
                  <SectorLabelWrapper>
                    <LabelStyle>Education</LabelStyle>
                    <Button
                      variant="contained"
                      startIcon={<Iconify icon="eva:plus-fill" />}
                      component={RouterLink}
                      to={`/pa/workspace/${workspaceId}/resume/${resumeId}/addFromExisting`}
                    >
                      Add Existing Sector
                    </Button>
                  </SectorLabelWrapper>
                )}
                {rows2 && (
                  <div>
                    <TableContainer component={Paper}>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Sector Name</TableCell>
                            <TableCell align="left">Modified Date</TableCell>
                            <TableCell align="right" />
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows2.map(row => (
                            <TableRow
                              key={row.name}
                              sx={{
                                "&:last-child td, &:last-child th": { border: 0 }
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {row.name}
                              </TableCell>
                              <TableCell align="left">{row.calories}</TableCell>
                              <TableCell align="right">
                                <RequestMoreMenu
                                  workspaceId={workspaceId}
                                  resumeId={resumeId}
                                  sectorId={1}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                )}
                {rows3 && (
                  <SectorLabelWrapper>
                    <LabelStyle>Projects</LabelStyle>
                    <Button
                      variant="contained"
                      startIcon={<Iconify icon="eva:plus-fill" />}
                      component={RouterLink}
                      to={`/pa/workspace/${workspaceId}/resume/${resumeId}/addFromExisting`}
                    >
                      Add Existing Sector
                    </Button>
                  </SectorLabelWrapper>
                )}
                {rows3 && (
                  <div>
                    <TableContainer component={Paper}>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Sector Name</TableCell>
                            <TableCell align="left">Modified Date</TableCell>
                            <TableCell align="right" />
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows3.map(row => (
                            <TableRow
                              key={row.name}
                              sx={{
                                "&:last-child td, &:last-child th": { border: 0 }
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {row.name}
                              </TableCell>
                              <TableCell align="left">{row.calories}</TableCell>
                              <TableCell align="right">
                                <RequestMoreMenu
                                  workspaceId={workspaceId}
                                  resumeId={resumeId}
                                  sectorId={1}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                )}
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
                  Request to Employee
                </Button>
              </Grid>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </form>
  );
}
