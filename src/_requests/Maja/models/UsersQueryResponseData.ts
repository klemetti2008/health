/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UsersQueryResponseDataItem } from './UsersQueryResponseDataItem';

export type UsersQueryResponseData = {
    items?: Array<UsersQueryResponseDataItem>;
    limit?: number;
    offset?: number;
    page?: number;
    totalPages?: number;
    totalRows?: number;
};

