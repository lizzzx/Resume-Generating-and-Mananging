// @mui
import { Container } from "@mui/material";
import Page from "../../components/Page";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import { PATH_EE } from "../../paths";
import EESectorEditAddForm from "../../sections/@dashboard/eeWorkspace/EESectorEditAddForm";
import { useLocation, useParams } from "react-router-dom";
import sectors from "../../_mocks_/sector";
import { paramCase } from "change-case";

// ----------------------------------------------------------------------

export default function EESectorEditAdd() {
  const { pathname } = useLocation();
  const { sectorID } = useParams();
  const isEdit = pathname.includes("edit");
  const currentSector = sectors.find(
    sector => paramCase(sector.sectorID) === sectorID
  );
  return (
    <Page title="Workspace: Create a new sector">
      <Container maxWidth={"lg"}>
        <HeaderBreadcrumbs
          heading={!isEdit ? "Creat A New Sector" : "Edit Sector Name"}
          links={[
            { name: "Workspace", href: PATH_EE.workspace.list },
            { name: !isEdit ? "New Sector" : currentSector.sectorName }
          ]}
        />

        <EESectorEditAddForm isEdit={isEdit} currentSector={currentSector} />
      </Container>
    </Page>
  );
}
