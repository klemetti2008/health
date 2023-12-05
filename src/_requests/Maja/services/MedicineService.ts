/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MedicineFilterType } from '../models/MedicineFilterType';
import type { MedicinesCreateRequestBody } from '../models/MedicinesCreateRequestBody';
import type { MedicinesCreateResponse } from '../models/MedicinesCreateResponse';
import type { MedicinesDeleteRequestBody } from '../models/MedicinesDeleteRequestBody';
import type { MedicinesQueryResponse } from '../models/MedicinesQueryResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class MedicineService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create medicine
     * Create medicine
     * @param requestBody
     * @returns MedicinesCreateResponse Created
     * @throws ApiError
     */
    public medicinesCreateMutation(
        requestBody: MedicinesCreateRequestBody,
    ): CancelablePromise<MedicinesCreateResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/medicines',
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
     * Query medicines
     * @param id
     * @param page
     * @param limit
     * @param filters
     * @returns MedicinesQueryResponse OK
     * @throws ApiError
     */
    public medicinesQuery(
        id?: number,
        page?: number,
        limit?: number,
        filters?: MedicineFilterType,
    ): CancelablePromise<MedicinesQueryResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/medicines',
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
     * Delete medicine
     * Delete medicine
     * @param requestBody
     * @returns MedicinesCreateResponse Created
     * @throws ApiError
     */
    public medicinesDeleteMutation(
        requestBody: MedicinesDeleteRequestBody,
    ): CancelablePromise<MedicinesCreateResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/medicines',
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
     * Update medicine
     * Update medicine
     * @param id
     * @param requestBody
     * @returns MedicinesCreateResponse Created
     * @throws ApiError
     */
    public medicinesIdUpdateMutation(
        id: number,
        requestBody: MedicinesCreateRequestBody,
    ): CancelablePromise<MedicinesCreateResponse> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/medicines/{id}',
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
     * Query medicines
     * @param page
     * @param limit
     * @param filters
     * @param id
     * @returns MedicinesQueryResponse OK
     * @throws ApiError
     */
    public medicinesCsvDownloadQuery(
        page?: number,
        limit?: number,
        filters?: MedicineFilterType,
        id?: number,
    ): CancelablePromise<MedicinesQueryResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/medicines/csv/download',
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

}
