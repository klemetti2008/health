/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { VehiclesQueryResponseDataItem } from './VehiclesQueryResponseDataItem';

export type VehiclesQueryResponseData = {
    items?: Array<VehiclesQueryResponseDataItem>;
    limit?: number;
    offset?: number;
    page?: number;
    totalPages?: number;
    totalRows?: number;
};

