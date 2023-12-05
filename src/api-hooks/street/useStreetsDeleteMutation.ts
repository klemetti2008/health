
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, StreetsCreateResponse, ErrorResponse, StreetsDeleteRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type streetsDeleteMutationType = { 
    requestBody: StreetsDeleteRequestBody

}

export function useStreetsDeleteMutation(
  options?: UseMutationOptions<StreetsCreateResponse, ErrorResponse,  streetsDeleteMutationType>
) {
  return useMutation<StreetsCreateResponse, ErrorResponse,  streetsDeleteMutationType>(
    (data: streetsDeleteMutationType) => apiClient.street.streetsDeleteMutation(data.requestBody ),
    options
  );
}
