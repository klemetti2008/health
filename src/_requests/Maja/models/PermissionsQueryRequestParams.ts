/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PermissionFilterType } from './PermissionFilterType';

export type PermissionsQueryRequestParams = {
    filters?: PermissionFilterType;
    id?: number;
    limit?: number;
    notOwnerNurseId?: number;
    nurseId?: number;
    page?: number;
};

