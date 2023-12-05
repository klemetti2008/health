
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, GearTypesCreateResponse, ErrorResponse, GearTypesCreateRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type geartypesCreateMutationType = { 
    requestBody: GearTypesCreateRequestBody

}

export function useGeartypesCreateMutation(
  options?: UseMutationOptions<GearTypesCreateResponse, ErrorResponse,  geartypesCreateMutationType>
) {
  return useMutation<GearTypesCreateResponse, ErrorResponse,  geartypesCreateMutationType>(
    (data: geartypesCreateMutationType) => apiClient.geartype.geartypesCreateMutation(data.requestBody ),
    options
  );
}
