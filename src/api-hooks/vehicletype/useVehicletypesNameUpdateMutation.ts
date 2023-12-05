
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, VehicleTypesCreateResponse, ErrorResponse, VehicleTypesCreateRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type vehicletypesNameUpdateMutationType = { 
    name: string, 
requestBody: VehicleTypesCreateRequestBody

}

export function useVehicletypesNameUpdateMutation(
  options?: UseMutationOptions<VehicleTypesCreateResponse, ErrorResponse,  vehicletypesNameUpdateMutationType>
) {
  return useMutation<VehicleTypesCreateResponse, ErrorResponse,  vehicletypesNameUpdateMutationType>(
    (data: vehicletypesNameUpdateMutationType) => apiClient.vehicletype.vehicletypesNameUpdateMutation(data.name , data.requestBody ),
    options
  );
}
