import { useRef, useState } from "react";

import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";

import Iconify from "../../../components/Iconify";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import { useAlertDialog } from "../../../context/AlertDialogContext";

export default function RequestMoreMenu({ id }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const {
    setDialogOpen,
    setTitle,
    setContext,
    setConfirmText,
    setConfirmCallback
  } = useAlertDialog();

  const deleteWorkspaceHandler = () => {
    const delectCallback = () => {
      return () => console.log(`Deleting workspace ${id}`);
    };
    setIsOpen(false);
    setConfirmCallback(delectCallback);
    setTitle("Delete");
    setContext(`Are you sure you want to delete this workspace`);
    setConfirmText("Delete");
    setDialogOpen(true);
  };

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
          to={"/pa/workspace/" + id}
          sx={{ color: "text.secondary" }}
        >
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Edit Workspace"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
        <MenuItem
          component={Button}
          onClick={() => deleteWorkspaceHandler()}
          sx={{ color: "text.secondary" }}
        >
          <ListItemIcon>
            <Iconify icon="fluent:delete-48-filled" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Delete Workspace"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
      </Menu>
    </>
  );
}
