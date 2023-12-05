
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, NursesCreatePermissionsResponse, ErrorResponse, NursesCreatePermissionsRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type nursesPermissionsCreateMutationType = { 
    requestBody: NursesCreatePermissionsRequestBody

}

export function useNursesPermissionsCreateMutation(
  options?: UseMutationOptions<NursesCreatePermissionsResponse, ErrorResponse,  nursesPermissionsCreateMutationType>
) {
  return useMutation<NursesCreatePermissionsResponse, ErrorResponse,  nursesPermissionsCreateMutationType>(
    (data: nursesPermissionsCreateMutationType) => apiClient.nurse.nursesPermissionsCreateMutation(data.requestBody ),
    options
  );
}
