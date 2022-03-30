import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  styled,
  TextField
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlertDialog } from "../context/AlertDialogContext";

const Paper = styled("div")(({ theme }) => ({
  margin: theme.spacing(10, 0),
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
}));

const FormStyle = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(1)
}));

const OutlinedTextField = styled(TextField)(() => ({
  "& > div": {
    paddingRight: 0
  }
}));

const SendButton = styled(Button)(({ theme }) => ({
  width: 100,
  margin: -theme.spacing(2, 0),
  background: theme.palette.primary.main
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  background: theme.palette.primary.main
}));

const resendTime = 5;
let pattern = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/g;

export default function Recovery() {
  const { setDialogOpen, setTitle, setContext } = useAlertDialog();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [second, setSecond] = useState(resendTime);
  const [pwd, setPwd] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [code, setCode] = useState("");

  useEffect(() => {
    if (sent) {
      if (second > 0) {
        setTimeout(() => {
          console.log(second, second - 1);
          setSecond(second - 1);
        }, 1000);
      } else {
        setSent(false);
        setSecond(resendTime);
      }
    }
  }, [sent, second]);

  const onSend = () => {
    if (email === "") {
      setDialogOpen(true);
      setTitle("Error");
      setContext("Please input your email");
      return;
    }
    if (!pattern.test(email)) {
      setDialogOpen(true);
      setTitle("Error");
      setContext("Please input valid email");
      return;
    }
    // TODO: Send code request
    setSent(true);
  };

  const onSubmit = () => {
    if (!pattern.test(email)) {
      setDialogOpen(true);
      setTitle("Error");
      setContext("Please input valid email");
      return;
    }
    // TODO: Submit request
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper>
        <FormStyle onSubmit={onSubmit}>
          <Stack>
            <OutlinedTextField
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
              InputProps={{
                endAdornment: (
                  <SendButton variant="contained" onClick={onSend} disabled={sent}>
                    {sent ? second : "Send"}
                  </SendButton>
                )
              }}
            />
          </Stack>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name=""
            label="Verification Code"
            id="code"
            value={code}
            InputLabelProps={{ style: { fontSize: 14 } }}
            size="small"
            onChange={e => {
              setCode(e.target.value);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name=""
            label="New Password"
            type={showPwd ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={pwd}
            InputLabelProps={{ style: { fontSize: 14 } }}
            size="small"
            onChange={e => {
              setPwd(e.target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPwd(!showPwd)}
                  >
                    {showPwd ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <SubmitButton type="submit" fullWidth variant="contained">
            Sign In
          </SubmitButton>
        </FormStyle>
      </Paper>
    </Container>
  );
}
