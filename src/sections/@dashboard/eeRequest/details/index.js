import PropTypes from "prop-types";
import EERequestDetails from "../../../../pages/EE/EERequestDetails";
import { Grid, Typography } from "@mui/material";
import Resume from "../../../../pages/Resume";
// import useAuth from "../../../../hooks/useAuth";

EERequestDetails.propTypes = {
  request: PropTypes.object.isRequired
};

// TODO: this should be derived from the request template
// const SECTOR_TYPES = [
//   'Role',
//   'Summary',
//   'Justification',
//   'Education',
//   'Projects',
// ];

export default function RequestDetails({ request }) {
  if (!request) {
    return null;
  }
  const {
    // id,
    requestName,
    // requester,
    // modifiedDate,
    // status,
    requestID
  } = request;

  // const { user } = useAuth();

  // const userAbout = {
  //   displayName: user?.displayName || '',
  //   email: user?.email || '',
  //   photoURL: user?.photoURL || '',
  //   phoneNumber: user?.phoneNumber || '',
  // };

  return (
    <>
      <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
        <Typography paragraph variant="overline" sx={{ color: "red" }}>
          Messages From Project Admin:
        </Typography>
        <Typography variant="body2">{requestName}</Typography>
      </Grid>
      <Resume requestID={requestID}></Resume>
    </>
  );
}
