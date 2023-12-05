/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { VehicleFilterType } from './VehicleFilterType';

export type VehiclesQueryRequestParams = {
    filters?: VehicleFilterType;
    id?: number;
    limit?: number;
    page?: number;
};

