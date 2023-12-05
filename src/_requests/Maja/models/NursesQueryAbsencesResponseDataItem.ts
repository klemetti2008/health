/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { NursesQueryResponseDataItem } from './NursesQueryResponseDataItem';

export type NursesQueryAbsencesResponseDataItem = {
    end_date?: string;
    id?: number;
    nurse?: NursesQueryResponseDataItem;
    nurseId?: number;
    reason?: string;
    start_date?: string;
};

