/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CompaniesQueryResponseDataItem } from './CompaniesQueryResponseDataItem';

export type CompaniesQueryResponseData = {
    items?: Array<CompaniesQueryResponseDataItem>;
    limit?: number;
    offset?: number;
    page?: number;
    totalPages?: number;
    totalRows?: number;
};

