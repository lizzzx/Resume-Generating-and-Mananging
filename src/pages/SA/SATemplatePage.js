import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
// @mui
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
  Typography,
  Button
} from "@mui/material";
// hooks
import useTable, { getComparator, emptyRows } from "../../hooks/useTable";

import useTemplates from "../../hooks/useTemplates";
// components
import Page from "../../components/Page";
import Iconify from "../../components/Iconify";
import Scrollbar from "../../components/Scrollbar";
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TableSelectedActions
} from "../../components/table";
// sections
import { UserTableRow } from "../../sections/@dashboard/employee";
import { TemplateTableToolbar } from "../../sections/@dashboard/template";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Name", align: "left" },
  { id: "date", label: "Modified Date", align: "left" },
  { id: "" }
];

// ----------------------------------------------------------------------

export default function SATemplatePage() {
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

  const { templates, deleteTemplate } = useTemplates();

  // const navigate = useNavigate();

  const [tableData, setTableData] = useState(templates);

  const [filterName, setFilterName] = useState("");

  const handleFilterName = filterName => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleDeleteRow = id => {
    const deleteRow = tableData.filter(row => row.id !== id);
    setSelected([]);
    setTableData(deleteRow);
    deleteTemplate(id);
  };

  const handleDeleteRows = selected => {
    const deleteRows = tableData.filter(row => !selected.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName
  });

  const denseHeight = 72;

  const isNotFound = (!dataFiltered.length && !!filterName) || !dataFiltered.length;

  return (
    <Page title="Template">
      <Container maxWidth={"lg"}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4">Template</Typography>
          <Box sx={{ flexShrink: 0 }}>
            <Button
              variant="contained"
              component={RouterLink}
              to={"/sa/template/add"}
              startIcon={<Iconify icon={"eva:plus-fill"} />}
            >
              New Template
            </Button>
          </Box>
        </Stack>
        <Card>
          <TemplateTableToolbar
            filterName={filterName}
            onFilterName={handleFilterName}
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
                        editRowPath="/sa/template/"
                        editMenuText="Edit Template"
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

// ----------------------------------------------------------------------

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
