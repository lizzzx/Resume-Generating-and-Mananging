import PropTypes from "prop-types";
import { InputAdornment, TextField, Stack, MenuItem } from "@mui/material";

import Iconify from "../../../../components/Iconify";

// ----------------------------------------------------------------------

RequestListToolbar.propTypes = {
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  filterStatus: PropTypes.string,
  onFilterStatus: PropTypes.func,
  optionStatus: PropTypes.arrayOf(PropTypes.string)
};

export default function RequestListToolbar({
  filterName,
  onFilterName,
  filterStatus,
  onFilterStatus,
  optionStatus
}) {
  return (
    <Stack
      spacing={2}
      direction={{ xs: "column", sm: "row" }}
      sx={{ py: 2.5, px: 3 }}
    >
      <TextField
        fullWidth
        select
        label="Status"
        value={filterStatus}
        onChange={onFilterStatus}
        SelectProps={{
          MenuProps: {
            sx: { "& .MuiPaper-root": { maxHeight: 260 } }
          }
        }}
        sx={{
          maxWidth: { sm: 240 },
          textTransform: "capitalize"
        }}
      >
        {optionStatus.map(option => (
          <MenuItem
            key={option}
            value={option}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: "body2",
              textTransform: "capitalize"
            }}
          >
            {option}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        fullWidth
        value={filterName}
        onChange={event => onFilterName(event.target.value)}
        placeholder="Search request by name..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify
                icon={"eva:search-fill"}
                sx={{ color: "text.disabled", width: 20, height: 20 }}
              />
            </InputAdornment>
          )
        }}
      />
    </Stack>
  );
}
