
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, UsersChangePasswordResponse, ErrorResponse, UsersChangePasswordRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type usersChangePasswordUpdateMutationType = { 
    requestBody: UsersChangePasswordRequestBody

}

export function useUsersChangePasswordUpdateMutation(
  options?: UseMutationOptions<UsersChangePasswordResponse, ErrorResponse,  usersChangePasswordUpdateMutationType>
) {
  return useMutation<UsersChangePasswordResponse, ErrorResponse,  usersChangePasswordUpdateMutationType>(
    (data: usersChangePasswordUpdateMutationType) => apiClient.user.usersChangePasswordUpdateMutation(data.requestBody ),
    options
  );
}
