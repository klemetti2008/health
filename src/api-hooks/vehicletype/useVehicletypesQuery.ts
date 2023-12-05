
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from 'react-query';
import { MajaClient, VehicleTypesQueryResponse, ErrorResponse, VehicleTypeFilterType }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type vehicletypesQueryType = { 
    id?: number, 
page?: number, 
limit?: number, 
filters: VehicleTypeFilterType

}

export function useVehicletypesQuery(
  queryFnArgs: vehicletypesQueryType,
  options?: UseQueryOptions<VehicleTypesQueryResponse, ErrorResponse>,
) {
  const queryKey = ["vehicletypesQuery", JSON.stringify(queryFnArgs)];

  return useQuery<VehicleTypesQueryResponse, ErrorResponse>(
    queryKey,
    async (): Promise<VehicleTypesQueryResponse> => apiClient.vehicletype.vehicletypesQuery(queryFnArgs.id , queryFnArgs.page , queryFnArgs.limit , queryFnArgs.filters ),
    options
  );
}
