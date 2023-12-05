
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, RolesCreateResponse, ErrorResponse, RolesCreateRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type rolesNameUpdateMutationType = { 
    name: string, 
requestBody: RolesCreateRequestBody

}

export function useRolesNameUpdateMutation(
  options?: UseMutationOptions<RolesCreateResponse, ErrorResponse,  rolesNameUpdateMutationType>
) {
  return useMutation<RolesCreateResponse, ErrorResponse,  rolesNameUpdateMutationType>(
    (data: rolesNameUpdateMutationType) => apiClient.role.rolesNameUpdateMutation(data.name , data.requestBody ),
    options
  );
}
