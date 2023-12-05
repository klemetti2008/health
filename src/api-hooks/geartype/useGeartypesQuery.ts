
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from 'react-query';
import { MajaClient, GearTypesQueryResponse, ErrorResponse, GearTypeFilterType }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type geartypesQueryType = { 
    id?: number, 
page?: number, 
limit?: number, 
filters: GearTypeFilterType

}

export function useGeartypesQuery(
  queryFnArgs: geartypesQueryType,
  options?: UseQueryOptions<GearTypesQueryResponse, ErrorResponse>,
) {
  const queryKey = ["geartypesQuery", JSON.stringify(queryFnArgs)];

  return useQuery<GearTypesQueryResponse, ErrorResponse>(
    queryKey,
    async (): Promise<GearTypesQueryResponse> => apiClient.geartype.geartypesQuery(queryFnArgs.id , queryFnArgs.page , queryFnArgs.limit , queryFnArgs.filters ),
    options
  );
}
