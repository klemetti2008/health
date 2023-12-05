/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OAuth2AuthRequestBody } from '../models/OAuth2AuthRequestBody';
import type { OAuth2AuthResponse } from '../models/OAuth2AuthResponse';
import type { OAuth2RefreshRequestBody } from '../models/OAuth2RefreshRequestBody';
import type { OAuth2RefreshResponse } from '../models/OAuth2RefreshResponse';
import type { OAuth2UserInfoResponse } from '../models/OAuth2UserInfoResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class Oauth2Service {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Authenticate
     * Authenticate
     * @param requestBody
     * @returns OAuth2AuthResponse Created
     * @throws ApiError
     */
    public oauth2AuthCreateMutation(
        requestBody: OAuth2AuthRequestBody,
    ): CancelablePromise<OAuth2AuthResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/oauth2/auth',
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
     * Refresh token
     * Refresh token
     * @param requestBody
     * @returns OAuth2RefreshResponse Created
     * @throws ApiError
     */
    public oauth2RefreshCreateMutation(
        requestBody: OAuth2RefreshRequestBody,
    ): CancelablePromise<OAuth2RefreshResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/oauth2/refresh',
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
     * @returns OAuth2UserInfoResponse OK
     * @throws ApiError
     */
    public oauth2UserinfoQuery(): CancelablePromise<OAuth2UserInfoResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/oauth2/userinfo',
            errors: {
                400: `Bad Request`,
                404: `lorem ipsum dolor sit amet`,
                500: `Internal Server Error`,
            },
        });
    }

}
