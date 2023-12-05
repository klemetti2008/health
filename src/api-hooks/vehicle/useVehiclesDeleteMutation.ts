
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, VehiclesCreateResponse, ErrorResponse, VehiclesDeleteRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type vehiclesDeleteMutationType = { 
    requestBody: VehiclesDeleteRequestBody

}

export function useVehiclesDeleteMutation(
  options?: UseMutationOptions<VehiclesCreateResponse, ErrorResponse,  vehiclesDeleteMutationType>
) {
  return useMutation<VehiclesCreateResponse, ErrorResponse,  vehiclesDeleteMutationType>(
    (data: vehiclesDeleteMutationType) => apiClient.vehicle.vehiclesDeleteMutation(data.requestBody ),
    options
  );
}
