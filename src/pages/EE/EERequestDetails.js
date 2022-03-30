import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import Page from "../../components/Page";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import requests from "../../_mocks_/request";
import { PATH_EE } from "../../paths";
import Request from "../../sections/@dashboard/eeRequest/details";

// ----------------------------------------------------------------------

export default function EERequestDetails() {
  const { requestID } = useParams();

  const request = requests.find(request => request.requestID === requestID);

  return (
    <Page title="EE Request: Details">
      <Container maxWidth={"lg"}>
        <HeaderBreadcrumbs
          heading="Request Details"
          links={[
            { name: "Requests", href: PATH_EE.request.list },
            { name: request?.requestName || "" }
          ]}
        />
        <Request request={request} />
      </Container>
    </Page>
  );
}
