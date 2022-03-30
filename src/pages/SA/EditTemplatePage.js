import {
  Container,
  CssBaseline,
  Typography,
  styled,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  List,
  ListItem,
  FormGroup,
  FormControlLabel,
  Switch,
  ListItemText,
  Menu,
  MenuItem,
  ListItemIcon
} from "@mui/material";
import { useRef, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import Iconify from "../../components/Iconify";

import { Card, Stack, Box, Button, IconButton } from "@mui/material";

import useTemplate from "../../hooks/useTemplate";
import useSectorTypeAttributes from "../../hooks/useSectorTypeAttributes";
import Page from "../../components/Page";
import Scrollbar from "../../components/Scrollbar";
//import Iconify from "../components/Iconify";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ExpandMore = styled(props => {
  const { ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest
  })
}));

const Paper = styled("div")(({ theme }) => ({
  margin: theme.spacing(10, 0),
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start"
}));

export default function EditTemplatePage() {
  let { tid } = useParams();

  const { getTemplateSectorTypes, deleteTemplateSectorType } = useTemplate(tid);

  const [templateSectorTypes, setTemplateSectorTypes] = useState(
    getTemplateSectorTypes()
  );
  const handleDeleteRow = id => {
    const newTemplate = templateSectorTypes.filter(row => row.id !== id);
    setTemplateSectorTypes(newTemplate);
    deleteTemplateSectorType(tid, id);
  };

  return (
    <Page title="Edit Template">
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Paper>
          <Stack
            direction="row"
            alignItems="left"
            justifyContent="space-between"
            mb={5}
          >
            <Typography variant="h4">Edit Template</Typography>
            <Box sx={{ flexShrink: 0 }}>
              <Button
                variant="contained"
                component={RouterLink}
                to={"/sa/template/" + tid + "/add"}
                startIcon={<Iconify icon={"eva:plus-fill"} />}
              >
                New Sector Type to Template
              </Button>
            </Box>
          </Stack>
          <Scrollbar>
            {templateSectorTypes.map(sectorType => {
              return (
                <Card key={sectorType.id} sx={{ m: 2 }}>
                  <CardHeader
                    action={
                      <DeleteTemplateSectorTypeMenu
                        id={sectorType.id}
                        handleDeleteRow={handleDeleteRow}
                      />
                    }
                    title={sectorType.name}
                  />
                  <CollapseAttributesList id={sectorType.id} />
                </Card>
              );
            })}
          </Scrollbar>
        </Paper>
      </Container>
    </Page>
  );
}

export function CollapseAttributesList({ id }) {
  const { attributes } = useSectorTypeAttributes(id);
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <CardActions>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ pt: 0, pb: 0 }}>
          <List
            sx={{
              width: "100%",
              maxHeight: 400,
              bgcolor: "background.paper"
            }}
            style={{ overflow: "auto" }}
            disablePadding
          >
            {attributes.map(attribute => {
              const labelId = `${attribute.id}`;

              return (
                <ListItem
                  key={attribute.id}
                  secondaryAction={
                    <FormGroup>
                      <FormControlLabel
                        control={<Switch checked={attribute.required} />}
                        label="Required"
                      />
                    </FormGroup>
                  }
                >
                  <ListItemText id={labelId} primary={attribute.name} />
                </ListItem>
              );
            })}
          </List>
        </CardContent>
      </Collapse>
    </>
  );
}

export function DeleteTemplateSectorTypeMenu({ id, handleDeleteRow }) {
  const ref = useRef(null);

  const [open, setOpen] = useState(false);

  const handleOpenMenu = () => {
    setOpen(true);
  };

  const handleCloseMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton ref={ref} onClick={handleOpenMenu} aria-label="settings">
        <MoreVertIcon />
      </IconButton>
      <Menu
        open={open}
        onClose={handleCloseMenu}
        anchorEl={ref.current}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          onClick={() => {
            handleDeleteRow(id);
            handleCloseMenu();
          }}
          sx={{ color: "error.main" }}
        >
          <ListItemIcon>
            <Iconify icon={"eva:trash-2-outline"} />
          </ListItemIcon>
          <ListItemText>Remove</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
