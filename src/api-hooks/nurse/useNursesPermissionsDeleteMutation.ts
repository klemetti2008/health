
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, NursesDeletePermissionsResponse, ErrorResponse, NursesDeletePermissionsRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type nursesPermissionsDeleteMutationType = { 
    requestBody: NursesDeletePermissionsRequestBody

}

export function useNursesPermissionsDeleteMutation(
  options?: UseMutationOptions<NursesDeletePermissionsResponse, ErrorResponse,  nursesPermissionsDeleteMutationType>
) {
  return useMutation<NursesDeletePermissionsResponse, ErrorResponse,  nursesPermissionsDeleteMutationType>(
    (data: nursesPermissionsDeleteMutationType) => apiClient.nurse.nursesPermissionsDeleteMutation(data.requestBody ),
    options
  );
}
