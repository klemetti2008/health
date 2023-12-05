/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { NursesQueryResponseDataAbsence } from './NursesQueryResponseDataAbsence';
import type { NursesQueryResponseDataAvailableShift } from './NursesQueryResponseDataAvailableShift';
import type { NursesQueryResponseDataContractType } from './NursesQueryResponseDataContractType';
import type { NursesQueryResponseDataNurseType } from './NursesQueryResponseDataNurseType';
import type { NursesQueryResponseDataPaymentType } from './NursesQueryResponseDataPaymentType';
import type { NursesQueryResponseDataPermission } from './NursesQueryResponseDataPermission';
import type { NursesQueryResponseDataSection } from './NursesQueryResponseDataSection';
import type { NursesQueryResponseDataUser } from './NursesQueryResponseDataUser';

export type NursesQueryResponseDataItem = {
    absences?: Array<NursesQueryResponseDataAbsence>;
    addresses?: Array<NursesQueryResponseDataUser>;
    availableShifts?: Array<NursesQueryResponseDataAvailableShift>;
    certificateCode?: string;
    companyRegistrationNumber?: string;
    contract_expires_at?: number;
    contract_started_at?: number;
    contractTypes?: Array<NursesQueryResponseDataContractType>;
    created_at?: number;
    deleted_at?: number;
    experienceAmount?: number;
    experienceAmountUnit?: string;
    grace?: number;
    hourLengthInContract?: number;
    id?: number;
    jobTitle?: string;
    joined_at?: number;
    limitations?: string;
    nurseTypes?: Array<NursesQueryResponseDataNurseType>;
    paymentType?: NursesQueryResponseDataPaymentType;
    percentLengthInContract?: number;
    permissions?: Array<NursesQueryResponseDataPermission>;
    progress?: number;
    quiz_time?: number;
    salary?: number;
    sections?: Array<NursesQueryResponseDataSection>;
    updated_at?: number;
    user?: NursesQueryResponseDataUser;
    warning?: number;
};

