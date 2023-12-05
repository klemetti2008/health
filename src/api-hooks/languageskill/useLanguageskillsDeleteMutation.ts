
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, LanguageSkillsCreateResponse, ErrorResponse, LanguageSkillsDeleteRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type languageskillsDeleteMutationType = { 
    requestBody: LanguageSkillsDeleteRequestBody

}

export function useLanguageskillsDeleteMutation(
  options?: UseMutationOptions<LanguageSkillsCreateResponse, ErrorResponse,  languageskillsDeleteMutationType>
) {
  return useMutation<LanguageSkillsCreateResponse, ErrorResponse,  languageskillsDeleteMutationType>(
    (data: languageskillsDeleteMutationType) => apiClient.languageskill.languageskillsDeleteMutation(data.requestBody ),
    options
  );
}
