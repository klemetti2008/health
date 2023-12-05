/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CitiesCreateRequestBody } from '../models/CitiesCreateRequestBody';
import type { CitiesCreateResponse } from '../models/CitiesCreateResponse';
import type { CitiesDeleteRequestBody } from '../models/CitiesDeleteRequestBody';
import type { CitiesQueryResponse } from '../models/CitiesQueryResponse';
import type { CityFilterType } from '../models/CityFilterType';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class CityService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create city
     * Create city
     * @param requestBody
     * @returns CitiesCreateResponse Created
     * @throws ApiError
     */
    public citiesCreateMutation(
        requestBody: CitiesCreateRequestBody,
    ): CancelablePromise<CitiesCreateResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/cities',
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
     * Query cities
     * @param id
     * @param page
     * @param limit
     * @param filters
     * @returns CitiesQueryResponse OK
     * @throws ApiError
     */
    public citiesQuery(
        id?: number,
        page?: number,
        limit?: number,
        filters?: CityFilterType,
    ): CancelablePromise<CitiesQueryResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/cities',
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
     * Delete city
     * Delete city
     * @param requestBody
     * @returns CitiesCreateResponse Created
     * @throws ApiError
     */
    public citiesDeleteMutation(
        requestBody: CitiesDeleteRequestBody,
    ): CancelablePromise<CitiesCreateResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/cities',
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
     * Update city
     * Update city
     * @param name
     * @param requestBody
     * @returns CitiesCreateResponse Created
     * @throws ApiError
     */
    public citiesNameUpdateMutation(
        name: string,
        requestBody: CitiesCreateRequestBody,
    ): CancelablePromise<CitiesCreateResponse> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/cities/{name}',
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
     * Query cities
     * @param id
     * @param page
     * @param limit
     * @param filters
     * @returns CitiesQueryResponse OK
     * @throws ApiError
     */
    public citiesCsvDownloadQuery(
        id?: number,
        page?: number,
        limit?: number,
        filters?: CityFilterType,
    ): CancelablePromise<CitiesQueryResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/cities/csv/download',
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
