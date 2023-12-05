/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DiagnosesQueryResponseDataItem } from './DiagnosesQueryResponseDataItem';

export type DiagnosesQueryResponseData = {
    items?: Array<DiagnosesQueryResponseDataItem>;
    limit?: number;
    offset?: number;
    page?: number;
    totalPages?: number;
    totalRows?: number;
};

