
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from 'react-query';
import { MajaClient, VehiclesQueryResponse, ErrorResponse, VehicleFilterType }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type vehiclesQueryType = { 
    id?: number, 
page?: number, 
limit?: number, 
filters: VehicleFilterType

}

export function useVehiclesQuery(
  queryFnArgs: vehiclesQueryType,
  options?: UseQueryOptions<VehiclesQueryResponse, ErrorResponse>,
) {
  const queryKey = ["vehiclesQuery", JSON.stringify(queryFnArgs)];

  return useQuery<VehiclesQueryResponse, ErrorResponse>(
    queryKey,
    async (): Promise<VehiclesQueryResponse> => apiClient.vehicle.vehiclesQuery(queryFnArgs.id , queryFnArgs.page , queryFnArgs.limit , queryFnArgs.filters ),
    options
  );
}
