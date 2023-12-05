
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, LanguageSkillsCreateResponse, ErrorResponse, LanguageSkillsCreateRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type languageskillsCreateMutationType = { 
    requestBody: LanguageSkillsCreateRequestBody

}

export function useLanguageskillsCreateMutation(
  options?: UseMutationOptions<LanguageSkillsCreateResponse, ErrorResponse,  languageskillsCreateMutationType>
) {
  return useMutation<LanguageSkillsCreateResponse, ErrorResponse,  languageskillsCreateMutationType>(
    (data: languageskillsCreateMutationType) => apiClient.languageskill.languageskillsCreateMutation(data.requestBody ),
    options
  );
}
