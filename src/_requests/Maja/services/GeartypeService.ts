/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GearTypeFilterType } from '../models/GearTypeFilterType';
import type { GearTypesCreateRequestBody } from '../models/GearTypesCreateRequestBody';
import type { GearTypesCreateResponse } from '../models/GearTypesCreateResponse';
import type { GearTypesDeleteRequestBody } from '../models/GearTypesDeleteRequestBody';
import type { GearTypesQueryResponse } from '../models/GearTypesQueryResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class GeartypeService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create geartype
     * Create geartype
     * @param requestBody
     * @returns GearTypesCreateResponse Created
     * @throws ApiError
     */
    public geartypesCreateMutation(
        requestBody: GearTypesCreateRequestBody,
    ): CancelablePromise<GearTypesCreateResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/geartypes',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Query geartypes
     * @param id
     * @param page
     * @param limit
     * @param filters
     * @returns GearTypesQueryResponse OK
     * @throws ApiError
     */
    public geartypesQuery(
        id?: number,
        page?: number,
        limit?: number,
        filters?: GearTypeFilterType,
    ): CancelablePromise<GearTypesQueryResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/geartypes',
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

    /**
     * Delete geartype
     * Delete geartype
     * @param requestBody
     * @returns GearTypesCreateResponse Created
     * @throws ApiError
     */
    public geartypesDeleteMutation(
        requestBody: GearTypesDeleteRequestBody,
    ): CancelablePromise<GearTypesCreateResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/geartypes',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Update geartype
     * Update geartype
     * @param name
     * @param requestBody
     * @returns GearTypesCreateResponse Created
     * @throws ApiError
     */
    public geartypesNameUpdateMutation(
        name: string,
        requestBody: GearTypesCreateRequestBody,
    ): CancelablePromise<GearTypesCreateResponse> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/geartypes/{name}',
            path: {
                'name': name,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Query geartypes
     * @param limit
     * @param filters
     * @param id
     * @param page
     * @returns GearTypesQueryResponse OK
     * @throws ApiError
     */
    public geartypesCsvDownloadQuery(
        limit?: number,
        filters?: GearTypeFilterType,
        id?: number,
        page?: number,
    ): CancelablePromise<GearTypesQueryResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/geartypes/csv/download',
            query: {
                'limit': limit,
                'filters': filters,
                'id': id,
                'page': page,
            },
            errors: {
                400: `Bad Request`,
                404: `lorem ipsum dolor sit amet`,
                500: `Internal Server Error`,
            },
        });
    }

}
