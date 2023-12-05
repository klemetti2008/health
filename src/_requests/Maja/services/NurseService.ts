/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NurseFilterType } from '../models/NurseFilterType';
import type { NursesCreateAbsencesRequestBody } from '../models/NursesCreateAbsencesRequestBody';
import type { NursesCreateAbsencesResponse } from '../models/NursesCreateAbsencesResponse';
import type { NursesCreateOrUpdateContractRequestBody } from '../models/NursesCreateOrUpdateContractRequestBody';
import type { NursesCreateOrUpdateContractResponse } from '../models/NursesCreateOrUpdateContractResponse';
import type { NursesCreatePermissionsRequestBody } from '../models/NursesCreatePermissionsRequestBody';
import type { NursesCreatePermissionsResponse } from '../models/NursesCreatePermissionsResponse';
import type { NursesDeleteAbsencesRequestBody } from '../models/NursesDeleteAbsencesRequestBody';
import type { NursesDeleteAbsencesResponse } from '../models/NursesDeleteAbsencesResponse';
import type { NursesDeletePermissionsRequestBody } from '../models/NursesDeletePermissionsRequestBody';
import type { NursesDeletePermissionsResponse } from '../models/NursesDeletePermissionsResponse';
import type { NursesDeleteRequestBody } from '../models/NursesDeleteRequestBody';
import type { NursesDeleteResponse } from '../models/NursesDeleteResponse';
import type { NurseSortType } from '../models/NurseSortType';
import type { NursesQueryAbsencesFilterType } from '../models/NursesQueryAbsencesFilterType';
import type { NursesQueryAbsencesResponse } from '../models/NursesQueryAbsencesResponse';
import type { NursesQueryAbsencesSortType } from '../models/NursesQueryAbsencesSortType';
import type { NursesQueryPermissionsFilterType } from '../models/NursesQueryPermissionsFilterType';
import type { NursesQueryPermissionsResponse } from '../models/NursesQueryPermissionsResponse';
import type { NursesQueryPermissionsSortType } from '../models/NursesQueryPermissionsSortType';
import type { NursesQueryResponse } from '../models/NursesQueryResponse';
import type { NursesUpdateAbsenceRequestBody } from '../models/NursesUpdateAbsenceRequestBody';
import type { NursesUpdateAbsenceResponse } from '../models/NursesUpdateAbsenceResponse';
import type { NursesUpdatePermissionRequestBody } from '../models/NursesUpdatePermissionRequestBody';
import type { NursesUpdatePermissionResponse } from '../models/NursesUpdatePermissionResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class NurseService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Query nurses
     * @param limit
     * @param filters
     * @param sorts
     * @param id
     * @param userId
     * @param page
     * @returns NursesQueryResponse OK
     * @throws ApiError
     */
    public nursesQuery(
        limit?: number,
        filters?: NurseFilterType,
        sorts?: NurseSortType,
        id?: number,
        userId?: number,
        page?: number,
    ): CancelablePromise<NursesQueryResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/nurses',
            query: {
                'limit': limit,
                'filters': filters,
                'sorts': sorts,
                'id': id,
                'userId': userId,
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
     * Delete nurse
     * Delete nurse
     * @param requestBody
     * @returns NursesDeleteResponse Created
     * @throws ApiError
     */
    public nursesDeleteMutation(
        requestBody: NursesDeleteRequestBody,
    ): CancelablePromise<NursesDeleteResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/nurses',
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
     * Create nurse absences
     * Create nurse absences
     * @param requestBody
     * @returns NursesCreateAbsencesResponse Created
     * @throws ApiError
     */
    public nursesAbsencesCreateMutation(
        requestBody: NursesCreateAbsencesRequestBody,
    ): CancelablePromise<NursesCreateAbsencesResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/nurses/absences',
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
     * Query nurse absenses
     * @param sorts
     * @param id
     * @param nurseId
     * @param page
     * @param limit
     * @param filters
     * @returns NursesQueryAbsencesResponse OK
     * @throws ApiError
     */
    public nursesAbsencesQuery(
        sorts?: NursesQueryAbsencesSortType,
        id?: number,
        nurseId?: number,
        page?: number,
        limit?: number,
        filters?: NursesQueryAbsencesFilterType,
    ): CancelablePromise<NursesQueryAbsencesResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/nurses/absences',
            query: {
                'sorts': sorts,
                'id': id,
                'nurseId': nurseId,
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
     * Delete nurse absences
     * Delete nurse absences
     * @param requestBody
     * @returns NursesDeleteAbsencesResponse Created
     * @throws ApiError
     */
    public nursesAbsencesDeleteMutation(
        requestBody: NursesDeleteAbsencesRequestBody,
    ): CancelablePromise<NursesDeleteAbsencesResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/nurses/absences',
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
     * Update nurse absence
     * Update nurse absence
     * @param id
     * @param requestBody
     * @returns NursesUpdateAbsenceResponse OK
     * @throws ApiError
     */
    public nursesAbsencesIdUpdateMutation(
        id: number,
        requestBody: NursesUpdateAbsenceRequestBody,
    ): CancelablePromise<NursesUpdateAbsenceResponse> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/nurses/absences/{id}',
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
     * Create or Update nurse contract
     * Create or Update nurse contract
     * @param userId
     * @param requestBody
     * @returns NursesCreateOrUpdateContractResponse Created
     * @throws ApiError
     */
    public nursesContractUserIdUpdateMutation(
        userId: number,
        requestBody: NursesCreateOrUpdateContractRequestBody,
    ): CancelablePromise<NursesCreateOrUpdateContractResponse> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/nurses/contract/{userId}',
            path: {
                'userId': userId,
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
     * Query nurses
     * @param userId
     * @param page
     * @param limit
     * @param filters
     * @param sorts
     * @param id
     * @returns NursesQueryResponse OK
     * @throws ApiError
     */
    public nursesCsvDownloadQuery(
        userId?: number,
        page?: number,
        limit?: number,
        filters?: NurseFilterType,
        sorts?: NurseSortType,
        id?: number,
    ): CancelablePromise<NursesQueryResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/nurses/csv/download',
            query: {
                'userId': userId,
                'page': page,
                'limit': limit,
                'filters': filters,
                'sorts': sorts,
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
     * Create nurse permissions
     * Create nurse permissions
     * @param requestBody
     * @returns NursesCreatePermissionsResponse Created
     * @throws ApiError
     */
    public nursesPermissionsCreateMutation(
        requestBody: NursesCreatePermissionsRequestBody,
    ): CancelablePromise<NursesCreatePermissionsResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/nurses/permissions',
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
     * Query nurse permissions
     * @param id
     * @param nurseId
     * @param page
     * @param limit
     * @param filters
     * @param sorts
     * @returns NursesQueryPermissionsResponse OK
     * @throws ApiError
     */
    public nursesPermissionsQuery(
        id?: number,
        nurseId?: number,
        page?: number,
        limit?: number,
        filters?: NursesQueryPermissionsFilterType,
        sorts?: NursesQueryPermissionsSortType,
    ): CancelablePromise<NursesQueryPermissionsResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/nurses/permissions',
            query: {
                'id': id,
                'nurseId': nurseId,
                'page': page,
                'limit': limit,
                'filters': filters,
                'sorts': sorts,
            },
            errors: {
                400: `Bad Request`,
                404: `lorem ipsum dolor sit amet`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Delete nurse permissions
     * Delete nurse permissions
     * @param requestBody
     * @returns NursesDeletePermissionsResponse Created
     * @throws ApiError
     */
    public nursesPermissionsDeleteMutation(
        requestBody: NursesDeletePermissionsRequestBody,
    ): CancelablePromise<NursesDeletePermissionsResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/nurses/permissions',
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
     * Update nurse permission
     * Update nurse permission
     * @param id
     * @param requestBody
     * @returns NursesUpdatePermissionResponse OK
     * @throws ApiError
     */
    public nursesPermissionsIdUpdateMutation(
        id: number,
        requestBody: NursesUpdatePermissionRequestBody,
    ): CancelablePromise<NursesUpdatePermissionResponse> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/nurses/permissions/{id}',
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

}
