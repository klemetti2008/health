
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, NursesDeleteResponse, ErrorResponse, NursesDeleteRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type nursesDeleteMutationType = { 
    requestBody: NursesDeleteRequestBody

}

export function useNursesDeleteMutation(
  options?: UseMutationOptions<NursesDeleteResponse, ErrorResponse,  nursesDeleteMutationType>
) {
  return useMutation<NursesDeleteResponse, ErrorResponse,  nursesDeleteMutationType>(
    (data: nursesDeleteMutationType) => apiClient.nurse.nursesDeleteMutation(data.requestBody ),
    options
  );
}
