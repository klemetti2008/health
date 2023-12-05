/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { NursesCreateOrUpdateContractResponseDataAbsence } from './NursesCreateOrUpdateContractResponseDataAbsence';
import type { NursesCreateOrUpdateContractResponseDataAvailableShift } from './NursesCreateOrUpdateContractResponseDataAvailableShift';
import type { NursesCreateOrUpdateContractResponseDataContractType } from './NursesCreateOrUpdateContractResponseDataContractType';
import type { NursesCreateOrUpdateContractResponseDataNurseType } from './NursesCreateOrUpdateContractResponseDataNurseType';
import type { NursesCreateOrUpdateContractResponseDataPaymentType } from './NursesCreateOrUpdateContractResponseDataPaymentType';
import type { NursesCreateOrUpdateContractResponseDataPermission } from './NursesCreateOrUpdateContractResponseDataPermission';
import type { NursesCreateOrUpdateContractResponseDataSection } from './NursesCreateOrUpdateContractResponseDataSection';
import type { NursesCreateOrUpdateContractResponseDataUser } from './NursesCreateOrUpdateContractResponseDataUser';

export type NursesCreateOrUpdateContractResponseData = {
    absences?: Array<NursesCreateOrUpdateContractResponseDataAbsence>;
    addresses?: Array<NursesCreateOrUpdateContractResponseDataUser>;
    availableShifts?: Array<NursesCreateOrUpdateContractResponseDataAvailableShift>;
    certificateCode?: string;
    companyRegistrationNumber?: string;
    contract_expires_at?: number;
    contract_started_at?: number;
    contractTypes?: Array<NursesCreateOrUpdateContractResponseDataContractType>;
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
    nurseTypes?: Array<NursesCreateOrUpdateContractResponseDataNurseType>;
    paymentType?: NursesCreateOrUpdateContractResponseDataPaymentType;
    percentLengthInContract?: number;
    permissions?: Array<NursesCreateOrUpdateContractResponseDataPermission>;
    progress?: number;
    quiz_time?: number;
    salary?: number;
    sections?: Array<NursesCreateOrUpdateContractResponseDataSection>;
    updated_at?: number;
    user?: NursesCreateOrUpdateContractResponseDataUser;
    warning?: number;
};

