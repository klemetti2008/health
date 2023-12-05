
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from 'react-query';
import { MajaClient, VehicleTypesQueryResponse, ErrorResponse, VehicleTypeFilterType }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type vehicletypesCsvDownloadQueryType = { 
    limit?: number, 
filters: VehicleTypeFilterType, 
id?: number, 
page?: number

}

export function useVehicletypesCsvDownloadQuery(
  queryFnArgs: vehicletypesCsvDownloadQueryType,
  options?: UseQueryOptions<VehicleTypesQueryResponse, ErrorResponse>,
) {
  const queryKey = ["vehicletypesCsvDownloadQuery", JSON.stringify(queryFnArgs)];

  return useQuery<VehicleTypesQueryResponse, ErrorResponse>(
    queryKey,
    async (): Promise<VehicleTypesQueryResponse> => apiClient.vehicletype.vehicletypesCsvDownloadQuery(queryFnArgs.limit , queryFnArgs.filters , queryFnArgs.id , queryFnArgs.page ),
    options
  );
}
