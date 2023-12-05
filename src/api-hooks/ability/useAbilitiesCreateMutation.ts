
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, AbilitiesCreateResponse, ErrorResponse, AbilitiesCreateRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type abilitiesCreateMutationType = { 
    requestBody: AbilitiesCreateRequestBody

}

export function useAbilitiesCreateMutation(
  options?: UseMutationOptions<AbilitiesCreateResponse, ErrorResponse,  abilitiesCreateMutationType>
) {
  return useMutation<AbilitiesCreateResponse, ErrorResponse,  abilitiesCreateMutationType>(
    (data: abilitiesCreateMutationType) => apiClient.ability.abilitiesCreateMutation(data.requestBody ),
    options
  );
}
