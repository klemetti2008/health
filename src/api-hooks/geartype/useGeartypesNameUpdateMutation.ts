
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, GearTypesCreateResponse, ErrorResponse, GearTypesCreateRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type geartypesNameUpdateMutationType = { 
    name: string, 
requestBody: GearTypesCreateRequestBody

}

export function useGeartypesNameUpdateMutation(
  options?: UseMutationOptions<GearTypesCreateResponse, ErrorResponse,  geartypesNameUpdateMutationType>
) {
  return useMutation<GearTypesCreateResponse, ErrorResponse,  geartypesNameUpdateMutationType>(
    (data: geartypesNameUpdateMutationType) => apiClient.geartype.geartypesNameUpdateMutation(data.name , data.requestBody ),
    options
  );
}
