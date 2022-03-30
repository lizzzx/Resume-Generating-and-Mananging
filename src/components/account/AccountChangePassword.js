import * as Yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { Box, Card, CardHeader, Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";

export default function AccountChangePassword() {
  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Old Password is required"),
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New Password is required"),
    confirmNewPassword: Yup.string().oneOf(
      [Yup.ref("newPassword"), null],
      "Passwords must match"
    )
  });

  const defaultValues = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  };

  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting }
  } = methods;

  const onSubmit = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      reset();
      // eslint-disable-next-line no-empty
    } catch (error) {}
  };

  return (
    <form autoComplete="off" noValidate>
      <Card>
        <CardHeader subheader="Update password" title="Password" />
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="oldPassword"
                type="password"
                label="Old Password"
                size={"small"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="newPassword"
                type="password"
                label="New Password"
                size={"small"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="confirmNewPassword"
                type="password"
                label="Confirm New Password"
                size={"small"}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: 3,
            paddingBottom: 2
          }}
        >
          <LoadingButton
            onSubmit={handleSubmit(onSubmit)}
            variant="contained"
            loading={isSubmitting}
            alignItems="flex-end"
          >
            Save Changes
          </LoadingButton>
        </Box>
      </Card>
    </form>
  );
}
