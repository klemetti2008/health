/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PrescriptionFilterType } from './PrescriptionFilterType';

export type PrescriptionsQueryRequestParams = {
    filters?: PrescriptionFilterType;
    id?: number;
    limit?: number;
    page?: number;
};

