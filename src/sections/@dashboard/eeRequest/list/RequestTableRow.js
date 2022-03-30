import PropTypes from "prop-types";
import { useState } from "react";
// @mui
import { TableRow, TableCell, MenuItem, Link } from "@mui/material";
// utils
// components
import Label from "../../../../components/Label";
import Iconify from "../../../../components/Iconify";
import { TableMoreMenu } from "../../../../components/table";
import { fDate } from "../../../../utils/formatTime";

// ----------------------------------------------------------------------

RequestTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func
};

export default function RequestTableRow({ row, onEditRow, onViewRow }) {
  const { requestName, requester, requestSentTime, requestStatus } = row;

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = event => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover>
      <TableCell align="left">
        <Link
          noWrap
          variant="subtitle2"
          onClick={onViewRow}
          sx={{ cursor: "pointer" }}
        >
          {requestName}
        </Link>
      </TableCell>

      <TableCell align="left">{requester}</TableCell>

      <TableCell align="left">{fDate(requestSentTime)}</TableCell>

      <TableCell align="left">
        <Label
          color={
            (requestStatus === "submitted" && "success") ||
            (requestStatus === "todo" && "warning") ||
            (requestStatus === "rejected" && "error") ||
            "default"
          }
          sx={{ textTransform: "capitalize" }}
        >
          {requestStatus}
        </Label>
      </TableCell>

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={"eva:paper-plane-fill"} />
                Submit
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
