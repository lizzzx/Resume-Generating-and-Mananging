import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";

function sleep(delay = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export default function AsyncAutocomplete({
  optionList,
  width = "100%",
  setSelectedValue
}) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return null;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([...optionList]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, optionList]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);
  return (
    <Autocomplete
      id="asynchronous-demo"
      style={{ width: `${width}` }}
      size="small"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      getOptionLabel={option => option.value}
      options={options}
      loading={loading}
      onChange={(event, value) => {
        setSelectedValue(value.value);
      }}
      renderInput={params => (
        <TextField
          {...params}
          placeholder="Target Employee"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
        />
      )}
    />
  );
}
