import PropTypes from "prop-types";
import React from "react";
import { Checkbox, TableRow, TableCell, Typography } from "@mui/material";

import Moment from "moment";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";

ExistingSectorTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onSelectRow: PropTypes.func
};

export default function ExistingSectorTableRow({
  row,
  selected,
  onSelectRow,
  workspaceId,
  resumeId
}) {
  const { name, date } = row;

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

      <TableCell align="center">
        <Button
          variant="contained"
          component={RouterLink}
          to={`/pa/workspace/${workspaceId}/resume/${resumeId}/1/viewOnly`}
        >
          View
        </Button>
      </TableCell>
    </TableRow>
  );
}
