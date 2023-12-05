/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MedicinesQueryResponseDataItem } from './MedicinesQueryResponseDataItem';

export type MedicinesQueryResponseData = {
    items?: Array<MedicinesQueryResponseDataItem>;
    limit?: number;
    offset?: number;
    page?: number;
    totalPages?: number;
    totalRows?: number;
};

