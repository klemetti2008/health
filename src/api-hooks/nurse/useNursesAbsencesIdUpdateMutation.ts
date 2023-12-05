
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, NursesUpdateAbsenceResponse, ErrorResponse, NursesUpdateAbsenceRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type nursesAbsencesIdUpdateMutationType = { 
    id: number, 
requestBody: NursesUpdateAbsenceRequestBody

}

export function useNursesAbsencesIdUpdateMutation(
  options?: UseMutationOptions<NursesUpdateAbsenceResponse, ErrorResponse,  nursesAbsencesIdUpdateMutationType>
) {
  return useMutation<NursesUpdateAbsenceResponse, ErrorResponse,  nursesAbsencesIdUpdateMutationType>(
    (data: nursesAbsencesIdUpdateMutationType) => apiClient.nurse.nursesAbsencesIdUpdateMutation(data.id , data.requestBody ),
    options
  );
}
