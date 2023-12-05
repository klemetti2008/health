/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { StreetsQueryResponseDataItem } from './StreetsQueryResponseDataItem';

export type StreetsQueryResponseData = {
    items?: Array<StreetsQueryResponseDataItem>;
    limit?: number;
    offset?: number;
    page?: number;
    totalPages?: number;
    totalRows?: number;
};

