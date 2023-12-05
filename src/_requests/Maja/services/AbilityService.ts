/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AbilitiesCreateRequestBody } from '../models/AbilitiesCreateRequestBody';
import type { AbilitiesCreateResponse } from '../models/AbilitiesCreateResponse';
import type { AbilitiesDeleteRequestBody } from '../models/AbilitiesDeleteRequestBody';
import type { AbilitiesQueryResponse } from '../models/AbilitiesQueryResponse';
import type { AbilityFilterType } from '../models/AbilityFilterType';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AbilityService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create ability
     * Create ability
     * @param requestBody
     * @returns AbilitiesCreateResponse Created
     * @throws ApiError
     */
    public abilitiesCreateMutation(
        requestBody: AbilitiesCreateRequestBody,
    ): CancelablePromise<AbilitiesCreateResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/abilities',
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
     * Query abilities
     * @param limit
     * @param filters
     * @param id
     * @param page
     * @returns AbilitiesQueryResponse OK
     * @throws ApiError
     */
    public abilitiesQuery(
        limit?: number,
        filters?: AbilityFilterType,
        id?: number,
        page?: number,
    ): CancelablePromise<AbilitiesQueryResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/abilities',
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
     * Delete ability
     * Delete ability
     * @param requestBody
     * @returns AbilitiesCreateResponse Created
     * @throws ApiError
     */
    public abilitiesDeleteMutation(
        requestBody: AbilitiesDeleteRequestBody,
    ): CancelablePromise<AbilitiesCreateResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/abilities',
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
     * Update ability
     * Update ability
     * @param name
     * @param requestBody
     * @returns AbilitiesCreateResponse Created
     * @throws ApiError
     */
    public abilitiesNameUpdateMutation(
        name: string,
        requestBody: AbilitiesCreateRequestBody,
    ): CancelablePromise<AbilitiesCreateResponse> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/abilities/{name}',
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
     * Query abilities
     * @param filters
     * @param id
     * @param page
     * @param limit
     * @returns AbilitiesQueryResponse OK
     * @throws ApiError
     */
    public abilitiesCsvDownloadQuery(
        filters?: AbilityFilterType,
        id?: number,
        page?: number,
        limit?: number,
    ): CancelablePromise<AbilitiesQueryResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/abilities/csv/download',
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

}
