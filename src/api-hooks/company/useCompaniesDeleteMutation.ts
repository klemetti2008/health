
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, CompaniesCreateResponse, ErrorResponse, CompaniesDeleteRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type companiesDeleteMutationType = { 
    requestBody: CompaniesDeleteRequestBody

}

export function useCompaniesDeleteMutation(
  options?: UseMutationOptions<CompaniesCreateResponse, ErrorResponse,  companiesDeleteMutationType>
) {
  return useMutation<CompaniesCreateResponse, ErrorResponse,  companiesDeleteMutationType>(
    (data: companiesDeleteMutationType) => apiClient.company.companiesDeleteMutation(data.requestBody ),
    options
  );
}
