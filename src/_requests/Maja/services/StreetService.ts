/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StreetFilterType } from '../models/StreetFilterType';
import type { StreetsCreateRequestBody } from '../models/StreetsCreateRequestBody';
import type { StreetsCreateResponse } from '../models/StreetsCreateResponse';
import type { StreetsDeleteRequestBody } from '../models/StreetsDeleteRequestBody';
import type { StreetsQueryResponse } from '../models/StreetsQueryResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class StreetService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create street
     * Create street
     * @param requestBody
     * @returns StreetsCreateResponse Created
     * @throws ApiError
     */
    public streetsCreateMutation(
        requestBody: StreetsCreateRequestBody,
    ): CancelablePromise<StreetsCreateResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/streets',
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
     * Query streets
     * @param filters
     * @param id
     * @param page
     * @param limit
     * @returns StreetsQueryResponse OK
     * @throws ApiError
     */
    public streetsQuery(
        filters?: StreetFilterType,
        id?: number,
        page?: number,
        limit?: number,
    ): CancelablePromise<StreetsQueryResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/streets',
            query: {
                'filters': filters,
                'id': id,
                'page': page,
                'limit': limit,
            },
            errors: {
                400: `Bad Request`,
                404: `lorem ipsum dolor sit amet`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Delete street
     * Delete street
     * @param requestBody
     * @returns StreetsCreateResponse Created
     * @throws ApiError
     */
    public streetsDeleteMutation(
        requestBody: StreetsDeleteRequestBody,
    ): CancelablePromise<StreetsCreateResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/streets',
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
     * Update street
     * Update street
     * @param id
     * @param requestBody
     * @returns StreetsCreateResponse Created
     * @throws ApiError
     */
    public streetsIdUpdateMutation(
        id: number,
        requestBody: StreetsCreateRequestBody,
    ): CancelablePromise<StreetsCreateResponse> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/streets/{id}',
            path: {
                'id': id,
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
     * Query streets
     * @param id
     * @param page
     * @param limit
     * @param filters
     * @returns StreetsQueryResponse OK
     * @throws ApiError
     */
    public streetsCsvDownloadQuery(
        id?: number,
        page?: number,
        limit?: number,
        filters?: StreetFilterType,
    ): CancelablePromise<StreetsQueryResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/streets/csv/download',
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
