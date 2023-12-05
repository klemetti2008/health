/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { NursesQueryPermissionsResponseDataItem } from './NursesQueryPermissionsResponseDataItem';

export type NursesQueryPermissionsResponseData = {
    items?: Array<NursesQueryPermissionsResponseDataItem>;
    limit?: number;
    offset?: number;
    page?: number;
    totalPages?: number;
    totalRows?: number;
};

