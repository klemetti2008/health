/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { VehicleTypesQueryResponseDataItem } from './VehicleTypesQueryResponseDataItem';

export type VehicleTypesQueryResponseData = {
    items?: Array<VehicleTypesQueryResponseDataItem>;
    limit?: number;
    offset?: number;
    page?: number;
    totalPages?: number;
    totalRows?: number;
};

