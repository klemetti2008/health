/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { VehiclesQueryResponseDataItemLanguageSkill } from './VehiclesQueryResponseDataItemLanguageSkill';
import type { VehiclesQueryResponseDataItemRole } from './VehiclesQueryResponseDataItemRole';

export type VehiclesQueryResponseDataItemUser = {
    accountNumber?: string;
    avatarUrl?: string;
    birthDate?: string;
    created_at?: string;
    deleted_at?: string;
    email?: string;
    firstName?: string;
    forcedChangePassword?: boolean;
    gender?: string;
    id?: number;
    languageSkills?: Array<VehiclesQueryResponseDataItemLanguageSkill>;
    lastName?: string;
    nationalCode?: string;
    password?: string;
    phone?: string;
    privacy_policy_accepted_at?: string;
    registrationNumber?: string;
    role?: VehiclesQueryResponseDataItemRole;
    roleId?: number;
    suspended_at?: string;
    telephone?: string;
    updated_at?: string;
    username?: string;
    workPhoneNumber?: string;
};

