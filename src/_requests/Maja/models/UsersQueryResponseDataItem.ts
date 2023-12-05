/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UsersQueryResponseDataLanguageSkill } from './UsersQueryResponseDataLanguageSkill';
import type { UsersQueryResponseDataRole } from './UsersQueryResponseDataRole';

export type UsersQueryResponseDataItem = {
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
    languageSkills?: Array<UsersQueryResponseDataLanguageSkill>;
    lastName?: string;
    nationalCode?: string;
    password?: string;
    phone?: string;
    privacy_policy_accepted_at?: string;
    registrationNumber?: string;
    role?: UsersQueryResponseDataRole;
    roleId?: number;
    suspended_at?: string;
    telephone?: string;
    updated_at?: string;
    username?: string;
    workPhoneNumber?: string;
};

