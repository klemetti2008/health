
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, RolesCreateResponse, ErrorResponse, RolesCreateRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type rolesCreateMutationType = { 
    requestBody: RolesCreateRequestBody

}

export function useRolesCreateMutation(
  options?: UseMutationOptions<RolesCreateResponse, ErrorResponse,  rolesCreateMutationType>
) {
  return useMutation<RolesCreateResponse, ErrorResponse,  rolesCreateMutationType>(
    (data: rolesCreateMutationType) => apiClient.role.rolesCreateMutation(data.requestBody ),
    options
  );
}
