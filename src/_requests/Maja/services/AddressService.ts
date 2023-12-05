/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddressesCreateRequestBody } from '../models/AddressesCreateRequestBody';
import type { AddressesCreateResponse } from '../models/AddressesCreateResponse';
import type { AddressesDeleteRequestBody } from '../models/AddressesDeleteRequestBody';
import type { AddressesQueryResponse } from '../models/AddressesQueryResponse';
import type { AddressFilterType } from '../models/AddressFilterType';
import type { AddressSortType } from '../models/AddressSortType';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AddressService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create address
     * Create address
     * @param requestBody
     * @returns AddressesCreateResponse Created
     * @throws ApiError
     */
    public addressesCreateMutation(
        requestBody: AddressesCreateRequestBody,
    ): CancelablePromise<AddressesCreateResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/addresses',
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
     * Query addresses
     * @param filters
     * @param sorts
     * @param id
     * @param nurseId
     * @param page
     * @param limit
     * @returns AddressesQueryResponse OK
     * @throws ApiError
     */
    public addressesQuery(
        filters?: AddressFilterType,
        sorts?: AddressSortType,
        id?: number,
        nurseId?: number,
        page?: number,
        limit?: number,
    ): CancelablePromise<AddressesQueryResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/addresses',
            query: {
                'filters': filters,
                'sorts': sorts,
                'id': id,
                'nurseId': nurseId,
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
     * Delete address
     * Delete address
     * @param requestBody
     * @returns AddressesCreateResponse Created
     * @throws ApiError
     */
    public addressesDeleteMutation(
        requestBody: AddressesDeleteRequestBody,
    ): CancelablePromise<AddressesCreateResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/addresses',
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
     * Update address
     * Update address
     * @param id
     * @param requestBody
     * @returns AddressesCreateResponse Created
     * @throws ApiError
     */
    public addressesIdUpdateMutation(
        id: number,
        requestBody: AddressesCreateRequestBody,
    ): CancelablePromise<AddressesCreateResponse> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/addresses/{id}',
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
     * Query addresses
     * @param page
     * @param limit
     * @param filters
     * @param sorts
     * @param id
     * @param nurseId
     * @returns AddressesQueryResponse OK
     * @throws ApiError
     */
    public addressesCsvDownloadQuery(
        page?: number,
        limit?: number,
        filters?: AddressFilterType,
        sorts?: AddressSortType,
        id?: number,
        nurseId?: number,
    ): CancelablePromise<AddressesQueryResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/addresses/csv/download',
            query: {
                'page': page,
                'limit': limit,
                'filters': filters,
                'sorts': sorts,
                'id': id,
                'nurseId': nurseId,
            },
            errors: {
                400: `Bad Request`,
                404: `lorem ipsum dolor sit amet`,
                500: `Internal Server Error`,
            },
        });
    }

}
