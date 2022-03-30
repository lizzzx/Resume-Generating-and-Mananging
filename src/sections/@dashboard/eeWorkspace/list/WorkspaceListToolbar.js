import PropTypes from "prop-types";
import { InputAdornment, TextField, Stack, MenuItem } from "@mui/material";

import Iconify from "../../../../components/Iconify";

// ----------------------------------------------------------------------

WorkspaceListToolbar.propTypes = {
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  filterType: PropTypes.string,
  onFilterType: PropTypes.func,
  optionType: PropTypes.arrayOf(PropTypes.string)
};

export default function WorkspaceListToolbar({
  filterName,
  onFilterName,
  filterType,
  onFilterType,
  optionType
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
        label="Type"
        value={filterType}
        onChange={onFilterType}
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
        {optionType.map(option => (
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
        placeholder="Search sector by name..."
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
