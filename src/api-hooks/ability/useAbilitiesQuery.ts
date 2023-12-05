
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from 'react-query';
import { MajaClient, AbilitiesQueryResponse, ErrorResponse, AbilityFilterType }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type abilitiesQueryType = { 
    limit?: number, 
filters: AbilityFilterType, 
id?: number, 
page?: number

}

export function useAbilitiesQuery(
  queryFnArgs: abilitiesQueryType,
  options?: UseQueryOptions<AbilitiesQueryResponse, ErrorResponse>,
) {
  const queryKey = ["abilitiesQuery", JSON.stringify(queryFnArgs)];

  return useQuery<AbilitiesQueryResponse, ErrorResponse>(
    queryKey,
    async (): Promise<AbilitiesQueryResponse> => apiClient.ability.abilitiesQuery(queryFnArgs.limit , queryFnArgs.filters , queryFnArgs.id , queryFnArgs.page ),
    options
  );
}
