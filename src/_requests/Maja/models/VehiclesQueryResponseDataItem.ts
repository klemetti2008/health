/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { VehiclesQueryResponseDataItemCompany } from './VehiclesQueryResponseDataItemCompany';
import type { VehiclesQueryResponseDataItemUser } from './VehiclesQueryResponseDataItemUser';
import type { VehiclesQueryResponseDataItemVehicleType } from './VehiclesQueryResponseDataItemVehicleType';

export type VehiclesQueryResponseDataItem = {
    brand?: string;
    company?: VehiclesQueryResponseDataItemCompany;
    createdAt?: string;
    deletedAt?: string;
    fuelType?: string;
    id?: number;
    model?: string;
    owner?: number;
    ownerType?: string;
    updatedAt?: string;
    user?: VehiclesQueryResponseDataItemUser;
    variant?: string;
    vehicleNo?: string;
    vehicleType?: VehiclesQueryResponseDataItemVehicleType;
    year?: number;
};

