/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { NursesQueryAbsencesFilterType } from './NursesQueryAbsencesFilterType';
import type { NursesQueryAbsencesSortType } from './NursesQueryAbsencesSortType';

export type NursesQueryAbsencesRequestParams = {
    filters?: NursesQueryAbsencesFilterType;
    id?: number;
    limit?: number;
    nurseId: number;
    page?: number;
    sorts?: NursesQueryAbsencesSortType;
};

