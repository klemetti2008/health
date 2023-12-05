/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NurseTypeFilterType } from '../models/NurseTypeFilterType';
import type { NurseTypesQueryResponse } from '../models/NurseTypesQueryResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class NursetypeService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Query nursetypes
     * @param page
     * @param limit
     * @param filters
     * @param id
     * @returns NurseTypesQueryResponse OK
     * @throws ApiError
     */
    public nursetypesQuery(
        page?: number,
        limit?: number,
        filters?: NurseTypeFilterType,
        id?: number,
    ): CancelablePromise<NurseTypesQueryResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/nursetypes',
            query: {
                'page': page,
                'limit': limit,
                'filters': filters,
                'id': id,
            },
            errors: {
                400: `Bad Request`,
                404: `lorem ipsum dolor sit amet`,
                500: `Internal Server Error`,
            },
        });
    }

}
