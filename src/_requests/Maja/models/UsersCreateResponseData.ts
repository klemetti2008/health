/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UsersCreateResponseDataLanguageSkill } from './UsersCreateResponseDataLanguageSkill';
import type { UsersCreateResponseDataRole } from './UsersCreateResponseDataRole';

export type UsersCreateResponseData = {
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
    languageSkills?: Array<UsersCreateResponseDataLanguageSkill>;
    lastName?: string;
    nationalCode?: string;
    nurseId?: number;
    password?: string;
    phone?: string;
    privacy_policy_accepted_at?: string;
    registrationNumber?: string;
    role?: UsersCreateResponseDataRole;
    roleId?: number;
    suspended_at?: string;
    telephone?: string;
    updated_at?: string;
    username?: string;
    workPhoneNumber?: string;
};

