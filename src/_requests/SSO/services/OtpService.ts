/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OTPCodeResponse } from '../models/OTPCodeResponse';
import type { OTPReasonsResponse } from '../models/OTPReasonsResponse';
import type { OTPSendRequest } from '../models/OTPSendRequest';
import type { OTPSendResponse } from '../models/OTPSendResponse';
import type { OTPVerifyRequest } from '../models/OTPVerifyRequest';
import type { OTPVerifyResponse } from '../models/OTPVerifyResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class OtpService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Query reasons for OTP
     * @returns OTPCodeResponse OK
     * @throws ApiError
     */
    public otpCodeQuery(): CancelablePromise<OTPCodeResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/otp/code',
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Query reasons for OTP
     * @returns OTPReasonsResponse OK
     * @throws ApiError
     */
    public otpReasonsQuery(): CancelablePromise<OTPReasonsResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/otp/reasons',
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * OTP Send
     * OTP Send
     * @param requestBody
     * @returns OTPSendResponse Created
     * @throws ApiError
     */
    public otpSendCreateMutation(
        requestBody: OTPSendRequest,
    ): CancelablePromise<OTPSendResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/otp/send',
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
     * OTP Verify
     * OTP Verify
     * @param requestBody
     * @returns OTPVerifyResponse Created
     * @throws ApiError
     */
    public otpVerifyCreateMutation(
        requestBody: OTPVerifyRequest,
    ): CancelablePromise<OTPVerifyResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/otp/verify',
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
