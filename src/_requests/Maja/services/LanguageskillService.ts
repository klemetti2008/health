/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LanguageSkillFilterType } from '../models/LanguageSkillFilterType';
import type { LanguageSkillsCreateRequestBody } from '../models/LanguageSkillsCreateRequestBody';
import type { LanguageSkillsCreateResponse } from '../models/LanguageSkillsCreateResponse';
import type { LanguageSkillsDeleteRequestBody } from '../models/LanguageSkillsDeleteRequestBody';
import type { LanguageSkillsQueryResponse } from '../models/LanguageSkillsQueryResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class LanguageskillService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create languageskill
     * Create languageskill
     * @param requestBody
     * @returns LanguageSkillsCreateResponse Created
     * @throws ApiError
     */
    public languageskillsCreateMutation(
        requestBody: LanguageSkillsCreateRequestBody,
    ): CancelablePromise<LanguageSkillsCreateResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/languageskills',
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
     * Query languageskills
     * @param id
     * @param page
     * @param limit
     * @param filters
     * @returns LanguageSkillsQueryResponse OK
     * @throws ApiError
     */
    public languageskillsQuery(
        id?: number,
        page?: number,
        limit?: number,
        filters?: LanguageSkillFilterType,
    ): CancelablePromise<LanguageSkillsQueryResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/languageskills',
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
     * Delete languageskill
     * Delete languageskill
     * @param requestBody
     * @returns LanguageSkillsCreateResponse Created
     * @throws ApiError
     */
    public languageskillsDeleteMutation(
        requestBody: LanguageSkillsDeleteRequestBody,
    ): CancelablePromise<LanguageSkillsCreateResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/languageskills',
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
     * Update languageskill
     * Update languageskill
     * @param name
     * @param requestBody
     * @returns LanguageSkillsCreateResponse Created
     * @throws ApiError
     */
    public languageskillsNameUpdateMutation(
        name: string,
        requestBody: LanguageSkillsCreateRequestBody,
    ): CancelablePromise<LanguageSkillsCreateResponse> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/languageskills/{name}',
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
     * Query languageskills
     * @param limit
     * @param filters
     * @param id
     * @param page
     * @returns LanguageSkillsQueryResponse OK
     * @throws ApiError
     */
    public languageskillsCsvDownloadQuery(
        limit?: number,
        filters?: LanguageSkillFilterType,
        id?: number,
        page?: number,
    ): CancelablePromise<LanguageSkillsQueryResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/languageskills/csv/download',
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
