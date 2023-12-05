/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CompanyFilterType } from './CompanyFilterType';

export type CompaniesQueryRequestParams = {
    filters?: CompanyFilterType;
    id?: number;
    limit?: number;
    page?: number;
};

