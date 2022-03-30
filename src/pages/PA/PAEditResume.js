import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import Page from "../../components/Page";
import PAEditResumeForm from "../../sections/@dashboard/paWorkspaceDetail/PAEditResumeForm";

export default function PAEditResume() {
  const { workspaceId, resumeId } = useParams();

  return (
    <Page title="PA Resume: Edit Resume">
      <Container maxWidth={"lg"}>
        <HeaderBreadcrumbs
          heading="Edit Resume"
          links={[
            { name: "PA", href: "/pa" },
            { name: "Workspace", href: "/pa/workspace" },
            { name: `${workspaceId}`, href: `/pa/workspace/${workspaceId}` },
            { name: `${resumeId}` }
          ]}
        />

        <PAEditResumeForm workspaceId={workspaceId} resumeId={resumeId} />
      </Container>
    </Page>
  );
}
