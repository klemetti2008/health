/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GenderEnum } from './GenderEnum';
import type { UsersUpdateRequestBodyLanguageSkill } from './UsersUpdateRequestBodyLanguageSkill';
import type { UserTypeEnum } from './UserTypeEnum';

export type UsersUpdateRequestBody = {
    accountNumber?: string;
    avatarUrl?: string;
    birthDate?: string;
    email?: string;
    firstName?: string;
    forcedChangePassword?: boolean;
    gender?: GenderEnum;
    languageSkills?: Array<UsersUpdateRequestBodyLanguageSkill>;
    lastName?: string;
    nationalCode?: string;
    password?: string;
    phone?: string;
    registrationNumber?: string;
    userType: UserTypeEnum;
    username?: string;
    workPhoneNumber?: string;
};

