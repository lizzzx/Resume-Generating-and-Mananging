// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/auth";
const ROOTS_EE = "/ee";
// const ROOTS_PA = '/pa';
// const ROOTS_SA = '/sa';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, "/login"),
  register: path(ROOTS_AUTH, "/register"),
  loginUnprotected: path(ROOTS_AUTH, "/login-unprotected"),
  registerUnprotected: path(ROOTS_AUTH, "/register-unprotected"),
  verify: path(ROOTS_AUTH, "/verify"),
  resetPassword: path(ROOTS_AUTH, "/reset-password")
};

export const PATH_PAGE = {
  comingSoon: "/coming-soon",
  maintenance: "/maintenance",
  pricing: "/pricing",
  payment: "/payment",
  about: "/about-us",
  contact: "/contact-us",
  faqs: "/faqs",
  page404: "/404",
  page500: "/500",
  components: "/components"
};

export const PATH_EE = {
  root: ROOTS_EE,
  request: {
    list: path(ROOTS_EE, "/request"),
    view: requestID => path(ROOTS_EE, `/request/${requestID}`),
    edit: requestID => path(ROOTS_EE, `/request/${requestID}/edit`),
    // new: (id, sectorType) => path(ROOTS_EE, `/request/${id}/${sectorType}/new`),
    editDuplicated: (requestID, duplicatedSectorID) =>
      path(ROOTS_EE, `/request/${requestID}/${duplicatedSectorID}/edit`)
  },
  workspace: {
    list: path(ROOTS_EE, "/workspace"),
    view: sectorID => path(ROOTS_EE, `/workspace/${sectorID}`),
    edit: sectorID => path(ROOTS_EE, `/workspace/${sectorID}/edit`),
    add: path(ROOTS_EE, `/workspace/add`)
  }
};
