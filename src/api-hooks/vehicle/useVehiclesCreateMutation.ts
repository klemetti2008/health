
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, VehiclesCreateResponse, ErrorResponse, VehiclesCreateRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type vehiclesCreateMutationType = { 
    requestBody: VehiclesCreateRequestBody

}

export function useVehiclesCreateMutation(
  options?: UseMutationOptions<VehiclesCreateResponse, ErrorResponse,  vehiclesCreateMutationType>
) {
  return useMutation<VehiclesCreateResponse, ErrorResponse,  vehiclesCreateMutationType>(
    (data: vehiclesCreateMutationType) => apiClient.vehicle.vehiclesCreateMutation(data.requestBody ),
    options
  );
}
