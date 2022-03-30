import PropTypes from "prop-types";
import { useState } from "react";
import { TableRow, TableCell, MenuItem, Link } from "@mui/material";
import { fDate } from "../../../utils/formatTime";
import { TableMoreMenu } from "../../../components/table";
import Iconify from "../../../components/Iconify";

// ----------------------------------------------------------------------

ResumeTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func
};

export default function ResumeTableRow({ row, onEditRow, onDeleteRow }) {
  const { duplicatedSectorName, duplicatedSectorModifiedDate } = row;

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
          variant="subtitle2"
          noWrap
          onClick={onEditRow}
          sx={{ cursor: "pointer" }}
        >
          {duplicatedSectorName}
        </Link>
      </TableCell>
      <TableCell align="left">{fDate(duplicatedSectorModifiedDate)}</TableCell>

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
