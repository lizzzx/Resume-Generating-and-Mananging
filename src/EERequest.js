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

import Page from "../components/Page";
import Scrollbar from "../components/Scrollbar";
import {
  RequestListToolbar,
  RequestTableRow
} from "../sections/@dashboard/eeRequest/list";

import REQUESTLIST from "../_mocks_/request";
import { useNavigate } from "react-router-dom";
import { PATH_EE } from "../paths";
import { TableEmptyRows, TableHeadCustom, TableNoData } from "../components/table";
import useTable, { getComparator, emptyRows } from "../hooks/useTable";
import HeaderBreadcrumbs from "../components/HeaderBreadcrumbs";

const STATUS_OPTIONS = ["all", "todo", "submitted", "rejected"];

const TABLE_HEAD = [
  { id: "requestName", label: "Request Name", alignLeft: false },
  { id: "requester", label: "Requester", alignLeft: true },
  { id: "requestSentTime", label: "Sent Time", alignLeft: true },
  { id: "requestStatus", label: "Status", alignLeft: true },
  { id: "" }
];

export default function EERequest() {
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
  const [tableData] = useState(REQUESTLIST);
  const [filterName, setFilterName] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const handleFilterName = filterName => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleFilterStatus = event => {
    setFilterStatus(event.target.value);
  };

  const handleEditRow = requestID => {
    navigate(PATH_EE.request.edit(requestID));
  };

  const handleViewRow = requestID => {
    navigate(PATH_EE.request.view(requestID));
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterStatus
  });

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterStatus);

  return (
    <Page title="EE Request: List">
      <Container>
        <HeaderBreadcrumbs
          heading="Request List"
          links={[
            { name: "Requests", href: PATH_EE.request.list },
            { name: "List" }
          ]}
        />

        <Card>
          <RequestListToolbar
            filterName={filterName}
            onFilterName={handleFilterName}
            filterStatus={filterStatus}
            onFilterStatus={handleFilterStatus}
            optionStatus={STATUS_OPTIONS}
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
                      <RequestTableRow
                        key={row.requestID}
                        row={row}
                        onEditRow={() => handleEditRow(row.requestID)}
                        onViewRow={() => handleViewRow(row.requestID)}
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

function applySortFilter({ tableData, comparator, filterName, filterStatus }) {
  const stabilizedThis = tableData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map(el => el[0]);

  if (filterName) {
    tableData = tableData.filter(
      item => item.requestName.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterStatus !== "all") {
    tableData = tableData.filter(item => item.requestStatus === filterStatus);
  }

  return tableData;
}
