/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserFilterType } from '../models/UserFilterType';
import type { UsersAcceptPolicyResponse } from '../models/UsersAcceptPolicyResponse';
import type { UsersChangePasswordRequestBody } from '../models/UsersChangePasswordRequestBody';
import type { UsersChangePasswordResponse } from '../models/UsersChangePasswordResponse';
import type { UsersCreateRequestBody } from '../models/UsersCreateRequestBody';
import type { UsersCreateResponse } from '../models/UsersCreateResponse';
import type { UsersDeleteRequestBody } from '../models/UsersDeleteRequestBody';
import type { UserSortType } from '../models/UserSortType';
import type { UsersQueryResponse } from '../models/UsersQueryResponse';
import type { UsersResetPasswordRequestBody } from '../models/UsersResetPasswordRequestBody';
import type { UsersResetPasswordResponse } from '../models/UsersResetPasswordResponse';
import type { UsersUpdateRequestBody } from '../models/UsersUpdateRequestBody';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class UserService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create user
     * Create user
     * @param requestBody
     * @returns UsersCreateResponse Created
     * @throws ApiError
     */
    public usersCreateMutation(
        requestBody: UsersCreateRequestBody,
    ): CancelablePromise<UsersCreateResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/users',
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
     * Query users
     * @param filters
     * @param sorts
     * @param id
     * @param page
     * @param limit
     * @returns UsersQueryResponse OK
     * @throws ApiError
     */
    public usersQuery(
        filters?: UserFilterType,
        sorts?: UserSortType,
        id?: number,
        page?: number,
        limit?: number,
    ): CancelablePromise<UsersQueryResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/users',
            query: {
                'filters': filters,
                'sorts': sorts,
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
     * Delete user
     * Delete user
     * @param requestBody
     * @returns UsersCreateResponse Created
     * @throws ApiError
     */
    public usersDeleteMutation(
        requestBody: UsersDeleteRequestBody,
    ): CancelablePromise<UsersCreateResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/users',
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
     * Update user
     * Update user
     * @param id
     * @param requestBody
     * @returns UsersCreateResponse Created
     * @throws ApiError
     */
    public usersIdUpdateMutation(
        id: number,
        requestBody: UsersUpdateRequestBody,
    ): CancelablePromise<UsersCreateResponse> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/users/{id}',
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
     * Accept policy
     * Accept policy
     * @returns UsersAcceptPolicyResponse OK
     * @throws ApiError
     */
    public usersAcceptPolicyUpdateMutation(): CancelablePromise<UsersAcceptPolicyResponse> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/users/accept-policy',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Change Password
     * Change Password
     * @param requestBody
     * @returns UsersChangePasswordResponse OK
     * @throws ApiError
     */
    public usersChangePasswordUpdateMutation(
        requestBody: UsersChangePasswordRequestBody,
    ): CancelablePromise<UsersChangePasswordResponse> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/users/change-password',
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
     * Reset Password
     * Reset Password
     * @param requestBody
     * @returns UsersResetPasswordResponse OK
     * @throws ApiError
     */
    public usersResetPasswordUpdateMutation(
        requestBody: UsersResetPasswordRequestBody,
    ): CancelablePromise<UsersResetPasswordResponse> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/users/reset-password',
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

}
