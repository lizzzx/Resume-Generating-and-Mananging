import {
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  styled,
  Grid,
  Card,
  CardContent,
  Stack,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Tooltip,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle
} from "@mui/material";

import useAlert from "../../hooks/useAlert";
import useSectorTypes from "../../hooks/useSectorTypes";
import useSectorTypeAttributes from "../../hooks/useSectorTypeAttributes";

import AlertMessage from "../../components/AlertMessage";
import { useParams, useNavigate } from "react-router-dom";
import Page from "../../components/Page";
import { useState } from "react";
import Iconify from "../../components/Iconify";
import { CheckboxList } from "../../sections/@dashboard/sectorType";

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2, 1),
  background: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: theme.palette.error.main
  }
}));

const CancelButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2, 1),
  background: theme.palette.error.main
}));

const FormContainer = styled("form")(({ theme }) => ({
  marginLeft: theme.spacing(0)
}));

export default function AddSectorType() {
  const alert = useAlert();
  const navigate = useNavigate();
  const { addSectorType } = useSectorTypes();
  const [name, setName] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [checkedAttributes, setCheckedAttributes] = useState([]);
  const [attributes, setAttributes] = useState([]);

  const handleSubmitClicked = e => {
    e.preventDefault();
    addSectorType(name, attributes);
    alert.switchToSuccess("New Sector Type Added");
  };

  const handleDeleteAttribute = () => {
    if (checkedAttributes.length > 0) {
      checkedAttributes.map(a => {
        attributes.filter(attr => attr.id !== a.id);
        //deleteAttribute(stid, a.id);
      });
      setAttributes(attributes);
      alert.switchToSuccess("Deleted successfully");
    }
  };

  const handleCancelClicked = () => {
    setTimeout(function() {
      navigate("/sa/sectorType");
    }, 500);
  };

  return (
    <Page title="Add Sector Type">
      <Container component="main">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4">Add Sector Type</Typography>
        </Stack>
        <CssBaseline />
        <FormContainer onSubmit={handleSubmitClicked}>
          <Grid container>
            <Grid item xs={12} lg={10}>
              <Grid item xs={12} lg={6}>
                <Card>
                  <CardContent>
                    <Grid container direction="row">
                      <Grid
                        item
                        xs={12}
                        container
                        alignItems="center"
                        sx={{ mt: 1 }}
                      >
                        <Grid item xs={12} justifyContent="center">
                          <Typography height="15px">Name</Typography>
                        </Grid>
                        <Grid item xs={12}></Grid>
                        <Grid item xs={12}>
                          <TextField
                            variant="outlined"
                            margin="normal"
                            sx={{ mb: 3 }}
                            required
                            fullWidth
                            id="name"
                            name="name"
                            autoFocus
                            size="small"
                            value={name}
                            onChange={e => {
                              setName(e.target.value);
                            }}
                          />
                        </Grid>
                        <Grid item container xs={12} alignItems="center">
                          <Grid item xs={4}>
                            <Typography height="20px">Attributes</Typography>
                          </Grid>
                          <Grid item xs={4}></Grid>
                          <Grid item xs={4} container justifyContent="flex-end">
                            <Tooltip title="Add">
                              <IconButton
                                onClick={() => {
                                  setAddDialogOpen(true);
                                }}
                              >
                                <Iconify icon="fluent:add-12-regular" />
                              </IconButton>
                            </Tooltip>
                            <AddAttributeDialog
                              dialogIsOpen={addDialogOpen}
                              handleDialogClose={() => {
                                setAddDialogOpen(false);
                              }}
                            />
                            <Tooltip title="Delete">
                              <IconButton onClick={handleDeleteAttribute}>
                                <Iconify icon="eva:trash-2-outline" />
                              </IconButton>
                            </Tooltip>
                          </Grid>
                        </Grid>
                        <Grid item container xs={12}>
                          <CheckboxList
                            attributeList={attributes}
                            checked={checkedAttributes}
                            setChecked={setCheckedAttributes}
                          />
                        </Grid>
                      </Grid>
                      <FormControl component="fieldset">
                        <AlertMessage alertStatus={alert} />
                      </FormControl>
                      <Grid item xs={12} container>
                        <Grid item xs={4}></Grid>
                        <Grid
                          item
                          xs={8}
                          spacing={1}
                          container
                          justifyContent="flex-end"
                        >
                          <CancelButton
                            variant="contained"
                            onClick={handleCancelClicked}
                          >
                            Cancel
                          </CancelButton>
                          <SubmitButton type="submit" variant="contained">
                            Submit
                          </SubmitButton>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={0} lg={6}></Grid>
            </Grid>
            <Grid item xs={0} lg={2}></Grid>
          </Grid>
        </FormContainer>
      </Container>
    </Page>
  );
}

export function AddAttributeDialog({ dialogIsOpen, handleDialogClose }) {
  const [name, setName] = useState("");
  const [required, setRequired] = useState(true);
  const [error, setError] = useState(false);
  let { stid } = useParams();
  const { addAttribute } = useSectorTypeAttributes({ stid });
  const SaveValuesAndLeave = () => {
    if (name === "") {
      setError(true);
    } else {
      addAttribute({ name });
      handleDialogClose();
    }
  };

  return (
    <Dialog open={dialogIsOpen} onClose={handleDialogClose}>
      <DialogTitle>Add an Attribute to Current Sector Type</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="normal"
          id="name"
          label="Attribute Name"
          fullWidth
          variant="outlined"
          size="small"
          value={name}
          onChange={e => {
            setName(e.target.value);
            setError(false);
          }}
          error={error}
          helperText={error ? "please enter a valid name" : ""}
          sx={{ mt: 1 }}
        />
        <FormGroup sx={{ mb: 0 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={required}
                onChange={e => {
                  setRequired(e.target.checked);
                }}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="Required"
          />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>Cancel</Button>
        <Button onClick={SaveValuesAndLeave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
