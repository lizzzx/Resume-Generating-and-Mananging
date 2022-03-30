import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  Table,
  Tooltip,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
  Stack,
  Typography
} from "@mui/material";
import useTable, { getComparator, emptyRows } from "../../hooks/useTable";
import useEmployee from "../../hooks/useEmployee";
import Page from "../../components/Page";
import Iconify from "../../components/Iconify";
import Scrollbar from "../../components/Scrollbar";
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TableSelectedActions
} from "../../components/table";

import { UserTableRow } from "../../sections/@dashboard/employee";
import EmployeeTableToolbar from "../../sections/@dashboard/employee/EmployeeTableToolBar";

const FILTER_OPTIONS = ["name", "email", "role"];

const TABLE_HEAD = [
  { id: "name", label: "Name", align: "left" },
  { id: "email", label: "Email", align: "left" },
  { id: "role", label: "Role", align: "left" },
  { id: "" }
];

// const EmployeeList = [
//   {id: "0", name: "A", email: "nrsthj@gmail.com", role:"Employee"},
//   {id: "1", name: "B", email: "oaushdgi@gmail.com", role:"Project Administrator"},
//   {id: "2", name: "C", email: "weasd@gmail.com", role:"Employee"},
//   {id: "3", name: "D", email: "etywdfbhe@gmail.com", role:"System Administrator"},
//   {id: "4", name: "E", email: "qwoeihd@gmail.com", role:"Employee"},
//   {id: "5", name: "F", email: "qiowrtaksdbnv@gmail.com", role:"Employee"}
// ]

// ----------------------------------------------------------------------

export default function EmployeePage() {
  const {
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    onSort,
    onChangePage,
    onChangeRowsPerPage
  } = useTable();

  const { employees, deleteEmployee } = useEmployee();

  const navigate = useNavigate();

  const [tableData, setTableData] = useState(employees);

  const [filterContent, setFilterContent] = useState("");

  const [filter, setFilter] = useState(FILTER_OPTIONS[0]);

  const handleFilterContent = text => {
    setFilterContent(text);
    setPage(0);
  };

  const handleFilterChanged = e => {
    setFilter(e.target.value);
    setPage(0);
  };

  const handleDeleteRow = id => {
    const deleteRow = tableData.filter(row => row.id !== id);
    setSelected([]);
    setTableData(deleteRow);
    deleteEmployee(id);
  };

  const handleDeleteRows = selected => {
    const deleteRows = tableData.filter(row => !selected.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);
  };

  const handleEditRow = id => {
    navigate("/sa/employee/" + id);
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterContent,
    filter
  });

  const denseHeight = 72;

  const isNotFound = !dataFiltered.length && !!filterContent;

  return (
    <Page title="User: List">
      <Container maxWidth={"lg"}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4">Employee</Typography>
        </Stack>
        <Card>
          <EmployeeTableToolbar
            filterContent={filterContent}
            filter={filter}
            onFilterContent={handleFilterContent}
            onFilter={handleFilterChanged}
            filterOption={FILTER_OPTIONS}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: "relative" }}>
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
                    <Tooltip title="Delete">
                      <IconButton
                        color="primary"
                        onClick={() => handleDeleteRows(selected)}
                      >
                        <Iconify icon={"eva:trash-2-outline"} />
                      </IconButton>
                    </Tooltip>
                  }
                />
              )}

              <Table size={"medium"}>
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
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(row => (
                      <UserTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row.id)}
                        onSelectRow={() => onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                        editRowPath="/sa/employee/"
                        editMenuText="Assign Role"
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                  />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: "relative" }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={dataFiltered.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}

function applySortFilter({ tableData, comparator, filterContent, filter }) {
  const stabilizedThis = tableData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (filterContent) {
    if (filter === "name") {
      tableData = tableData.filter(
        item => item.name.toLowerCase().indexOf(filterContent.toLowerCase()) !== -1
      );
    } else if (filter === "email") {
      tableData = tableData.filter(
        item => item.email.toLowerCase().indexOf(filterContent.toLowerCase()) !== -1
      );
    } else {
      tableData = tableData.filter(
        item => item.role.toLowerCase().indexOf(filterContent.toLowerCase()) !== -1
      );
    }
  }

  return tableData;
}
