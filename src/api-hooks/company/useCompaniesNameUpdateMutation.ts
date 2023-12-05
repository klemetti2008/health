
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, CompaniesCreateResponse, ErrorResponse, CompaniesCreateRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type companiesNameUpdateMutationType = { 
    name: string, 
requestBody: CompaniesCreateRequestBody

}

export function useCompaniesNameUpdateMutation(
  options?: UseMutationOptions<CompaniesCreateResponse, ErrorResponse,  companiesNameUpdateMutationType>
) {
  return useMutation<CompaniesCreateResponse, ErrorResponse,  companiesNameUpdateMutationType>(
    (data: companiesNameUpdateMutationType) => apiClient.company.companiesNameUpdateMutation(data.name , data.requestBody ),
    options
  );
}
