/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SectionsQueryResponseDataItem } from './SectionsQueryResponseDataItem';

export type SectionsQueryResponseData = {
    items?: Array<SectionsQueryResponseDataItem>;
    limit?: number;
    offset?: number;
    page?: number;
    totalPages?: number;
    totalRows?: number;
};

