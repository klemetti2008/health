
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, StreetsCreateResponse, ErrorResponse, StreetsCreateRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type streetsCreateMutationType = { 
    requestBody: StreetsCreateRequestBody

}

export function useStreetsCreateMutation(
  options?: UseMutationOptions<StreetsCreateResponse, ErrorResponse,  streetsCreateMutationType>
) {
  return useMutation<StreetsCreateResponse, ErrorResponse,  streetsCreateMutationType>(
    (data: streetsCreateMutationType) => apiClient.street.streetsCreateMutation(data.requestBody ),
    options
  );
}
