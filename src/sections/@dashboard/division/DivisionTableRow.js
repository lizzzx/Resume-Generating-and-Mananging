import PropTypes from "prop-types";
import { useState } from "react";
import { Checkbox, TableRow, TableCell, Typography, MenuItem } from "@mui/material";
import Iconify from "../../../components/Iconify";
import { TableMoreMenu } from "../../../components/table";
import Moment from "moment";

DivisionTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func
};

export default function DivisionTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow
}) {
  const { name, date } = row;

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = event => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell>
        <Typography noWrap>{name}</Typography>
      </TableCell>

      {date && (
        <TableCell align="left" sx={{ textTransform: "capitalize" }}>
          {Moment(date).format("MMMM DD, YYYY  hh:mm:ss.mmm")}
        </TableCell>
      )}

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
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
          }
        />
      </TableCell>
    </TableRow>
  );
}
