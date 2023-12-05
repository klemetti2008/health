/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ShiftTypeFilterType } from '../models/ShiftTypeFilterType';
import type { ShiftTypesQueryResponse } from '../models/ShiftTypesQueryResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ShifttypeService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Query ShiftTypes
     * @param id
     * @param page
     * @param limit
     * @param filters
     * @returns ShiftTypesQueryResponse OK
     * @throws ApiError
     */
    public shiftTypesQuery(
        id?: number,
        page?: number,
        limit?: number,
        filters?: ShiftTypeFilterType,
    ): CancelablePromise<ShiftTypesQueryResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/shift-types',
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
