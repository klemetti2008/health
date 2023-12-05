/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { NursesQueryResponseDataItem } from './NursesQueryResponseDataItem';

export type NursesQueryResponseData = {
    items?: Array<NursesQueryResponseDataItem>;
    limit?: number;
    offset?: number;
    page?: number;
    totalPages?: number;
    totalRows?: number;
};

