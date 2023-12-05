
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, GearTypesCreateResponse, ErrorResponse, GearTypesDeleteRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type geartypesDeleteMutationType = { 
    requestBody: GearTypesDeleteRequestBody

}

export function useGeartypesDeleteMutation(
  options?: UseMutationOptions<GearTypesCreateResponse, ErrorResponse,  geartypesDeleteMutationType>
) {
  return useMutation<GearTypesCreateResponse, ErrorResponse,  geartypesDeleteMutationType>(
    (data: geartypesDeleteMutationType) => apiClient.geartype.geartypesDeleteMutation(data.requestBody ),
    options
  );
}
