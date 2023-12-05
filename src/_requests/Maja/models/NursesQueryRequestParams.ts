/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { NurseFilterType } from './NurseFilterType';
import type { NurseSortType } from './NurseSortType';

export type NursesQueryRequestParams = {
    filters?: NurseFilterType;
    id?: number;
    limit?: number;
    page?: number;
    sorts?: NurseSortType;
    userId?: number;
};

