import { Container } from "@mui/material";
import React from "react";
import Page from "../../components/Page";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import { useParams } from "react-router";
import PAWorkspaceDetailNewEditForm from "../../sections/@dashboard/paWorkspaceDetail/PAWorkspaceDetailNewEditForm";

export default function PAAddResume() {
  const { workspaceId } = useParams();

  return (
    <Page title="PA New Resume">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="New resume"
          links={[
            { name: "PA", href: "/pa" },
            { name: "Workspace", href: "/pa/workspace" },
            { name: `${workspaceId}`, href: `/pa/workspace/${workspaceId}` },
            { name: "New Resume" }
          ]}
        />

        <PAWorkspaceDetailNewEditForm workspaceID={workspaceId} />
      </Container>
    </Page>
  );
}
