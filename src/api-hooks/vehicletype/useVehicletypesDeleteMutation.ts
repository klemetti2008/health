
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, VehicleTypesCreateResponse, ErrorResponse, VehicleTypesDeleteRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type vehicletypesDeleteMutationType = { 
    requestBody: VehicleTypesDeleteRequestBody

}

export function useVehicletypesDeleteMutation(
  options?: UseMutationOptions<VehicleTypesCreateResponse, ErrorResponse,  vehicletypesDeleteMutationType>
) {
  return useMutation<VehicleTypesCreateResponse, ErrorResponse,  vehicletypesDeleteMutationType>(
    (data: vehicletypesDeleteMutationType) => apiClient.vehicletype.vehicletypesDeleteMutation(data.requestBody ),
    options
  );
}
