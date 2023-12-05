/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PermissionsQueryResponseDataItem } from './PermissionsQueryResponseDataItem';

export type PermissionsQueryResponseData = {
    items?: Array<PermissionsQueryResponseDataItem>;
    limit?: number;
    offset?: number;
    page?: number;
    totalPages?: number;
    totalRows?: number;
};

