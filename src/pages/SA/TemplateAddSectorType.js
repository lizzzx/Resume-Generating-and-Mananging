import { Container, CssBaseline, Typography, styled } from "@mui/material";
import { useState } from "react";

import {
  Card,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Stack,
  Box,
  Button,
  Tooltip
} from "@mui/material";

import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TableSelectedActions
} from "../../components/table";

import useTable, { getComparator, emptyRows } from "../../hooks/useTable";

import useTemplates from "../../hooks/useTemplates";

import useTemplate from "../../hooks/useTemplate";

import useSectorTypes from "../../hooks/useSectorTypes";

import Page from "../../components/Page";
import Scrollbar from "../../components/Scrollbar";
import Iconify from "../../components/Iconify";

import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";

import { UserTableRow } from "../../sections/@dashboard/employee";
import { TemplateTableToolbar } from "../../sections/@dashboard/template";

const Paper = styled("div")(({ theme }) => ({
  margin: theme.spacing(10, 0),
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start"
}));

const TABLE_HEAD = [{ id: "name", label: "Name", alignLeft: false }, { id: "" }];

export default function TemplateAddSectorType() {
  const [filterName, setFilterName] = useState("");
  const { getTemplate } = useTemplates();
  const navigate = useNavigate();

  const { tid } = useParams();

  const TemplateName = getTemplate(tid);

  const { sectorTypes, deleteSectorType } = useSectorTypes();

  const [tableData, setTableData] = useState(sectorTypes);

  const { addTemplateSectorType } = useTemplate(tid);

  const {
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangePage,
    onChangeRowsPerPage
  } = useTable();

  const handleFilterName = filtername => {
    setFilterName(filtername);
    setPage(0);
  };

  const handleDeleteRow = id => {
    const deleteRow = tableData.filter(row => row.id !== id);
    setSelected([]);
    setTableData(deleteRow);
    deleteSectorType(id);
  };

  const handleAddToTemplate = () => {
    selected.map(row => addTemplateSectorType(row));
    navigate("/SA/template/" + tid);
  };

  const filteredUsers = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName
  });

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Template Add Sector Type">
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Paper>
          <Stack
            direction="row"
            alignItems="left"
            justifyContent="space-between"
            mb={5}
          >
            <Typography variant="h4">Add Sector Type for {TemplateName}</Typography>
            <Box sx={{ flexShrink: 0 }}>
              <Button
                variant="contained"
                component={RouterLink}
                to={"/sa/sectorType/add"}
                startIcon={<Iconify icon={"eva:plus-fill"} />}
              >
                New Sector Type
              </Button>
            </Box>
          </Stack>
          <Container disableGutters>
            <Card>
              <TemplateTableToolbar
                filterName={filterName}
                onFilterName={handleFilterName}
              />
              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  {selected.length > 0 && (
                    <TableSelectedActions
                      numSelected={selected.length}
                      rowCount={tableData.length}
                      onSelectAllRows={checked =>
                        onSelectAllRows(
                          checked,
                          tableData.map(row => row.id)
                        )
                      }
                      actions={
                        <Tooltip title="Add to Template">
                          <Box sx={{ flexShrink: 0 }}>
                            <Button
                              variant="contained"
                              // component={RouterLink}
                              // to={"/SA/template/" + tid}
                              startIcon={<Iconify icon={"eva:plus-fill"} />}
                              sx={{ bgcolor: "error.main" }}
                              onClick={handleAddToTemplate}
                            >
                              Add to Template
                            </Button>
                          </Box>
                        </Tooltip>
                      }
                    />
                  )}
                  <Table>
                    <TableHeadCustom
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={tableData.length}
                      numSelected={selected.length}
                      onSort={onSort}
                      onSelectAllRows={checked =>
                        onSelectAllRows(
                          checked,
                          tableData.map(row => row.id)
                        )
                      }
                    />
                    <TableBody>
                      {filteredUsers
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map(row => {
                          return (
                            <UserTableRow
                              key={row.id}
                              row={row}
                              selected={selected.includes(row.id)}
                              onSelectRow={() => onSelectRow(row.id)}
                              onDeleteRow={() => handleDeleteRow(row.id)}
                              editRowPath="/SA/sectorType/"
                              editMenuText="Edit Sector Type"
                            />
                          );
                        })}
                      <TableEmptyRows
                        height={72}
                        emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                      />
                      <TableNoData isNotFound={isUserNotFound} />
                    </TableBody>
                  </Table>
                </TableContainer>
              </Scrollbar>
              <Box sx={{ position: "relative" }}>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={sectorTypes.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={onChangePage}
                  onRowsPerPageChange={onChangeRowsPerPage}
                />
              </Box>
            </Card>
          </Container>
        </Paper>
      </Container>
    </Page>
  );
}

function applySortFilter({ tableData, comparator, filterName, filterRole }) {
  const stabilizedThis = tableData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map(el => el[0]);

  if (filterName) {
    tableData = tableData.filter(
      item => item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterRole !== "all") {
    tableData = tableData.filter(item => item.role === filterRole);
  }

  return tableData;
}
