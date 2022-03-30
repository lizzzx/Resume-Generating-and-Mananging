import {
  Avatar,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  TextField,
  Typography,
  styled
} from "@mui/material";
import React, { useState } from "react";
import useAlert from "../hooks/useAlert";
import AlertMessage from "../components/AlertMessage";
import Page from "../components/Page";
import Iconify from "../components/Iconify";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const BackgroundPage = styled(Page)(({ theme }) => ({
  backgroundImage: `url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg)`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  backgroundSize: "100%",
  backgroundColor: "#f0f2f5",
  marginTop: theme.spacing(-10),
  minHeight: `calc(100vh - 70px)`
}));

const TypographyTitleStyle = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(10, 0, 3, 0),
  color: theme.palette.primary.dark,
  alignItems: "center"
}));

const Paper = styled("div")(({ theme }) => ({
  margin: theme.spacing(10, 0),
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
}));

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  background: theme.palette.primary.main
}));

const FormStyle = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(1)
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  background: theme.palette.primary.main
}));

export default function LoginPage() {
  const alert = useAlert();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [checked, setChecked] = useState(true);

  const navigate = useNavigate();

  const getIcon = name => <Iconify icon={name} width={22} height={22} />;

  const mockAccounts = {
    EEEmail: "ee123@ae.com",
    EEPassword: "aetest123",
    PAEmail: "pa123@ae.com",
    PAPassword: "aetest123",
    SAEmail: "sa123@ae.com",
    SAPassword: "aetest123"
  };

  const onSubmit = e => {
    e.preventDefault();

    // TODO: this is the temporary solution for midterm progress only.
    if (email === mockAccounts.EEEmail && password === mockAccounts.EEPassword) {
      alert.switchToSuccess("Login is successful.");
      setTimeout(function() {
        navigate("/ee/request");
      }, 500);
    } else if (
      email === mockAccounts.PAEmail &&
      password === mockAccounts.PAPassword
    ) {
      alert.switchToSuccess("Login is successful.");
      setTimeout(function() {
        navigate("/PA/workspace");
      }, 500);
    } else if (
      email === mockAccounts.SAEmail &&
      password === mockAccounts.SAPassword
    ) {
      alert.switchToSuccess("Login is successful.");
      setTimeout(function() {
        navigate("/SA/profile");
      }, 500);
    } else {
      alert.switchToFailure("Authentication Failed.");
    }
  };

  return (
    <BackgroundPage title="Login">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper>
          <TypographyTitleStyle component="h1" variant="h3">
            AE Resume Generator
          </TypographyTitleStyle>
          <AlertMessage alertStatus={alert} />
          <br />
          <AvatarStyle>{getIcon("eva:lock-fill")}</AvatarStyle>
          <Typography component="h1" variant="h6">
            Sign in
          </Typography>
          <FormStyle onSubmit={onSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Email"
              label="Email"
              name="Email"
              autoComplete="Email"
              value={email}
              InputLabelProps={{ style: { fontSize: 14 } }}
              size="small"
              onChange={e => {
                setEmail(e.target.value);
              }}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name=""
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={password}
              InputLabelProps={{ style: { fontSize: 14 } }}
              size="small"
              onChange={e => {
                setPassword(e.target.value);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <div style={{ marginTop: "3px" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    color="primary"
                    checked={checked}
                    onChange={() => {
                      setChecked(!checked);
                    }}
                  />
                }
                label={
                  <Typography component="h1" variant="body2">
                    Remember me
                  </Typography>
                }
                style={{
                  float: "left"
                }}
              />
              <Typography
                component="h1"
                variant="body2"
                style={{ float: "right", margin: "10px 0", color: "#0C53B7" }}
              >
                Forgot your password?
              </Typography>
            </div>
            <SubmitButton type="submit" fullWidth variant="contained">
              Sign In
            </SubmitButton>
          </FormStyle>
        </Paper>
      </Container>
    </BackgroundPage>
  );
}
