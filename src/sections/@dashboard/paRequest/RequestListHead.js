import PropTypes from "prop-types";

import { visuallyHidden } from "@mui/utils";
import {
  Box,
  TableRow,
  TableCell,
  TableHead,
  TableSortLabel,
  styled
} from "@mui/material";

RequestListHead.propTypes = {
  order: PropTypes.oneOf(["asc", "desc"]),
  orderBy: PropTypes.string,
  headLabel: PropTypes.array,
  onRequestSort: PropTypes.func
};

const NameHeader = styled("div")(({ theme }) => ({
  paddingLeft: theme.spacing(5)
}));

export default function RequestListHead({
  order,
  orderBy,
  headLabel,
  onRequestSort
}) {
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headLabel.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.alignLeft ? "left" : "left"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.id === "requestName" ? (
                <NameHeader>{headCell.label}</NameHeader>
              ) : (
                headCell.label
              )}
              {orderBy === headCell.id ? (
                <Box sx={{ ...visuallyHidden }}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
