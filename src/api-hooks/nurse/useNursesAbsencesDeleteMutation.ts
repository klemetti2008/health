
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, NursesDeleteAbsencesResponse, ErrorResponse, NursesDeleteAbsencesRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type nursesAbsencesDeleteMutationType = { 
    requestBody: NursesDeleteAbsencesRequestBody

}

export function useNursesAbsencesDeleteMutation(
  options?: UseMutationOptions<NursesDeleteAbsencesResponse, ErrorResponse,  nursesAbsencesDeleteMutationType>
) {
  return useMutation<NursesDeleteAbsencesResponse, ErrorResponse,  nursesAbsencesDeleteMutationType>(
    (data: nursesAbsencesDeleteMutationType) => apiClient.nurse.nursesAbsencesDeleteMutation(data.requestBody ),
    options
  );
}
