/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ContractTypesQueryResponseDataItem } from './ContractTypesQueryResponseDataItem';

export type ContractTypesQueryResponseData = {
    items?: Array<ContractTypesQueryResponseDataItem>;
    limit?: number;
    offset?: number;
    page?: number;
    totalPages?: number;
    totalRows?: number;
};

