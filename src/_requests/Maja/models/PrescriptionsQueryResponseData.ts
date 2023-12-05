/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PrescriptionsQueryResponseDataItem } from './PrescriptionsQueryResponseDataItem';

export type PrescriptionsQueryResponseData = {
    items?: Array<PrescriptionsQueryResponseDataItem>;
    limit?: number;
    offset?: number;
    page?: number;
    totalPages?: number;
    totalRows?: number;
};

