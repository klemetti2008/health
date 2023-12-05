/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserFilterType } from './UserFilterType';
import type { UserSortType } from './UserSortType';

export type UsersQueryRequestParams = {
    filters?: UserFilterType;
    id?: number;
    limit?: number;
    page?: number;
    sorts?: UserSortType;
};

