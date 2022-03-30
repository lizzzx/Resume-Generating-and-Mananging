import { useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";

import Iconify from "../../../components/Iconify";

import useSectorType from "../../../hooks/useSectorTypes";

export default function SectorTypeMenu({ id }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const { deleteSectorType } = useSectorType();

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: "100%" }
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          component={RouterLink}
          to={"/SA/sectorType/" + id}
          sx={{ color: "text.secondary" }}
        >
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Edit"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
        <MenuItem
          sx={{ color: "text.secondary" }}
          onClick={() => deleteSectorType({ id })}
        >
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Delete"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
      </Menu>
    </>
  );
}
