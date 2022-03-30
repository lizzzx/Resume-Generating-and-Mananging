import { useState } from "react";

import {
  Card,
  Table,
  TableBody,
  Container,
  TableContainer,
  TablePagination,
  Box
} from "@mui/material";

import Page from "../../components/Page";
import Scrollbar from "../../components/Scrollbar";
import {
  WorkspaceListTableRow,
  WorkspaceListToolbar
} from "../../sections/@dashboard/eeWorkspace/list";

import SECTORLIST from "../../_mocks_/sector";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { PATH_EE } from "../../paths";
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData
} from "../../components/table";
import useTable, { getComparator, emptyRows } from "../../hooks/useTable";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import Button from "@mui/material/Button";
import Iconify from "../../components/Iconify";

const SECTOR_OPTIONS = ["all", "education", "project", "summary", "justification"];

const TABLE_HEAD = [
  { id: "sectorName", label: "Sector Name", alignLeft: false },
  { id: "sectorTypeName", label: "Type", alignLeft: true },
  { id: "sectorModifiedDate", label: "Modified Date", alignLeft: true },
  { id: "" }
];

export default function EEWorkspace() {
  const {
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    onSort,
    onChangePage,
    onChangeRowsPerPage
  } = useTable();

  const navigate = useNavigate();
  const [tableData, setTableData] = useState(SECTORLIST);
  const [filterSectorName, setFilterSectorName] = useState("");
  const [filterSectorTypeName, setFilterSectorTypeName] = useState("all");

  const handleFilterSectorName = filterSectorName => {
    setFilterSectorName(filterSectorName);
    setPage(0);
  };

  const handleFilterSectorTypeName = event => {
    setFilterSectorTypeName(event.target.value);
  };

  const handleViewRow = id => {
    navigate(PATH_EE.workspace.view(id));
  };

  const handleEditRow = id => {
    navigate(PATH_EE.workspace.edit(id));
  };

  const handleDeleteRow = id => {
    const deleteRow = tableData.filter(row => row.sectorID !== id);
    setTableData(deleteRow);
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterSectorName,
    filterSectorTypeName
  });

  const isNotFound =
    (!dataFiltered.length && !!filterSectorName) ||
    (!dataFiltered.length && !!filterSectorTypeName);

  return (
    <Page title="EE Workspace: List">
      <Container>
        <HeaderBreadcrumbs
          heading="Workspace List"
          links={[
            { name: "Workspace", href: PATH_EE.workspace.list },
            { name: "List" }
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_EE.workspace.add}
              startIcon={<Iconify icon={"eva:plus-fill"} />}
            >
              New Sector
            </Button>
          }
        />

        <Card>
          <WorkspaceListToolbar
            filterName={filterSectorName}
            onFilterName={handleFilterSectorName}
            filterType={filterSectorTypeName}
            onFilterType={handleFilterSectorTypeName}
            optionType={SECTOR_OPTIONS}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: "relative" }}>
              <Table>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onSort={onSort}
                />
                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(row => (
                      <WorkspaceListTableRow
                        key={row.sectorID}
                        row={row}
                        onEditRow={() => handleEditRow(row.sectorID)}
                        onViewRow={() => handleViewRow(row.sectorID)}
                        onDeleteRow={() => handleDeleteRow(row.sectorID)}
                      />
                    ))}
                  <TableEmptyRows
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

function applySortFilter({
  tableData,
  comparator,
  filterSectorName,
  filterSectorTypeName
}) {
  const stabilizedThis = tableData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map(el => el[0]);

  if (filterSectorName) {
    tableData = tableData.filter(
      item =>
        item.sectorName.toLowerCase().indexOf(filterSectorName.toLowerCase()) !== -1
    );
  }

  if (filterSectorTypeName !== "all") {
    tableData = tableData.filter(
      item => item.sectorTypeName === filterSectorTypeName
    );
  }

  return tableData;
}
