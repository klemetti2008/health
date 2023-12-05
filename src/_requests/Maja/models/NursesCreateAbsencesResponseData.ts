/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { NursesCreateAbsencesResponseDataAbsence } from './NursesCreateAbsencesResponseDataAbsence';
import type { NursesCreateAbsencesResponseDataAvailableShift } from './NursesCreateAbsencesResponseDataAvailableShift';
import type { NursesCreateAbsencesResponseDataContractType } from './NursesCreateAbsencesResponseDataContractType';
import type { NursesCreateAbsencesResponseDataNurseType } from './NursesCreateAbsencesResponseDataNurseType';
import type { NursesCreateAbsencesResponseDataPaymentType } from './NursesCreateAbsencesResponseDataPaymentType';
import type { NursesCreateAbsencesResponseDataPermission } from './NursesCreateAbsencesResponseDataPermission';
import type { NursesCreateAbsencesResponseDataSection } from './NursesCreateAbsencesResponseDataSection';
import type { NursesCreateAbsencesResponseDataUser } from './NursesCreateAbsencesResponseDataUser';

export type NursesCreateAbsencesResponseData = {
    absences?: Array<NursesCreateAbsencesResponseDataAbsence>;
    addresses?: Array<NursesCreateAbsencesResponseDataUser>;
    availableShifts?: Array<NursesCreateAbsencesResponseDataAvailableShift>;
    certificateCode?: string;
    companyRegistrationNumber?: string;
    contract_expires_at?: number;
    contract_started_at?: number;
    contractTypes?: Array<NursesCreateAbsencesResponseDataContractType>;
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
    nurseTypes?: Array<NursesCreateAbsencesResponseDataNurseType>;
    paymentType?: NursesCreateAbsencesResponseDataPaymentType;
    percentLengthInContract?: number;
    permissions?: Array<NursesCreateAbsencesResponseDataPermission>;
    progress?: number;
    quiz_time?: number;
    salary?: number;
    sections?: Array<NursesCreateAbsencesResponseDataSection>;
    updated_at?: number;
    user?: NursesCreateAbsencesResponseDataUser;
    warning?: number;
};

