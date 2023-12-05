
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, NursesUpdatePermissionResponse, ErrorResponse, NursesUpdatePermissionRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type nursesPermissionsIdUpdateMutationType = { 
    id: number, 
requestBody: NursesUpdatePermissionRequestBody

}

export function useNursesPermissionsIdUpdateMutation(
  options?: UseMutationOptions<NursesUpdatePermissionResponse, ErrorResponse,  nursesPermissionsIdUpdateMutationType>
) {
  return useMutation<NursesUpdatePermissionResponse, ErrorResponse,  nursesPermissionsIdUpdateMutationType>(
    (data: nursesPermissionsIdUpdateMutationType) => apiClient.nurse.nursesPermissionsIdUpdateMutation(data.id , data.requestBody ),
    options
  );
}
