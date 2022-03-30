import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Card, Grid, Stack, TextField, Typography } from "@mui/material";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import AsyncAutocomplete from "../../../components/AsyncAutocomplete";

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

export default function PARequestNewEditForm() {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const handleContentChange = value => {
    setContent(value);
  };

  const onCancel = () => {
    navigate("/pa/eeRequest");
  };

  const onSubmit = () => {
    // navigate("/pa/eeRequest");
  };

  return (
    <form>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <div>
                <LabelStyle>Request Name</LabelStyle>
                <TextField
                  name="name"
                  size="small"
                  fullWidth
                  placeholder="Resume Request Name"
                />
              </div>
              <div>
                <LabelStyle>Target Employee</LabelStyle>
                <AsyncAutocomplete optionList={employeeList} />
              </div>
              <div>
                <LabelStyle>Request Resume Template</LabelStyle>
                <AsyncAutocomplete optionList={templateList} />
              </div>
              <LabelStyle>Your Note</LabelStyle>
              <SimpleMDE
                value={content}
                onChange={handleContentChange}
                options={{
                  placeholder: "Please share any notes you want with this employee"
                }}
              />
              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                sx={{
                  "& > :not(style)": { marginLeft: 2 }
                }}
              >
                <Button variant="contained" color="error" onClick={() => onCancel()}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={() => onSubmit()}>
                  Send Request
                </Button>
              </Grid>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </form>
  );
}

const employeeList = [
  { value: "Zhe Li (zheli@ae.com)" },
  { value: "Zipeng Liang (zipengliang@ae.com)" },
  { value: "Kehong Liu (kehongliu@ae.com)" },
  { value: "Yennis Ye (yennisye@ae.com)" },
  { value: "Roy Zhong (royzhong@ae.com)" },
  { value: "Lisa Li (lisali@ae.com)" },
  { value: "Alex Ling (alexling@ae.com)" }
];

const templateList = [
  { value: "Resume Template 1" },
  { value: "Resume Template 2" },
  { value: "Resume Template 3" },
  { value: "Resume Template 4" },
  { value: "Resume Template 5" }
];
