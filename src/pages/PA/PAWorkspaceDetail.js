import { filter } from "lodash";
import React, { useState } from "react";

import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from "@mui/material";

import Page from "../../components/Page";
import Scrollbar from "../../components/Scrollbar";
import SearchNotFound from "../../components/SearchNotFound";
import {
  RequestListHead,
  RequestListToolbar,
  RequestMoreMenu
} from "../../sections/@dashboard/paWorkspaceDetail";

import WORKSPACEDETAILTLIST from "../../_mocks_/paWorkspaceDetail";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import Iconify from "../../components/Iconify";
import { fDate } from "../../utils/formatTime";
import { useParams } from "react-router";
import Grid from "@mui/material/Grid";

const TABLE_HEAD = [
  { id: "ID", label: "ID", alignLeft: true },
  { id: "name", label: "Resume Name", alignLeft: false },
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

export default function PAWorkspaceDetail() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { workspaceId } = useParams();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = WORKSPACEDETAILTLIST.map(n => n.name);
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

  const handleFilterByName = event => {
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - WORKSPACEDETAILTLIST.length)
      : 0;

  const filteredUsers = applySortFilter(
    WORKSPACEDETAILTLIST,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="PA Workspace">
      <Container>
        <HeaderBreadcrumbs
          heading={`Workspace ${workspaceId}`}
          links={[
            { name: "PA", href: "/pa" },
            { name: "Workspace", href: "/pa/workspace" },
            { name: `${workspaceId}` }
          ]}
        />
        <Grid
          container
          sx={{
            direction: "row",
            justifyContent: "flex-end",
            marginBottom: 2,
            marginTop: -2
          }}
        >
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            component={RouterLink}
            to={"#"}
            sx={{ marginRight: 2 }}
            color="error"
          >
            Export Workspace
          </Button>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            component={RouterLink}
            to={`/pa/workspace/${workspaceId}/resume/add`}
            sx={{ marginRight: 2 }}
          >
            New Resume
          </Button>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            component={RouterLink}
            to={`/pa/workspace/${workspaceId}/resume/addFromExisting`}
          >
            Add from Existing
          </Button>
        </Grid>

        <Card>
          <RequestListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <RequestListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={WORKSPACEDETAILTLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                            <RequestMoreMenu
                              workspaceID={workspaceId}
                              resumeId={id}
                            />
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
            count={WORKSPACEDETAILTLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
