import {
  List,
  ListItem,
  Switch,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  FormGroup,
  FormControlLabel,
  Checkbox
} from "@mui/material";

import { useState } from "react";

export default function CheckboxList({ attributeList, checked, setChecked }) {
  const [required, setRequired] = useState([0, 1]);

  const handleCheckBoxUpdated = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleSwitchToggled = value => () => {
    const currentSwitchIndex = required.indexOf(value);
    const newRequired = [...required];

    if (currentSwitchIndex === -1) {
      newRequired.push(value);
    } else {
      newRequired.splice(currentSwitchIndex, 1);
    }

    setRequired(newRequired);
  };

  return (
    <List
      sx={{
        width: "100%",
        maxHeight: 400,
        bgcolor: "background.paper"
      }}
      style={{ overflow: "auto" }}
    >
      {attributeList.map(attribute => {
        const labelId = `${attribute.id}`;

        return (
          <ListItem
            key={attribute.id}
            secondaryAction={
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={required.indexOf(attribute.id) !== -1}
                      onChange={handleSwitchToggled(attribute.id)}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Required"
                />
              </FormGroup>
            }
            disablePadding
          >
            <ListItemButton
              role={undefined}
              onClick={handleCheckBoxUpdated(attribute.id)}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(attribute.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={attribute.name} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
