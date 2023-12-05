
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, UsersResetPasswordResponse, ErrorResponse, UsersResetPasswordRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type usersResetPasswordUpdateMutationType = { 
    requestBody: UsersResetPasswordRequestBody

}

export function useUsersResetPasswordUpdateMutation(
  options?: UseMutationOptions<UsersResetPasswordResponse, ErrorResponse,  usersResetPasswordUpdateMutationType>
) {
  return useMutation<UsersResetPasswordResponse, ErrorResponse,  usersResetPasswordUpdateMutationType>(
    (data: usersResetPasswordUpdateMutationType) => apiClient.user.usersResetPasswordUpdateMutation(data.requestBody ),
    options
  );
}
