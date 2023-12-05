/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FilterValueInt } from './FilterValueInt';
import type { FilterValueString } from './FilterValueString';

export type NurseFilterType = {
    abilities?: FilterValueString;
    createdAt?: FilterValueString;
    grace?: FilterValueString;
    progress?: FilterValueString;
    team?: FilterValueString;
    'user.firstName'?: FilterValueString;
    'user.lastName'?: FilterValueString;
    'user.phone'?: FilterValueString;
    'user.role'?: FilterValueString;
    userId?: FilterValueInt;
    warning?: FilterValueString;
};

