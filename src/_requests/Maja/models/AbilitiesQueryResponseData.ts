/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AbilitiesQueryResponseDataItem } from './AbilitiesQueryResponseDataItem';

export type AbilitiesQueryResponseData = {
    items?: Array<AbilitiesQueryResponseDataItem>;
    limit?: number;
    offset?: number;
    page?: number;
    totalPages?: number;
    totalRows?: number;
};

