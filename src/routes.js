import { Navigate, useRoutes } from "react-router-dom";

import DashboardLayout from "./layouts/dashboard";
import LoginOnlyLayout from "./layouts/LoginOnlyLayout";

import Login from "./pages/Login";
import PAWorkspace from "./pages/PA/PAWorkspace";
import PAAddWorkspace from "./pages/PA/AddWorkspace";
import PAWorkspaceDetail from "./pages/PA/PAWorkspaceDetail";
import EERequest from "./pages/EERequest";
import NotFound from "./pages/Page404";
import ProfilePage from "./pages/Profile";
import SectorPage from "./pages/SectorPage";
import EducationPage from "./pages/EducationPage";
import Resume from "./pages/Resume";
import SectorTypes from "./pages/SA/SASectorType";
import SectorType from "./pages/SA/SectorTypePage";
import AddSectorType from "./pages/SA/AddSectorTypePage";
import PARequest from "./pages/PA/PARequest";
import PAAddRequest from "./pages/PA/PARequestCreate";
import EmployeePage from "./pages/SA/EmployeePage";
import AssignRolePage from "./pages/SA/AssignRolePage";
import SATemplatePage from "./pages/SA/SATemplatePage";
import EditTemplatePage from "./pages/SA/EditTemplatePage";
import TemplateAddSectorType from "./pages/SA/TemplateAddSectorType";
import AddTemplatePage from "./pages/SA/AddTemplatePage";
import SADivisionPage from "./pages/SA/SADivisionPage";
import PAAddResume from "./pages/PA/PAAddResume";
import PAEditResume from "./pages/PA/PAEditResume";
import PAAddExistingResume from "./pages/PA/PAAddExistingResume";
import EERequestDetails from "./pages/EE/EERequestDetails";
import EEWorkspace from "./pages/EE/EEWorkspace";
import EESectorEditAdd from "./pages/EE/EESectorEditAdd";
import DuplicatedSectorEdit from "./pages/EE/DuplicatedSectorEdit";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <LoginOnlyLayout title="Associate Engineering" />,
      children: [
        { path: "/", element: <Navigate to="/login" /> },
        { path: "login", element: <Login /> },
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" /> }
      ]
    },
    {
      path: "/pa",
      element: <DashboardLayout userType="PA" />,
      children: [
        { path: "/pa", element: <Navigate to="/pa/workspace" /> },
        { path: "workspace", element: <PAWorkspace /> },
        { path: "workspace/:workspaceId", element: <PAWorkspaceDetail /> },
        { path: "workspace/add", element: <PAAddWorkspace /> },
        { path: "profile", element: <ProfilePage /> },
        { path: "request", element: <PARequest /> },
        { path: "eeRequest/add", element: <PAAddRequest /> },
        { path: "workspace/:workspaceId/resume/add", element: <PAAddResume /> },
        {
          path: "workspace/:workspaceId/resume/addFromExisting",
          element: <PAAddExistingResume />
        },
        {
          path: "workspace/:workspaceId/resume/:resumeId",
          element: <PAEditResume />
        }
      ]
    },
    {
      path: "/ee",
      element: <DashboardLayout userType="EE" />,
      children: [
        { path: "/ee", element: <Navigate to="/ee/request" /> },
        { path: "request", element: <EERequest /> },
        { path: "request/:requestID", element: <EERequestDetails /> },
        {
          path: "request/:requestID/:duplicatedSectorID/edit",
          element: <DuplicatedSectorEdit />
        },
        { path: "profile", element: <ProfilePage /> },
        { path: "resume", element: <Resume /> },
        { path: "workspace", element: <EEWorkspace /> },
        { path: "workspace/:sectorID", element: <NotFound /> },
        { path: "workspace/:sectorID/edit", element: <EESectorEditAdd /> },
        { path: "workspace/add", element: <EESectorEditAdd /> },
        { path: "addEducation", element: <EducationPage /> },
        { path: "addSector", element: <SectorPage /> }
      ]
    },
    {
      path: "/sa",
      element: <DashboardLayout userType="SA" />,
      children: [
        { path: "/sa", element: <Navigate to="/sa/profile" /> },
        { path: "profile", element: <ProfilePage /> },
        { path: "sectorType", element: <SectorTypes /> },
        { path: "sectorType/add", element: <AddSectorType /> },
        { path: "sectorType/:stid", element: <SectorType /> },
        { path: "employee", element: <EmployeePage /> },
        { path: "employee/:id", element: <AssignRolePage /> },
        { path: "template", element: <SATemplatePage /> },
        { path: "template/:tid", element: <EditTemplatePage /> },
        { path: "template/add", element: <AddTemplatePage /> },
        { path: "template/:tid/add", element: <TemplateAddSectorType /> },
        { path: "division", element: <SADivisionPage /> }
      ]
    },
    { path: "*", element: <Navigate to="/404" replace /> }
  ]);
}
