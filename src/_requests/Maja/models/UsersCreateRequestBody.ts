/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GenderEnum } from './GenderEnum';
import type { UsersCreateRequestBodyLanguageSkill } from './UsersCreateRequestBodyLanguageSkill';
import type { UserTypeEnum } from './UserTypeEnum';

export type UsersCreateRequestBody = {
    accountNumber?: string;
    avatarUrl?: string;
    birthDate?: string;
    email?: string;
    firstName?: string;
    forcedChangePassword?: boolean;
    gender?: GenderEnum;
    languageSkills?: Array<UsersCreateRequestBodyLanguageSkill>;
    lastName?: string;
    nationalCode?: string;
    password?: string;
    phone?: string;
    registrationNumber?: string;
    userType: UserTypeEnum;
    username?: string;
    workPhoneNumber?: string;
};

