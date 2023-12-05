/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GearTypesQueryResponseDataItem } from './GearTypesQueryResponseDataItem';

export type GearTypesQueryResponseData = {
    items?: Array<GearTypesQueryResponseDataItem>;
    limit?: number;
    offset?: number;
    page?: number;
    totalPages?: number;
    totalRows?: number;
};

