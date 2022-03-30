import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import Page from "../../components/Page";
import PAViewSectorOnlyForm from "../../sections/@dashboard/paWorkspaceDetail/PAViewSectorOnlyForm";

export default function PAViewSectorOnly() {
  const { workspaceId, resumeId, sectorId } = useParams();

  return (
    <Page title="PA Resume: View Sector">
      <Container maxWidth={"lg"}>
        <HeaderBreadcrumbs
          heading="View Sector"
          links={[
            { name: "PA", href: "/pa" },
            { name: "Workspace", href: "/pa/workspace" },
            { name: `${workspaceId}`, href: `/pa/workspace/${workspaceId}` },
            { name: `${resumeId}`, href: `/pa/workspace/${resumeId}` },
            { name: `${sectorId}` }
          ]}
        />

        <PAViewSectorOnlyForm workspaceId={workspaceId} resumeId={resumeId} />
      </Container>
    </Page>
  );
}
