import React, { useState } from "react";
import Page from "../components/Page";

import {
  Button,
  Container,
  Typography,
  Divider,
  Box,
  Stack,
  Table,
  TableBody,
  TableContainer,
  Card,
  TablePagination
} from "@mui/material";
// import {Link as RouterLink} from "react-router-dom";
import Scrollbar from "../components/Scrollbar";
import UploadAndDisplayImage from "../hooks/UploadAndDisplayImage";
// import HeaderBreadcrumbs from "../components/HeaderBreadcrumbs";
import Iconify from "../components/Iconify";
import { TableEmptyRows, TableHeadCustom } from "../components/table";
import useTable, {  emptyRows } from "../hooks/useTable"; // getComparator
import { PATH_EE } from "../paths";
import { useNavigate } from "react-router-dom";
import EDUCATIONLIST from "../_mocks_/education";
import ResumeTableRow from "../sections/@dashboard/eeResume/ResumeTableRow";
import { add } from "date-fns";

const divStyle = {
  display: "flex",
  alignItems: "center"
};

const TABLE_HEAD = [
  { id: "duplicatedSectorName", label: "Sector Name", alignLeft: false },
  { id: "duplicatedSectorModifiedDate", label: "Modified Date", alignLeft: true },
  { id: "" }
];

const fakelist=[{  duplicatedSectorID: "1",
  duplicatedSectorName: "compa1",
  duplicatedSectorTypeID: "ed",
  duplicatedSectorModifiedDate:add(new Date(), { days: 1, hours: 1 }),
  duplicatedSectorTypeName: "education"},{
    duplicatedSectorID: "2",
    duplicatedSectorName: "compa2",
    duplicatedSectorTypeID: "ed",
    duplicatedSectorModifiedDate: add(new Date(), { days: 1, hours: 1 }),
    duplicatedSectorTypeName: "education"
  },{ duplicatedSectorID: "3",
  duplicatedSectorName: "compa3",
  duplicatedSectorTypeID: "pro",
  duplicatedSectorModifiedDate:add(new Date(), { days: 1, hours: 1 }),
  duplicatedSectorTypeName: "project"},{ duplicatedSectorID: "4",
  duplicatedSectorName: "compa4",
  duplicatedSectorTypeID: "pro",
  duplicatedSectorModifiedDate: add(new Date(), { days: 1, hours: 1 }),
  duplicatedSectorTypeName: "project"}]



export default function Resume({ requestID }) {
  // preparing sectorList data and use "sectorlist" for display
  const sectorlist = [];
  const groupBy = (x,f)=>x.reduce((a,b)=>((a[f(b)]||=[]).push(b),a),{});
  // USED fakelist instead of ACTUAL DATA LIST for testing
  let displaySectorList  = groupBy(fakelist, s=>s.duplicatedSectorTypeName)
  Object.keys(displaySectorList).forEach((sectorType)=>{
    sectorlist.push({
      sectorType: sectorType,
      sectorData: displaySectorList[sectorType]
    })
  })

  const {
    page,
    order,
    orderBy,
    rowsPerPage,
    onSort,
    onChangePage,
    onChangeRowsPerPage
  } = useTable();

  const navigate = useNavigate();
  const [tableData, setTableData] = useState(EDUCATIONLIST);

  const handleEditRow = (requestID, duplicatedSectorID) => {
    navigate(PATH_EE.request.editDuplicated(requestID, duplicatedSectorID));
  };

  const handleDeleteRow = duplicatedSectorID => {
    const deleteRow = tableData.filter(
      row => row.duplicatedSectorID !== duplicatedSectorID
    );
    setTableData(deleteRow);
  };

  const addSector = () => {};

  // const dataFiltered = applySortFilter({
  //   tableData,
  //   comparator: getComparator(order, orderBy)
  // });
  // console.log(sectorlist[0].sectorData)
  // console.log(dataFiltered);

  return (
    <Page title="Resume">
      <Box>
        <Container component="main">
          <Stack spacing={2}>
            <div style={divStyle}>
              <Stack direction="row" spacing={2}>
                <UploadAndDisplayImage
                  header={"Upload Profile Photo"}
                ></UploadAndDisplayImage>
                <Stack
                  direction="column"
                  alignItems="left"
                  justifyContent="space-between"
                  mb={5}
                >
                  <Typography variant="h4" gutterBottom>
                    Mike A
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    Role:
                  </Typography>
                  <p>Summary:</p>
                  <p>
                    Description: Deployed new systems including: SAN/NAS file
                    storage, disk-to-disk enterprise backup solution and complete
                    disaster recovery plan and procedures, PBX in all locations with
                    VoIP implementation and voicemail, help desk application, asset
                    tracking/inventory management, secure 802.11 wireless LAN
                    including Radius authentication server.
                  </p>
                </Stack>
              </Stack>
            </div>
            <Divider />
            {/* Mapping SECTOR_TYPE for generating different sectors */}
           <div>{sectorlist.map(sector=>{return (
                <div key={sector.sectorType} style = {{margin:"30px"}}>
             <Box sx={{ display: "flex", alignItems: "center" }}>
               <Box sx={{ flexGrow: 1 }}>
                 <Typography variant="h4" gutterBottom>
                   {`${sector.sectorType}`}
                 </Typography>
               </Box>
               <Box sx={{ flexShrink: 0 }}>
                 <Button style = {{margin:"10px"}}
                   variant="contained"
                   //TODO: route to from existing
                   onClick={addSector}
                   startIcon={<Iconify icon={"eva:plus-fill"} />}
                 >
                   {`Add ${sector.sectorType} From Existing`}
                 </Button>
               </Box>
             </Box>
             <Card style = {{marginUp:"20px"}}>
               <Scrollbar>
                 <TableContainer sx={{ minWidth: 800, position: "relative" }}>
                   <Table size={"medium"}>
                     <TableHeadCustom
                       order={order}
                       orderBy={orderBy}
                       headLabel={TABLE_HEAD}
                       onSort={onSort}
                     />
                     <TableBody>
                       {sector.sectorData
                         .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                         .map(row => (
                           <ResumeTableRow
                             key={row.duplicatedSectorID}
                             row={row}
                             onEditRow={() =>
                               handleEditRow(requestID, row.duplicatedSectorID)
                             }
                             onDeleteRow={() => handleDeleteRow(row.duplicatedSectorID)}
                           />
                         ))}
                       <TableEmptyRows
                         emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                       />
                     </TableBody>
                   </Table>
                 </TableContainer>
               </Scrollbar>
               <Box sx={{ position: "relative" }}>
                 <TablePagination
                   rowsPerPageOptions={[5, 10, 25]}
                   component="div"
                   count={sector.sectorData.length}
                   rowsPerPage={rowsPerPage}
                   page={page}
                   onPageChange={onChangePage}
                   onRowsPerPageChange={onChangeRowsPerPage}
                 />
               </Box>
             </Card>
           </div>)})}
            </div>
          </Stack>
        </Container>
      </Box>
    </Page>
  );
}

// function applySortFilter({ tableData, comparator }) {
//   const stabilizedThis = tableData.map((el, index) => [el, index]);

//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });

//   tableData = stabilizedThis.map(el => el[0]);

//   return tableData;
// }