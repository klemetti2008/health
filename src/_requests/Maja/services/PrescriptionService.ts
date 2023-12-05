/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PrescriptionFilterType } from '../models/PrescriptionFilterType';
import type { PrescriptionsCreateRequestBody } from '../models/PrescriptionsCreateRequestBody';
import type { PrescriptionsCreateResponse } from '../models/PrescriptionsCreateResponse';
import type { PrescriptionsDeleteRequestBody } from '../models/PrescriptionsDeleteRequestBody';
import type { PrescriptionsQueryResponse } from '../models/PrescriptionsQueryResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class PrescriptionService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create prescription
     * Create prescription
     * @param requestBody
     * @returns PrescriptionsCreateResponse Created
     * @throws ApiError
     */
    public prescriptionsCreateMutation(
        requestBody: PrescriptionsCreateRequestBody,
    ): CancelablePromise<PrescriptionsCreateResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/prescriptions',
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
     * Query prescriptions
     * @param id
     * @param page
     * @param limit
     * @param filters
     * @returns PrescriptionsQueryResponse OK
     * @throws ApiError
     */
    public prescriptionsQuery(
        id?: number,
        page?: number,
        limit?: number,
        filters?: PrescriptionFilterType,
    ): CancelablePromise<PrescriptionsQueryResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/prescriptions',
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
     * Delete prescription
     * Delete prescription
     * @param requestBody
     * @returns PrescriptionsCreateResponse Created
     * @throws ApiError
     */
    public prescriptionsDeleteMutation(
        requestBody: PrescriptionsDeleteRequestBody,
    ): CancelablePromise<PrescriptionsCreateResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/prescriptions',
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
     * Update prescription
     * Update prescription
     * @param id
     * @param requestBody
     * @returns PrescriptionsCreateResponse Created
     * @throws ApiError
     */
    public prescriptionsIdUpdateMutation(
        id: number,
        requestBody: PrescriptionsCreateRequestBody,
    ): CancelablePromise<PrescriptionsCreateResponse> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/prescriptions/{id}',
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
     * Query prescriptions
     * @param id
     * @param page
     * @param limit
     * @param filters
     * @returns PrescriptionsQueryResponse OK
     * @throws ApiError
     */
    public prescriptionsCsvDownloadQuery(
        id?: number,
        page?: number,
        limit?: number,
        filters?: PrescriptionFilterType,
    ): CancelablePromise<PrescriptionsQueryResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/prescriptions/csv/download',
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
