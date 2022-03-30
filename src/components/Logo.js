import { Link as RouterLink } from "react-router-dom";

import { Box } from "@mui/material";

export default function Logo({ userType }) {
  return (
    <RouterLink to={`/${userType}`}>
      <Box
        component="img"
        src="/static/AE_logo.png"
        sx={{ width: 50, height: 50 }}
      />
    </RouterLink>
  );
}
