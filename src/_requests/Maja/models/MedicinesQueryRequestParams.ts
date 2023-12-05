/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MedicineFilterType } from './MedicineFilterType';

export type MedicinesQueryRequestParams = {
    filters?: MedicineFilterType;
    id?: number;
    limit?: number;
    page?: number;
};

