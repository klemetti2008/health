
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, VehiclesCreateResponse, ErrorResponse, VehiclesCreateRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type vehiclesIdUpdateMutationType = { 
    requestBody: VehiclesCreateRequestBody, 
id?: number

}

export function useVehiclesIdUpdateMutation(
  options?: UseMutationOptions<VehiclesCreateResponse, ErrorResponse,  vehiclesIdUpdateMutationType>
) {
  return useMutation<VehiclesCreateResponse, ErrorResponse,  vehiclesIdUpdateMutationType>(
    (data: vehiclesIdUpdateMutationType) => apiClient.vehicle.vehiclesIdUpdateMutation(data.requestBody , data.id ),
    options
  );
}
