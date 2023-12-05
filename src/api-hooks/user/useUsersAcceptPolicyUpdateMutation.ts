
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, UsersAcceptPolicyResponse, ErrorResponse }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type usersAcceptPolicyUpdateMutationType = { 
    
}

export function useUsersAcceptPolicyUpdateMutation(
  options?: UseMutationOptions<UsersAcceptPolicyResponse, ErrorResponse,  usersAcceptPolicyUpdateMutationType>
) {
  return useMutation<UsersAcceptPolicyResponse, ErrorResponse,  usersAcceptPolicyUpdateMutationType>(
    (data: usersAcceptPolicyUpdateMutationType) => apiClient.user.usersAcceptPolicyUpdateMutation(),
    options
  );
}
