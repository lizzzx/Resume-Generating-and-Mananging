import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import Page from "../../components/Page";
import PAEditSectorForm from "../../sections/@dashboard/paWorkspaceDetail/PAEditSectorForm";

export default function PAEditSector() {
  const { workspaceId, resumeId, sectorId } = useParams();

  return (
    <Page title="PA Resume: Edit Sector">
      <Container maxWidth={"lg"}>
        <HeaderBreadcrumbs
          heading="Edit Sector"
          links={[
            { name: "PA", href: "/pa" },
            { name: "Workspace", href: "/pa/workspace" },
            { name: `${workspaceId}`, href: `/pa/workspace/${workspaceId}` },
            { name: `${resumeId}`, href: `/pa/workspace/${resumeId}` },
            { name: `${sectorId}` }
          ]}
        />

        <PAEditSectorForm workspaceId={workspaceId} resumeId={resumeId} />
      </Container>
    </Page>
  );
}
