/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { NursesQueryPermissionsFilterType } from './NursesQueryPermissionsFilterType';
import type { NursesQueryPermissionsSortType } from './NursesQueryPermissionsSortType';

export type NursesQueryPermissionsRequestParams = {
    filters?: NursesQueryPermissionsFilterType;
    id?: number;
    limit?: number;
    nurseId: number;
    page?: number;
    sorts?: NursesQueryPermissionsSortType;
};

