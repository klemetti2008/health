
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from 'react-query';
import { MajaClient, AbilitiesQueryResponse, ErrorResponse, AbilityFilterType }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type abilitiesCsvDownloadQueryType = { 
    filters: AbilityFilterType, 
id?: number, 
page?: number, 
limit?: number

}

export function useAbilitiesCsvDownloadQuery(
  queryFnArgs: abilitiesCsvDownloadQueryType,
  options?: UseQueryOptions<AbilitiesQueryResponse, ErrorResponse>,
) {
  const queryKey = ["abilitiesCsvDownloadQuery", JSON.stringify(queryFnArgs)];

  return useQuery<AbilitiesQueryResponse, ErrorResponse>(
    queryKey,
    async (): Promise<AbilitiesQueryResponse> => apiClient.ability.abilitiesCsvDownloadQuery(queryFnArgs.filters , queryFnArgs.id , queryFnArgs.page , queryFnArgs.limit ),
    options
  );
}
