/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AddressFilterType } from './AddressFilterType';
import type { AddressSortType } from './AddressSortType';

export type AddressesQueryRequestParams = {
    filters?: AddressFilterType;
    id?: number;
    limit?: number;
    nurseId?: number;
    page?: number;
    sorts?: AddressSortType;
};

