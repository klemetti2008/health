/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ErrDataType } from './ErrDataType';

export type ErrorResponse = {
    errors?: Array<ErrDataType>;
    message?: string;
};

