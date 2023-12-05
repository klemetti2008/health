/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VehicleTypeFilterType } from '../models/VehicleTypeFilterType';
import type { VehicleTypesCreateRequestBody } from '../models/VehicleTypesCreateRequestBody';
import type { VehicleTypesCreateResponse } from '../models/VehicleTypesCreateResponse';
import type { VehicleTypesDeleteRequestBody } from '../models/VehicleTypesDeleteRequestBody';
import type { VehicleTypesQueryResponse } from '../models/VehicleTypesQueryResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class VehicletypeService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create vehicletype
     * Create vehicletype
     * @param requestBody
     * @returns VehicleTypesCreateResponse Created
     * @throws ApiError
     */
    public vehicletypesCreateMutation(
        requestBody: VehicleTypesCreateRequestBody,
    ): CancelablePromise<VehicleTypesCreateResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/vehicletypes',
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
     * Query vehicletypes
     * @param id
     * @param page
     * @param limit
     * @param filters
     * @returns VehicleTypesQueryResponse OK
     * @throws ApiError
     */
    public vehicletypesQuery(
        id?: number,
        page?: number,
        limit?: number,
        filters?: VehicleTypeFilterType,
    ): CancelablePromise<VehicleTypesQueryResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/vehicletypes',
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
     * Delete vehicletype
     * Delete vehicletype
     * @param requestBody
     * @returns VehicleTypesCreateResponse Created
     * @throws ApiError
     */
    public vehicletypesDeleteMutation(
        requestBody: VehicleTypesDeleteRequestBody,
    ): CancelablePromise<VehicleTypesCreateResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/vehicletypes',
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
     * Update vehicletype
     * Update vehicletype
     * @param name
     * @param requestBody
     * @returns VehicleTypesCreateResponse Created
     * @throws ApiError
     */
    public vehicletypesNameUpdateMutation(
        name: string,
        requestBody: VehicleTypesCreateRequestBody,
    ): CancelablePromise<VehicleTypesCreateResponse> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/vehicletypes/{name}',
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
     * Query vehicletypes
     * @param limit
     * @param filters
     * @param id
     * @param page
     * @returns VehicleTypesQueryResponse OK
     * @throws ApiError
     */
    public vehicletypesCsvDownloadQuery(
        limit?: number,
        filters?: VehicleTypeFilterType,
        id?: number,
        page?: number,
    ): CancelablePromise<VehicleTypesQueryResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/vehicletypes/csv/download',
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
