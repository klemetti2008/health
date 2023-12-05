/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ContractTypeFilterType } from '../models/ContractTypeFilterType';
import type { ContractTypesQueryResponse } from '../models/ContractTypesQueryResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ContracttypeService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Query ContractTypes
     * @param id
     * @param page
     * @param limit
     * @param filters
     * @returns ContractTypesQueryResponse OK
     * @throws ApiError
     */
    public contractTypesQuery(
        id?: number,
        page?: number,
        limit?: number,
        filters?: ContractTypeFilterType,
    ): CancelablePromise<ContractTypesQueryResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/contract-types',
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
