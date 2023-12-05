
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, VehicleTypesCreateResponse, ErrorResponse, VehicleTypesCreateRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type vehicletypesCreateMutationType = { 
    requestBody: VehicleTypesCreateRequestBody

}

export function useVehicletypesCreateMutation(
  options?: UseMutationOptions<VehicleTypesCreateResponse, ErrorResponse,  vehicletypesCreateMutationType>
) {
  return useMutation<VehicleTypesCreateResponse, ErrorResponse,  vehicletypesCreateMutationType>(
    (data: vehicletypesCreateMutationType) => apiClient.vehicletype.vehicletypesCreateMutation(data.requestBody ),
    options
  );
}
