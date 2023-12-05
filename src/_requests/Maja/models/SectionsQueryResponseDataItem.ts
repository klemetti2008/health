/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SectionsQueryResponseDataItemChildren } from './SectionsQueryResponseDataItemChildren';
import type { SectionsQueryResponseDataItemParent } from './SectionsQueryResponseDataItemParent';

export type SectionsQueryResponseDataItem = {
    children?: Array<SectionsQueryResponseDataItemChildren> | null;
    id?: number;
    latitude?: any;
    longitude?: any;
    name?: string;
    parent?: SectionsQueryResponseDataItemParent;
};

