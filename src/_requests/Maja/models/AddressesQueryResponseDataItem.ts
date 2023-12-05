/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AddressesQueryResponseDataItemCity } from './AddressesQueryResponseDataItemCity';
import type { AddressesQueryResponseDataItemNurse } from './AddressesQueryResponseDataItemNurse';
import type { AddressesQueryResponseDataItemStreet } from './AddressesQueryResponseDataItemStreet';

export type AddressesQueryResponseDataItem = {
    buildingNumber?: string;
    city?: AddressesQueryResponseDataItemCity;
    created_at?: string;
    deleted_at?: any;
    id?: number;
    name?: string;
    nurse?: AddressesQueryResponseDataItemNurse;
    postalCode?: string;
    street?: AddressesQueryResponseDataItemStreet;
    updated_at?: string;
};

