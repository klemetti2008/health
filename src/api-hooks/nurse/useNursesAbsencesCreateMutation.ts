
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, NursesCreateAbsencesResponse, ErrorResponse, NursesCreateAbsencesRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type nursesAbsencesCreateMutationType = { 
    requestBody: NursesCreateAbsencesRequestBody

}

export function useNursesAbsencesCreateMutation(
  options?: UseMutationOptions<NursesCreateAbsencesResponse, ErrorResponse,  nursesAbsencesCreateMutationType>
) {
  return useMutation<NursesCreateAbsencesResponse, ErrorResponse,  nursesAbsencesCreateMutationType>(
    (data: nursesAbsencesCreateMutationType) => apiClient.nurse.nursesAbsencesCreateMutation(data.requestBody ),
    options
  );
}
