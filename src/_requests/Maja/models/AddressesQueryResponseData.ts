/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AddressesQueryResponseDataItem } from './AddressesQueryResponseDataItem';

export type AddressesQueryResponseData = {
    items?: Array<AddressesQueryResponseDataItem>;
    limit?: number;
    offset?: number;
    page?: number;
    totalPages?: number;
    totalRows?: number;
};

