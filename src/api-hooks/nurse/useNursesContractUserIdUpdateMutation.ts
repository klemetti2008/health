
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, NursesCreateOrUpdateContractResponse, ErrorResponse, NursesCreateOrUpdateContractRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type nursesContractUserIdUpdateMutationType = { 
    userId: number, 
requestBody: NursesCreateOrUpdateContractRequestBody

}

export function useNursesContractUserIdUpdateMutation(
  options?: UseMutationOptions<NursesCreateOrUpdateContractResponse, ErrorResponse,  nursesContractUserIdUpdateMutationType>
) {
  return useMutation<NursesCreateOrUpdateContractResponse, ErrorResponse,  nursesContractUserIdUpdateMutationType>(
    (data: nursesContractUserIdUpdateMutationType) => apiClient.nurse.nursesContractUserIdUpdateMutation(data.userId , data.requestBody ),
    options
  );
}
