
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, AbilitiesCreateResponse, ErrorResponse, AbilitiesCreateRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type abilitiesNameUpdateMutationType = { 
    name: string, 
requestBody: AbilitiesCreateRequestBody

}

export function useAbilitiesNameUpdateMutation(
  options?: UseMutationOptions<AbilitiesCreateResponse, ErrorResponse,  abilitiesNameUpdateMutationType>
) {
  return useMutation<AbilitiesCreateResponse, ErrorResponse,  abilitiesNameUpdateMutationType>(
    (data: abilitiesNameUpdateMutationType) => apiClient.ability.abilitiesNameUpdateMutation(data.name , data.requestBody ),
    options
  );
}
