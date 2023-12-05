
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, UsersCreateResponse, ErrorResponse, UsersDeleteRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type usersDeleteMutationType = { 
    requestBody: UsersDeleteRequestBody

}

export function useUsersDeleteMutation(
  options?: UseMutationOptions<UsersCreateResponse, ErrorResponse,  usersDeleteMutationType>
) {
  return useMutation<UsersCreateResponse, ErrorResponse,  usersDeleteMutationType>(
    (data: usersDeleteMutationType) => apiClient.user.usersDeleteMutation(data.requestBody ),
    options
  );
}
