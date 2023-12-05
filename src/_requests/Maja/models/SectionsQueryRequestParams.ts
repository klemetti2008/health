/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SectionFilterType } from './SectionFilterType';

export type SectionsQueryRequestParams = {
    filters?: SectionFilterType;
    id?: number;
    limit?: number;
    page?: number;
    parentId?: number;
};

