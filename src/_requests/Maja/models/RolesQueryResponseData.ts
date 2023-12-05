/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RolesQueryResponseDataItem } from './RolesQueryResponseDataItem';

export type RolesQueryResponseData = {
    items?: Array<RolesQueryResponseDataItem>;
    limit?: number;
    offset?: number;
    page?: number;
    totalPages?: number;
    totalRows?: number;
};

