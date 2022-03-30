import { Link as RouterLink, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Card,
  Checkbox,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography
} from "@mui/material";
import "easymde/dist/easymde.min.css";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import AsyncAutocomplete from "../../../components/AsyncAutocomplete";
import { RequestListHead } from "../paWorkspace";
import Scrollbar from "../../../components/Scrollbar";
import EXISTINGRESUMELIST from "../../../_mocks_/paExistingResume";
import { fDate } from "../../../utils/formatTime";
import SearchNotFound from "../../../components/SearchNotFound";
import { filter } from "lodash";
import useTable from "../../../hooks/useTable";

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

const TABLE_HEAD = [
  { id: "workspaceID", label: "", alignLeft: true },
  { id: "workspaceID", label: "ID", alignLeft: true },
  { id: "resumeName", label: "Resume Name", alignLeft: false },
  { id: "date", label: "Last Modified Date", alignLeft: true },
  { id: "" }
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      _user => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map(el => el[0]);
}

export default function PAAddExistingResumeForm({ workspaceId }) {
  const navigate = useNavigate();
  const [employeeId, setEmployeeId] = useState("");

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { onSelectRow } = useTable();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = EXISTINGRESUMELIST.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - EXISTINGRESUMELIST.length) : 0;

  const filteredUsers = applySortFilter(
    EXISTINGRESUMELIST,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  const onSubmit = () => {
    navigate(`/pa/workspace/${workspaceId}`);
  };

  return (
    <form>
      <Grid container spacing={3}>
        <Grid item xs={12} md={10}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              {/*<div>*/}
              {/*  <LabelStyle>Resume Name</LabelStyle>*/}
              {/*  <TextField*/}
              {/*    name="name"*/}
              {/*    fullWidth*/}
              {/*    size="small"*/}
              {/*    value="Sample Resume"*/}
              {/*  />*/}
              {/*</div>*/}
              <div>
                <LabelStyle>Target Employee</LabelStyle>
                <AsyncAutocomplete
                  optionList={employeeList}
                  selectedValue={employeeId}
                  setSelectedValue={setEmployeeId}
                />
              </div>
              {employeeId && (
                <Card>
                  <Scrollbar>
                    <TableContainer sx={{ minWidth: 800 }}>
                      <Table>
                        <RequestListHead
                          order={order}
                          orderBy={orderBy}
                          headLabel={TABLE_HEAD}
                          rowCount={EXISTINGRESUMELIST.length}
                          numSelected={selected.length}
                          onRequestSort={handleRequestSort}
                          onSelectAllClick={handleSelectAllClick}
                        />
                        <TableBody>
                          {filteredUsers
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map(row => {
                              const { id, resumeName, date } = row;
                              const isItemSelected = selected.indexOf(name) !== -1;

                              return (
                                <TableRow
                                  hover
                                  key={id}
                                  tabIndex={-1}
                                  role="checkbox"
                                  selected={isItemSelected}
                                  aria-checked={isItemSelected}
                                >
                                  <TableCell padding="checkbox">
                                    <Checkbox
                                      checked={selected}
                                      onClick={() => onSelectRow(row.id)}
                                    />
                                  </TableCell>
                                  <TableCell component="th" scope="row">
                                    <Typography variant="body" noWrap pl={5} pr={-5}>
                                      {id}
                                    </Typography>
                                  </TableCell>
                                  <TableCell component="th" scope="row">
                                    <Typography variant="subtitle2" noWrap>
                                      {resumeName}
                                    </Typography>
                                  </TableCell>
                                  <TableCell align="left">{fDate(date)}</TableCell>

                                  <TableCell align="right">
                                    <Button
                                      variant="contained"
                                      component={RouterLink}
                                      to={`/pa/workspace/${workspaceId}/resume/1/viewOnly`}
                                    >
                                      View
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                              <TableCell colSpan={6} />
                            </TableRow>
                          )}
                        </TableBody>
                        {isUserNotFound && (
                          <TableBody>
                            <TableRow>
                              <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                <SearchNotFound searchQuery={filterName} />
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        )}
                      </Table>
                    </TableContainer>
                  </Scrollbar>

                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={EXISTINGRESUMELIST.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Card>
              )}
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
                  Create
                </Button>
              </Grid>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </form>
  );
}

const employeeList = [
  { value: "Zhe Li (zheli@ae.com)" },
  { value: "Zipeng Liang (zipengliang@ae.com)" },
  { value: "Kehong Liu (kehongliu@ae.com)" },
  { value: "Yennis Ye (yennisye@ae.com)" },
  { value: "Roy Zhong (royzhong@ae.com)" },
  { value: "Lisa Li (lisali@ae.com)" },
  { value: "Alex Ling (alexling@ae.com)" }
];
