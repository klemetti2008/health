/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CitiesQueryResponseDataItem } from './CitiesQueryResponseDataItem';

export type CitiesQueryResponseData = {
    items?: Array<CitiesQueryResponseDataItem>;
    limit?: number;
    offset?: number;
    page?: number;
    totalPages?: number;
    totalRows?: number;
};

