/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { User } from './User';

export type OAuth2Response = {
    accessToken?: string;
    refreshToken?: string;
    user?: User;
};

