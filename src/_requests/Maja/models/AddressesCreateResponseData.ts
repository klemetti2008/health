/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AddressesCreateResponseDataItemCity } from './AddressesCreateResponseDataItemCity';
import type { AddressesCreateResponseDataItemNurse } from './AddressesCreateResponseDataItemNurse';
import type { AddressesCreateResponseDataItemStreet } from './AddressesCreateResponseDataItemStreet';

export type AddressesCreateResponseData = {
    buildingNumber?: string;
    city?: AddressesCreateResponseDataItemCity;
    created_at?: string;
    deleted_at?: any;
    id?: number;
    name?: string;
    nurse?: AddressesCreateResponseDataItemNurse;
    postalCode?: string;
    street?: AddressesCreateResponseDataItemStreet;
    updated_at?: string;
};

