/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { NursesCreateOrUpdateContractRequestBodyAvailableShifts } from './NursesCreateOrUpdateContractRequestBodyAvailableShifts';
import type { NursesCreateOrUpdateContractRequestBodyContractType } from './NursesCreateOrUpdateContractRequestBodyContractType';
import type { NursesCreateOrUpdateContractRequestBodyNurseType } from './NursesCreateOrUpdateContractRequestBodyNurseType';
import type { NursesCreateOrUpdateContractRequestBodyPaymentType } from './NursesCreateOrUpdateContractRequestBodyPaymentType';
import type { NursesCreateOrUpdateContractRequestBodySection } from './NursesCreateOrUpdateContractRequestBodySection';

export type NursesCreateOrUpdateContractRequestBody = {
    availableShifts?: Array<NursesCreateOrUpdateContractRequestBodyAvailableShifts>;
    certificateCode?: string;
    companyRegistrationNumber?: string;
    contractExpiresAt?: string;
    contractStartedAt?: string;
    contractTypes?: Array<NursesCreateOrUpdateContractRequestBodyContractType>;
    experienceAmount?: number;
    experienceAmountUnit?: string;
    hourLengthInContract?: number;
    jobTitle?: string;
    joinedAt?: string;
    limitations?: string;
    nurseTypes?: Array<NursesCreateOrUpdateContractRequestBodyNurseType>;
    paymentType?: NursesCreateOrUpdateContractRequestBodyPaymentType;
    percentLengthInContract?: number;
    quizTime?: string;
    salary?: number;
    sections?: Array<NursesCreateOrUpdateContractRequestBodySection>;
};

