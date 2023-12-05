/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DiagnoseFilterType } from './DiagnoseFilterType';

export type DiagnosesQueryRequestParams = {
    filters?: DiagnoseFilterType;
    id?: number;
    limit?: number;
    page?: number;
};

