// @mui
import { Container } from "@mui/material";
import Page from "../../components/Page";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import { PATH_EE } from "../../paths";
import { useLocation, useParams } from "react-router-dom";
import { paramCase } from "change-case";
import educations from "../../_mocks_/education";
import requests from "../../_mocks_/request";
import DuplicatedSectorEditForm from "../../sections/@dashboard/eeResume/DuplicatedSectorEditForm";

// ----------------------------------------------------------------------

export default function DuplicatedSectorEdit() {
  const { pathname } = useLocation();
  const { requestID, duplicatedSectorID } = useParams();
  const isEdit = pathname.includes("edit");
  const currentDuplicatedSector = educations.find(
    duplicatedSector =>
      paramCase(duplicatedSector.duplicatedSectorID) === duplicatedSectorID
  );
  const currentRequest = requests.find(
    request => paramCase(request.requestID) === requestID
  );
  return (
    <Page title="Request: Edit a duplicated sector">
      <Container maxWidth={"lg"}>
        <HeaderBreadcrumbs
          heading={!isEdit ? "Creat A New Sector" : "Edit Sector Name"}
          links={[
            { name: "Requests", href: PATH_EE.request.list },
            {
              name: currentRequest.requestName,
              href: PATH_EE.request.view(requestID)
            },
            {
              name: !isEdit
                ? "New Sector"
                : currentDuplicatedSector.duplicatedSectorName
            }
          ]}
        />

        <DuplicatedSectorEditForm
          isEdit={isEdit}
          currentDuplicatedSector={currentDuplicatedSector}
          requestID={requestID}
        />
      </Container>
    </Page>
  );
}
