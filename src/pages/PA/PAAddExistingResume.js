import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import Page from "../../components/Page";
import PAAddExistingResumeForm from "../../sections/@dashboard/paWorkspaceDetail/PAAddExistingResumeForm";

export default function PAAddExistingResume() {
  const { workspaceId } = useParams();

  return (
    <Page title="PA Resume: Add from Existing Resumes">
      <Container maxWidth={"lg"}>
        <HeaderBreadcrumbs
          heading="Add from Existing Resumes"
          links={[
            { name: "PA", href: "/pa" },
            { name: "Workspace", href: "/pa/workspace" },
            { name: `${workspaceId}`, href: `/pa/workspace/${workspaceId}` },
            { name: "Add from Existing Resume" }
          ]}
        />

        <PAAddExistingResumeForm workspaceId={workspaceId} />
      </Container>
    </Page>
  );
}
