import PropTypes from "prop-types";
import { TableRow, TableCell } from "@mui/material";

TableEmptyRows.propTypes = {
  emptyRows: PropTypes.number
};

export default function TableEmptyRows({ emptyRows }) {
  if (!emptyRows) {
    return null;
  }

  return (
    <TableRow
      sx={{
        ...{
          height: 72 * emptyRows
        }
      }}
    >
      <TableCell colSpan={9} />
    </TableRow>
  );
}
