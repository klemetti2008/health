
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, UsersCreateResponse, ErrorResponse, UsersUpdateRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type usersIdUpdateMutationType = { 
    id: number, 
requestBody: UsersUpdateRequestBody

}

export function useUsersIdUpdateMutation(
  options?: UseMutationOptions<UsersCreateResponse, ErrorResponse,  usersIdUpdateMutationType>
) {
  return useMutation<UsersCreateResponse, ErrorResponse,  usersIdUpdateMutationType>(
    (data: usersIdUpdateMutationType) => apiClient.user.usersIdUpdateMutation(data.id , data.requestBody ),
    options
  );
}
