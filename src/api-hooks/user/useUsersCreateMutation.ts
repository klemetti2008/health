
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, UsersCreateResponse, ErrorResponse, UsersCreateRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type usersCreateMutationType = { 
    requestBody: UsersCreateRequestBody

}

export function useUsersCreateMutation(
  options?: UseMutationOptions<UsersCreateResponse, ErrorResponse,  usersCreateMutationType>
) {
  return useMutation<UsersCreateResponse, ErrorResponse,  usersCreateMutationType>(
    (data: usersCreateMutationType) => apiClient.user.usersCreateMutation(data.requestBody ),
    options
  );
}
