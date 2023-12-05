
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, AbilitiesCreateResponse, ErrorResponse, AbilitiesDeleteRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type abilitiesDeleteMutationType = { 
    requestBody: AbilitiesDeleteRequestBody

}

export function useAbilitiesDeleteMutation(
  options?: UseMutationOptions<AbilitiesCreateResponse, ErrorResponse,  abilitiesDeleteMutationType>
) {
  return useMutation<AbilitiesCreateResponse, ErrorResponse,  abilitiesDeleteMutationType>(
    (data: abilitiesDeleteMutationType) => apiClient.ability.abilitiesDeleteMutation(data.requestBody ),
    options
  );
}
