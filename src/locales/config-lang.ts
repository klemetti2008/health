// @mui
import { enUS, svSE, fiFI } from '@mui/material/locale';

// PLEASE REMOVE `LOCAL STORAGE` WHEN YOU CHANGE SETTINGS.
// ----------------------------------------------------------------------

export const allLangs = [
  {
    label: 'English',
    value: 'en',
    systemValue: enUS,
    icon: '/assets/icons/flags/ic_flag_en.svg',
  },
  {
    label: 'Finnish',
    value: 'fi',
    systemValue: fiFI,
    icon: '/assets/icons/flags/ic_flag_fi.svg',
  },
  {
    label: 'Swedish',
    value: 'sv',
    systemValue: svSE,
    icon: '/assets/icons/flags/ic_flag_sw.svg',
  },
];

export const defaultLang = allLangs[0]; // English
