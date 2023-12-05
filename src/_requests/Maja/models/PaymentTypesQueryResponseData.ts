/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PaymentTypesQueryResponseDataItem } from './PaymentTypesQueryResponseDataItem';

export type PaymentTypesQueryResponseData = {
    items?: Array<PaymentTypesQueryResponseDataItem>;
    limit?: number;
    offset?: number;
    page?: number;
    totalPages?: number;
    totalRows?: number;
};

