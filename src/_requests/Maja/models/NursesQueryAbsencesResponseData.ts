/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { NursesQueryAbsencesResponseDataItem } from './NursesQueryAbsencesResponseDataItem';

export type NursesQueryAbsencesResponseData = {
    items?: Array<NursesQueryAbsencesResponseDataItem>;
    limit?: number;
    offset?: number;
    page?: number;
    totalPages?: number;
    totalRows?: number;
};

