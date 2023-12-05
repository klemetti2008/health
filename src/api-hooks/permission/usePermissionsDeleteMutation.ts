
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, PermissionsCreateResponse, ErrorResponse, PermissionsDeleteRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type permissionsDeleteMutationType = { 
    requestBody: PermissionsDeleteRequestBody

}

export function usePermissionsDeleteMutation(
  options?: UseMutationOptions<PermissionsCreateResponse, ErrorResponse,  permissionsDeleteMutationType>
) {
  return useMutation<PermissionsCreateResponse, ErrorResponse,  permissionsDeleteMutationType>(
    (data: permissionsDeleteMutationType) => apiClient.permission.permissionsDeleteMutation(data.requestBody ),
    options
  );
}
