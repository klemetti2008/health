
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, PermissionsCreateResponse, ErrorResponse, PermissionsCreateRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type permissionsIdUpdateMutationType = { 
    requestBody: PermissionsCreateRequestBody, 
id?: number

}

export function usePermissionsIdUpdateMutation(
  options?: UseMutationOptions<PermissionsCreateResponse, ErrorResponse,  permissionsIdUpdateMutationType>
) {
  return useMutation<PermissionsCreateResponse, ErrorResponse,  permissionsIdUpdateMutationType>(
    (data: permissionsIdUpdateMutationType) => apiClient.permission.permissionsIdUpdateMutation(data.requestBody , data.id ),
    options
  );
}
