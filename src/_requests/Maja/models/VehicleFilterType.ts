/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FilterValueInt } from './FilterValueInt';
import type { FilterValueString } from './FilterValueString';

export type VehicleFilterType = {
    VehicleType?: FilterValueString;
    brand?: FilterValueString;
    companyId?: FilterValueInt;
    createdAt?: FilterValueString;
    fuelType?: FilterValueString;
    model?: FilterValueString;
    userId?: FilterValueInt;
    variant?: FilterValueString;
    vehicleNo?: FilterValueString;
    year?: FilterValueString;
};

