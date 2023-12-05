/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DiagnoseFilterType } from '../models/DiagnoseFilterType';
import type { DiagnosesCreateRequestBody } from '../models/DiagnosesCreateRequestBody';
import type { DiagnosesCreateResponse } from '../models/DiagnosesCreateResponse';
import type { DiagnosesDeleteRequestBody } from '../models/DiagnosesDeleteRequestBody';
import type { DiagnosesQueryResponse } from '../models/DiagnosesQueryResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class DiagnoseService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create diagnose
     * Create diagnose
     * @param requestBody
     * @returns DiagnosesCreateResponse Created
     * @throws ApiError
     */
    public diagnosesCreateMutation(
        requestBody: DiagnosesCreateRequestBody,
    ): CancelablePromise<DiagnosesCreateResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/diagnoses',
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
     * Query diagnoses
     * @param page
     * @param limit
     * @param filters
     * @param id
     * @returns DiagnosesQueryResponse OK
     * @throws ApiError
     */
    public diagnosesQuery(
        page?: number,
        limit?: number,
        filters?: DiagnoseFilterType,
        id?: number,
    ): CancelablePromise<DiagnosesQueryResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/diagnoses',
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

    /**
     * Delete diagnose
     * Delete diagnose
     * @param requestBody
     * @returns DiagnosesCreateResponse Created
     * @throws ApiError
     */
    public diagnosesDeleteMutation(
        requestBody: DiagnosesDeleteRequestBody,
    ): CancelablePromise<DiagnosesCreateResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/diagnoses',
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
     * Update diagnose
     * Update diagnose
     * @param id
     * @param requestBody
     * @returns DiagnosesCreateResponse Created
     * @throws ApiError
     */
    public diagnosesIdUpdateMutation(
        id: number,
        requestBody: DiagnosesCreateRequestBody,
    ): CancelablePromise<DiagnosesCreateResponse> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/diagnoses/{id}',
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
     * Query diagnoses
     * @param id
     * @param page
     * @param limit
     * @param filters
     * @returns DiagnosesQueryResponse OK
     * @throws ApiError
     */
    public diagnosesCsvDownloadQuery(
        id?: number,
        page?: number,
        limit?: number,
        filters?: DiagnoseFilterType,
    ): CancelablePromise<DiagnosesQueryResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/diagnoses/csv/download',
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
