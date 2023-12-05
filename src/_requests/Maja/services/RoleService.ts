/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RoleFilterType } from '../models/RoleFilterType';
import type { RolesCreateRequestBody } from '../models/RolesCreateRequestBody';
import type { RolesCreateResponse } from '../models/RolesCreateResponse';
import type { RolesDeleteRequestBody } from '../models/RolesDeleteRequestBody';
import type { RolesQueryResponse } from '../models/RolesQueryResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class RoleService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create role
     * Create role
     * @param requestBody
     * @returns RolesCreateResponse Created
     * @throws ApiError
     */
    public rolesCreateMutation(
        requestBody: RolesCreateRequestBody,
    ): CancelablePromise<RolesCreateResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/roles',
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
     * Query roles
     * @param limit
     * @param filters
     * @param id
     * @param page
     * @returns RolesQueryResponse OK
     * @throws ApiError
     */
    public rolesQuery(
        limit?: number,
        filters?: RoleFilterType,
        id?: number,
        page?: number,
    ): CancelablePromise<RolesQueryResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/roles',
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

    /**
     * Delete role
     * Delete role
     * @param requestBody
     * @returns RolesCreateResponse Created
     * @throws ApiError
     */
    public rolesDeleteMutation(
        requestBody: RolesDeleteRequestBody,
    ): CancelablePromise<RolesCreateResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/roles',
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
     * Update role
     * Update role
     * @param name
     * @param requestBody
     * @returns RolesCreateResponse Created
     * @throws ApiError
     */
    public rolesNameUpdateMutation(
        name: string,
        requestBody: RolesCreateRequestBody,
    ): CancelablePromise<RolesCreateResponse> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/roles/{name}',
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
     * Query roles
     * @param id
     * @param page
     * @param limit
     * @param filters
     * @returns RolesQueryResponse OK
     * @throws ApiError
     */
    public rolesCsvDownloadQuery(
        id?: number,
        page?: number,
        limit?: number,
        filters?: RoleFilterType,
    ): CancelablePromise<RolesQueryResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/roles/csv/download',
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
