
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, RolesCreateResponse, ErrorResponse, RolesDeleteRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type rolesDeleteMutationType = { 
    requestBody: RolesDeleteRequestBody

}

export function useRolesDeleteMutation(
  options?: UseMutationOptions<RolesCreateResponse, ErrorResponse,  rolesDeleteMutationType>
) {
  return useMutation<RolesCreateResponse, ErrorResponse,  rolesDeleteMutationType>(
    (data: rolesDeleteMutationType) => apiClient.role.rolesDeleteMutation(data.requestBody ),
    options
  );
}
