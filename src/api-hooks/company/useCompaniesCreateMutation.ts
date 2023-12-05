
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, CompaniesCreateResponse, ErrorResponse, CompaniesCreateRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type companiesCreateMutationType = { 
    requestBody: CompaniesCreateRequestBody

}

export function useCompaniesCreateMutation(
  options?: UseMutationOptions<CompaniesCreateResponse, ErrorResponse,  companiesCreateMutationType>
) {
  return useMutation<CompaniesCreateResponse, ErrorResponse,  companiesCreateMutationType>(
    (data: companiesCreateMutationType) => apiClient.company.companiesCreateMutation(data.requestBody ),
    options
  );
}
