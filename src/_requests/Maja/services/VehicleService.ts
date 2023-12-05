/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VehicleFilterType } from '../models/VehicleFilterType';
import type { VehiclesCreateRequestBody } from '../models/VehiclesCreateRequestBody';
import type { VehiclesCreateResponse } from '../models/VehiclesCreateResponse';
import type { VehiclesDeleteRequestBody } from '../models/VehiclesDeleteRequestBody';
import type { VehiclesQueryResponse } from '../models/VehiclesQueryResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class VehicleService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create vehicle
     * Create vehicle
     * @param requestBody
     * @returns VehiclesCreateResponse Created
     * @throws ApiError
     */
    public vehiclesCreateMutation(
        requestBody: VehiclesCreateRequestBody,
    ): CancelablePromise<VehiclesCreateResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/vehicles',
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
     * Query vehicles
     * @param id
     * @param page
     * @param limit
     * @param filters
     * @returns VehiclesQueryResponse OK
     * @throws ApiError
     */
    public vehiclesQuery(
        id?: number,
        page?: number,
        limit?: number,
        filters?: VehicleFilterType,
    ): CancelablePromise<VehiclesQueryResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/vehicles',
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
     * Delete vehicle
     * Delete vehicle
     * @param requestBody
     * @returns VehiclesCreateResponse Created
     * @throws ApiError
     */
    public vehiclesDeleteMutation(
        requestBody: VehiclesDeleteRequestBody,
    ): CancelablePromise<VehiclesCreateResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/vehicles',
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
     * Update vehicle
     * Update vehicle
     * @param requestBody
     * @param id
     * @returns VehiclesCreateResponse Created
     * @throws ApiError
     */
    public vehiclesIdUpdateMutation(
        requestBody: VehiclesCreateRequestBody,
        id?: number,
    ): CancelablePromise<VehiclesCreateResponse> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/vehicles/{id}',
            query: {
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
     * Query vehicles
     * @param id
     * @param page
     * @param limit
     * @param filters
     * @returns VehiclesQueryResponse OK
     * @throws ApiError
     */
    public vehiclesCsvDownloadQuery(
        id?: number,
        page?: number,
        limit?: number,
        filters?: VehicleFilterType,
    ): CancelablePromise<VehiclesQueryResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/vehicles/csv/download',
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
