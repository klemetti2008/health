/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompaniesCreateRequestBody } from '../models/CompaniesCreateRequestBody';
import type { CompaniesCreateResponse } from '../models/CompaniesCreateResponse';
import type { CompaniesDeleteRequestBody } from '../models/CompaniesDeleteRequestBody';
import type { CompaniesQueryResponse } from '../models/CompaniesQueryResponse';
import type { CompanyFilterType } from '../models/CompanyFilterType';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class CompanyService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create company
     * Create company
     * @param requestBody
     * @returns CompaniesCreateResponse Created
     * @throws ApiError
     */
    public companiesCreateMutation(
        requestBody: CompaniesCreateRequestBody,
    ): CancelablePromise<CompaniesCreateResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/companies',
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
     * Query companies
     * @param id
     * @param page
     * @param limit
     * @param filters
     * @returns CompaniesQueryResponse OK
     * @throws ApiError
     */
    public companiesQuery(
        id?: number,
        page?: number,
        limit?: number,
        filters?: CompanyFilterType,
    ): CancelablePromise<CompaniesQueryResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/companies',
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
     * Delete company
     * Delete company
     * @param requestBody
     * @returns CompaniesCreateResponse Created
     * @throws ApiError
     */
    public companiesDeleteMutation(
        requestBody: CompaniesDeleteRequestBody,
    ): CancelablePromise<CompaniesCreateResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/companies',
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
     * Update company
     * Update company
     * @param name
     * @param requestBody
     * @returns CompaniesCreateResponse Created
     * @throws ApiError
     */
    public companiesNameUpdateMutation(
        name: string,
        requestBody: CompaniesCreateRequestBody,
    ): CancelablePromise<CompaniesCreateResponse> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/companies/{name}',
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
     * Query companies
     * @param limit
     * @param filters
     * @param id
     * @param page
     * @returns CompaniesQueryResponse OK
     * @throws ApiError
     */
    public companiesCsvDownloadQuery(
        limit?: number,
        filters?: CompanyFilterType,
        id?: number,
        page?: number,
    ): CancelablePromise<CompaniesQueryResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/companies/csv/download',
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
