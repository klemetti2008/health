/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PermissionFilterType } from '../models/PermissionFilterType';
import type { PermissionsCreateRequestBody } from '../models/PermissionsCreateRequestBody';
import type { PermissionsCreateResponse } from '../models/PermissionsCreateResponse';
import type { PermissionsDeleteRequestBody } from '../models/PermissionsDeleteRequestBody';
import type { PermissionsQueryResponse } from '../models/PermissionsQueryResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class PermissionService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create permission
     * Create permission
     * @param requestBody
     * @returns PermissionsCreateResponse Created
     * @throws ApiError
     */
    public permissionsCreateMutation(
        requestBody: PermissionsCreateRequestBody,
    ): CancelablePromise<PermissionsCreateResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/permissions',
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
     * Query permissions
     * @param page
     * @param limit
     * @param filters
     * @param id
     * @param nurseId
     * @param notOwnerNurseId
     * @returns PermissionsQueryResponse OK
     * @throws ApiError
     */
    public permissionsQuery(
        page?: number,
        limit?: number,
        filters?: PermissionFilterType,
        id?: number,
        nurseId?: number,
        notOwnerNurseId?: number,
    ): CancelablePromise<PermissionsQueryResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/permissions',
            query: {
                'page': page,
                'limit': limit,
                'filters': filters,
                'id': id,
                'nurseId': nurseId,
                'notOwnerNurseId': notOwnerNurseId,
            },
            errors: {
                400: `Bad Request`,
                404: `lorem ipsum dolor sit amet`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Delete permission
     * Delete permission
     * @param requestBody
     * @returns PermissionsCreateResponse Created
     * @throws ApiError
     */
    public permissionsDeleteMutation(
        requestBody: PermissionsDeleteRequestBody,
    ): CancelablePromise<PermissionsCreateResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/permissions',
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
     * Update permission
     * Update permission
     * @param requestBody
     * @param id
     * @returns PermissionsCreateResponse Created
     * @throws ApiError
     */
    public permissionsIdUpdateMutation(
        requestBody: PermissionsCreateRequestBody,
        id?: number,
    ): CancelablePromise<PermissionsCreateResponse> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/permissions/{id}',
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
     * Query permissions
     * @param id
     * @param nurseId
     * @param notOwnerNurseId
     * @param page
     * @param limit
     * @param filters
     * @returns PermissionsQueryResponse OK
     * @throws ApiError
     */
    public permissionsCsvDownloadQuery(
        id?: number,
        nurseId?: number,
        notOwnerNurseId?: number,
        page?: number,
        limit?: number,
        filters?: PermissionFilterType,
    ): CancelablePromise<PermissionsQueryResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/permissions/csv/download',
            query: {
                'id': id,
                'nurseId': nurseId,
                'notOwnerNurseId': notOwnerNurseId,
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
