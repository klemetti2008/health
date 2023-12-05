/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SectionFilterType } from '../models/SectionFilterType';
import type { SectionsCreateRequestBody } from '../models/SectionsCreateRequestBody';
import type { SectionsCreateResponse } from '../models/SectionsCreateResponse';
import type { SectionsDeleteRequestBody } from '../models/SectionsDeleteRequestBody';
import type { SectionsQueryResponse } from '../models/SectionsQueryResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class SectionService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create section
     * Create section
     * @param requestBody
     * @returns SectionsCreateResponse Created
     * @throws ApiError
     */
    public sectionsCreateMutation(
        requestBody: SectionsCreateRequestBody,
    ): CancelablePromise<SectionsCreateResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/sections',
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
     * Query sections
     * @param filters
     * @param id
     * @param parentId
     * @param page
     * @param limit
     * @returns SectionsQueryResponse OK
     * @throws ApiError
     */
    public sectionsQuery(
        filters?: SectionFilterType,
        id?: number,
        parentId?: number,
        page?: number,
        limit?: number,
    ): CancelablePromise<SectionsQueryResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/sections',
            query: {
                'filters': filters,
                'id': id,
                'parentId': parentId,
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
     * Delete section
     * Delete section
     * @param requestBody
     * @returns SectionsCreateResponse Created
     * @throws ApiError
     */
    public sectionsDeleteMutation(
        requestBody: SectionsDeleteRequestBody,
    ): CancelablePromise<SectionsCreateResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/sections',
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
     * Update section
     * Update section
     * @param id
     * @param requestBody
     * @returns SectionsCreateResponse Created
     * @throws ApiError
     */
    public sectionsIdUpdateMutation(
        id: number,
        requestBody: SectionsCreateRequestBody,
    ): CancelablePromise<SectionsCreateResponse> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/sections/{id}',
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
     * Query sections
     * @param page
     * @param limit
     * @param filters
     * @param id
     * @param parentId
     * @returns SectionsQueryResponse OK
     * @throws ApiError
     */
    public sectionsCsvDownloadQuery(
        page?: number,
        limit?: number,
        filters?: SectionFilterType,
        id?: number,
        parentId?: number,
    ): CancelablePromise<SectionsQueryResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/sections/csv/download',
            query: {
                'page': page,
                'limit': limit,
                'filters': filters,
                'id': id,
                'parentId': parentId,
            },
            errors: {
                400: `Bad Request`,
                404: `lorem ipsum dolor sit amet`,
                500: `Internal Server Error`,
            },
        });
    }

}
