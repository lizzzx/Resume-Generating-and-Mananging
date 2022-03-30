import { useLocation } from "react-router-dom";
import { Container } from "@mui/material";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import Page from "../../components/Page";
import PARequestNewEditForm from "../../sections/@dashboard/paRequest/PARequestNewEditForm";

export default function PARequestCreate() {
  const { pathname } = useLocation();
  const isEdit = pathname.includes("edit");

  return (
    <Page title="Request: Create a new resume request">
      <Container maxWidth={"lg"}>
        <HeaderBreadcrumbs
          heading="Request"
          links={[
            { name: "PA", href: "/pa" },
            { name: "Request", href: "/pa/eeRequest" },
            { name: "addRequest" }
          ]}
        />

        <PARequestNewEditForm isEdit={isEdit} />
      </Container>
    </Page>
  );
}
