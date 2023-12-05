/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { NurseTypesQueryResponseDataItem } from './NurseTypesQueryResponseDataItem';

export type NurseTypesQueryResponseData = {
    items?: Array<NurseTypesQueryResponseDataItem>;
    limit?: number;
    offset?: number;
    page?: number;
    totalPages?: number;
    totalRows?: number;
};

