
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from 'react-query';
import { MajaClient, VehiclesQueryResponse, ErrorResponse, VehicleFilterType }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type vehiclesCsvDownloadQueryType = { 
    id?: number, 
page?: number, 
limit?: number, 
filters: VehicleFilterType

}

export function useVehiclesCsvDownloadQuery(
  queryFnArgs: vehiclesCsvDownloadQueryType,
  options?: UseQueryOptions<VehiclesQueryResponse, ErrorResponse>,
) {
  const queryKey = ["vehiclesCsvDownloadQuery", JSON.stringify(queryFnArgs)];

  return useQuery<VehiclesQueryResponse, ErrorResponse>(
    queryKey,
    async (): Promise<VehiclesQueryResponse> => apiClient.vehicle.vehiclesCsvDownloadQuery(queryFnArgs.id , queryFnArgs.page , queryFnArgs.limit , queryFnArgs.filters ),
    options
  );
}
