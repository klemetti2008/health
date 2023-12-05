// ----------------------------------------------------------------------

import {CreateNurseSteps} from "src/sections/nurse/NurseNewFormSteps/steps";

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_APP = '/';
const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  requestResetPassword: path(ROOTS_AUTH, '/request-reset-password'),
  privacyPolicy: path(ROOTS_AUTH, '/privacy-policy'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  page403: '/403',
  page404: '/404',
  page500: '/500',
};

export const PATH_APP = {
  root: ROOTS_APP,
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
  cycle: {
    root: path(ROOTS_DASHBOARD, '/cycle'),
    new: path(ROOTS_DASHBOARD, '/cycle/new'),
    list: path(ROOTS_DASHBOARD, '/cycle/list'),
    last: path(ROOTS_DASHBOARD, '/cycle/cycle-09-3-14_3-25'),
    oneBeforeLast: path(ROOTS_DASHBOARD, '/cycle/cycle-08-2-21_3-12'),
  },
  report: {
    root: path(ROOTS_DASHBOARD, '/report'),
    list: path(ROOTS_DASHBOARD, '/report/list'),
    group: {
      root: path(ROOTS_DASHBOARD, '/report/group'),
      new: path(ROOTS_DASHBOARD, '/report/groups/new'),
      list: path(ROOTS_DASHBOARD, '/report/groups/list'),
    },
    view: (name: string) => path(ROOTS_DASHBOARD, `/report/${name}`),
  },
  nurse: {
    root: path(ROOTS_DASHBOARD, '/nurse'),
    new: path(ROOTS_DASHBOARD, `/nurse/new/?step=${CreateNurseSteps[0].path}`),
    list: path(ROOTS_DASHBOARD, '/nurse/list'),
    view: (name: string) => path(ROOTS_DASHBOARD, `/nurse/${name}`),
    edit: (step: string, userId?: string, nurseId?: string) => path(ROOTS_DASHBOARD, `/nurse/new/?step=${step}&userId=${userId || ""}&nurseId=${nurseId || ""}`),
    profile: (name: string) => path(ROOTS_DASHBOARD, `/nurse/${name}/profile`),
  },
  patient: {
    root: path(ROOTS_DASHBOARD, '/patient'),
    new: path(ROOTS_DASHBOARD, '/patient/new'),
    list: path(ROOTS_DASHBOARD, '/patient/list'),
    view: (name: string) => path(ROOTS_DASHBOARD, `/patient/${name}`),
    profile: (name: string) => path(ROOTS_DASHBOARD, `/patient/${name}/profile`),
  },
  section: {
    root: path(ROOTS_DASHBOARD, '/section'),
    new: path(ROOTS_DASHBOARD, '/section/new'),
    list: path(ROOTS_DASHBOARD, '/section/list'),
    view: (name: string) => path(ROOTS_DASHBOARD, `/section/${name}`),
  },
  group: {
    root: path(ROOTS_DASHBOARD, '/group'),
    new: path(ROOTS_DASHBOARD, '/group/new'),
    list: path(ROOTS_DASHBOARD, '/group/list'),
    view: (name: string) => path(ROOTS_DASHBOARD, `/group/${name}`),
  },
  diagnose: {
    root: path(ROOTS_DASHBOARD, '/diagnose'),
    new: path(ROOTS_DASHBOARD, '/diagnose/new'),
    list: path(ROOTS_DASHBOARD, '/diagnose/list'),
    view: (name: string) => path(ROOTS_DASHBOARD, `/diagnose/${name}`),
  },
  medicine: {
    root: path(ROOTS_DASHBOARD, '/medicine'),
    new: path(ROOTS_DASHBOARD, '/medicine/new'),
    list: path(ROOTS_DASHBOARD, '/medicine/list'),
    view: (name: string) => path(ROOTS_DASHBOARD, `/medicine/${name}`),
  },
  vehicle: {
    root: path(ROOTS_DASHBOARD, '/vehicle'),
    new: path(ROOTS_DASHBOARD, '/vehicle/new'),
    list: path(ROOTS_DASHBOARD, '/vehicle/list'),
    view: (name: string) => path(ROOTS_DASHBOARD, `/vehicle/${name}`),
  },
  ticket: {
    root: path(ROOTS_DASHBOARD, '/ticket'),
    new: path(ROOTS_DASHBOARD, '/ticket/new'),
    list: path(ROOTS_DASHBOARD, '/ticket/list'),
    view: (name: string) => path(ROOTS_DASHBOARD, `/ticket/${name}`),
  },
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    setting: path(ROOTS_DASHBOARD, '/user/setting'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    account: path(ROOTS_DASHBOARD, '/user/account'),
    edit: (name: string) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
  },
  setting: {
    root: path(ROOTS_DASHBOARD, '/setting'),
  }
};

export const PATH_FIGMA_PREVIEW =
  'https://www.figma.com/file/rWMDOkMZYw2VpTdNuBBCvN/%5BPreview%5D-Minimal-Web.26.11.22?node-id=0%3A1&t=ya2mDFiuhTXXLLF1-1';
