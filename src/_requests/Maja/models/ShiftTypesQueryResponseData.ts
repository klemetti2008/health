/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ShiftTypesQueryResponseDataItem } from './ShiftTypesQueryResponseDataItem';

export type ShiftTypesQueryResponseData = {
    items?: Array<ShiftTypesQueryResponseDataItem>;
    limit?: number;
    offset?: number;
    page?: number;
    totalPages?: number;
    totalRows?: number;
};

