
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, LanguageSkillsCreateResponse, ErrorResponse, LanguageSkillsCreateRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type languageskillsNameUpdateMutationType = { 
    name: string, 
requestBody: LanguageSkillsCreateRequestBody

}

export function useLanguageskillsNameUpdateMutation(
  options?: UseMutationOptions<LanguageSkillsCreateResponse, ErrorResponse,  languageskillsNameUpdateMutationType>
) {
  return useMutation<LanguageSkillsCreateResponse, ErrorResponse,  languageskillsNameUpdateMutationType>(
    (data: languageskillsNameUpdateMutationType) => apiClient.languageskill.languageskillsNameUpdateMutation(data.name , data.requestBody ),
    options
  );
}
