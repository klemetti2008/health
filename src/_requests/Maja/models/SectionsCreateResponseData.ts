/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SectionsCreateResponseDataItem } from './SectionsCreateResponseDataItem';
import type { SectionsCreateResponseDataParent } from './SectionsCreateResponseDataParent';

export type SectionsCreateResponseData = {
    children?: Array<SectionsCreateResponseDataItem> | null;
    id?: number;
    latitude?: any;
    longitude?: any;
    name?: string;
    parent?: SectionsCreateResponseDataParent;
};

