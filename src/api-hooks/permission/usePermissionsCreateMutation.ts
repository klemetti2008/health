
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, PermissionsCreateResponse, ErrorResponse, PermissionsCreateRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type permissionsCreateMutationType = { 
    requestBody: PermissionsCreateRequestBody

}

export function usePermissionsCreateMutation(
  options?: UseMutationOptions<PermissionsCreateResponse, ErrorResponse,  permissionsCreateMutationType>
) {
  return useMutation<PermissionsCreateResponse, ErrorResponse,  permissionsCreateMutationType>(
    (data: permissionsCreateMutationType) => apiClient.permission.permissionsCreateMutation(data.requestBody ),
    options
  );
}
