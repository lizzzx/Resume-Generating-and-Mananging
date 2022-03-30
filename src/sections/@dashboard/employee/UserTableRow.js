import PropTypes from "prop-types";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Checkbox, TableRow, TableCell, Typography, MenuItem } from "@mui/material";

import Label from "../../../components/Label";
import Iconify from "../../../components/Iconify";
import { TableMoreMenu } from "../../../components/table";
import Moment from "moment";

UserTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  editRowPath: PropTypes.string,
  editMenuText: PropTypes.string,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func
};

export default function UserTableRow({
  row,
  selected,
  editRowPath,
  editMenuText,
  onSelectRow,
  onDeleteRow
}) {
  //const theme = useTheme();

  const { id, name, email, role, date } = row;

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

      {email && <TableCell align="left">{email}</TableCell>}

      {date && (
        <TableCell align="left" sx={{ textTransform: "capitalize" }}>
          {Moment(date).format("MMMM DD, YYYY  hh:mm:ss.mmm")}
        </TableCell>
      )}

      {role && (
        <TableCell align="left">
          <Label
            variant={"filled"}
            color={
              (role === "Employee" && "primary") ||
              (role === "Project Administrator" && "secondary") ||
              "error"
            }
            sx={{ textTransform: "capitalize" }}
          >
            {role}
          </Label>
        </TableCell>
      )}

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                component={RouterLink}
                to={editRowPath + id}
                sx={{ color: "text.secondary" }}
              >
                <Iconify icon={"eva:edit-fill"} />
                {editMenuText ? editMenuText : "Edit"}
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
