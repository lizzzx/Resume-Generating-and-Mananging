import PropTypes from "prop-types";
import { useState } from "react";
// @mui
import { TableRow, TableCell, MenuItem, Link } from "@mui/material";
// utils
// components
import Iconify from "../../../../components/Iconify";
import { TableMoreMenu } from "../../../../components/table";
import { fDate } from "../../../../utils/formatTime";

// ----------------------------------------------------------------------

WorkspaceListTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onDeleteRow: PropTypes.func
};

export default function WorkspaceListTableRow({
  row,
  onEditRow,
  onViewRow,
  onDeleteRow
}) {
  const { sectorName, sectorTypeName, sectorModifiedDate } = row;

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
          {sectorName}
        </Link>
      </TableCell>
      <TableCell align="left" sx={{ textTransform: "capitalize" }}>
        {sectorTypeName}
      </TableCell>
      <TableCell align="left">{fDate(sectorModifiedDate)}</TableCell>

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
                <Iconify icon={"eva:edit-fill"} />
                Edit Sector
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: "error.main" }}
              >
                <Iconify icon={"eva:trash-2-outline"} />
                Delete
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
