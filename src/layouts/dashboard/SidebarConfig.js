import Iconify from "../../components/Iconify";

const getIcon = name => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = {
  "EE": [
    {
      title: "request",
      path: "/ee/request",
      icon: getIcon("eva:pie-chart-2-fill")
    },
    {
      title: "profile",
      path: "/ee/profile",
      icon: getIcon("eva:person-fill")
    },
    {
      title: "sector",
      path: "/ee/addSector",
      icon: getIcon("ion:create-sharp")
    },
    {
      title: "resume",
      path: "/ee/resume",
      icon: getIcon("majesticons:paper-fold-text-line")
    },
    {
      title: "workspace",
      path: "/ee/workspace",
      icon: getIcon("majesticons:paper-fold-text-line")
    }
  ],
  "PA": [
    {
      title: "workspace",
      path: "/pa/workspace",
      icon: getIcon("eva:pie-chart-2-fill")
    },
    {
      title: "Request",
      path: "/pa/eeRequest",
      icon: getIcon("zondicons:document-add")
    },
    {
      title: "profile",
      path: "/pa/profile",
      icon: getIcon("eva:person-fill")
    }
  ],
  "SA": [
    {
      title: "sector type",
      path: "/sa/sectorType",
      icon: getIcon("icon-park-outline:paragraph-round")
    },
    {
      title: "template",
      path: "/SA/template",
      icon: getIcon("mdi:format-list-text")
    },
    {
      title: "employee",
      path: "/SA/employee",
      icon: getIcon("fluent:people-community-24-filled")
    },
    {
      title: "division",
      path: "/SA/division",
      icon: getIcon("mdi:shape")
    },
    {
      title: "profile",
      path: "/sa/profile",
      icon: getIcon("eva:person-fill")
    }
  ]
};

export default sidebarConfig;
