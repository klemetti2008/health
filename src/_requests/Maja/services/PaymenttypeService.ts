/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaymentTypeFilterType } from '../models/PaymentTypeFilterType';
import type { PaymentTypesQueryResponse } from '../models/PaymentTypesQueryResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class PaymenttypeService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Query Payment Types
     * @param id
     * @param page
     * @param limit
     * @param filters
     * @returns PaymentTypesQueryResponse OK
     * @throws ApiError
     */
    public paymenttypesQuery(
        id?: number,
        page?: number,
        limit?: number,
        filters?: PaymentTypeFilterType,
    ): CancelablePromise<PaymentTypesQueryResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/paymenttypes',
            query: {
                'id': id,
                'page': page,
                'limit': limit,
                'filters': filters,
            },
            errors: {
                400: `Bad Request`,
                404: `lorem ipsum dolor sit amet`,
                500: `Internal Server Error`,
            },
        });
    }

}
