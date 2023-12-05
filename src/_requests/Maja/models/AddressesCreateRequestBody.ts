/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AddressesCreateRequestBodyCity } from './AddressesCreateRequestBodyCity';
import type { AddressesCreateRequestBodyStreet } from './AddressesCreateRequestBodyStreet';

export type AddressesCreateRequestBody = {
    buildingNumber?: string;
    city?: AddressesCreateRequestBodyCity;
    name?: string;
    nurseId?: number;
    postalCode?: string;
    street?: AddressesCreateRequestBodyStreet;
};

