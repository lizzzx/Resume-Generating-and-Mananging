import PropTypes from "prop-types";
import { Stack, InputAdornment, TextField, MenuItem } from "@mui/material";
import Iconify from "../../../components/Iconify";

EmployeeTableToolbar.propTypes = {
  filterContent: PropTypes.string,
  filter: PropTypes.string,
  onFilterContent: PropTypes.func,
  onFilter: PropTypes.func,
  filterOption: PropTypes.arrayOf(PropTypes.string)
};

export default function EmployeeTableToolbar({
  filterContent,
  filter,
  onFilterContent,
  onFilter,
  filterOption
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
        label="Filter"
        value={filter}
        onChange={onFilter}
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
        {filterOption.map(option => (
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
        value={filterContent}
        onChange={event => onFilterContent(event.target.value)}
        placeholder="Search..."
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
