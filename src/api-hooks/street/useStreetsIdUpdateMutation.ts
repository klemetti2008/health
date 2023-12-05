
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, StreetsCreateResponse, ErrorResponse, StreetsCreateRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type streetsIdUpdateMutationType = { 
    id: number, 
requestBody: StreetsCreateRequestBody

}

export function useStreetsIdUpdateMutation(
  options?: UseMutationOptions<StreetsCreateResponse, ErrorResponse,  streetsIdUpdateMutationType>
) {
  return useMutation<StreetsCreateResponse, ErrorResponse,  streetsIdUpdateMutationType>(
    (data: streetsIdUpdateMutationType) => apiClient.street.streetsIdUpdateMutation(data.id , data.requestBody ),
    options
  );
}
