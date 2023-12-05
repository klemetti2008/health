
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from 'react-query';
import { MajaClient, StreetsQueryResponse, ErrorResponse, StreetFilterType }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type streetsCsvDownloadQueryType = { 
    id?: number, 
page?: number, 
limit?: number, 
filters: StreetFilterType

}

export function useStreetsCsvDownloadQuery(
  queryFnArgs: streetsCsvDownloadQueryType,
  options?: UseQueryOptions<StreetsQueryResponse, ErrorResponse>,
) {
  const queryKey = ["streetsCsvDownloadQuery", JSON.stringify(queryFnArgs)];

  return useQuery<StreetsQueryResponse, ErrorResponse>(
    queryKey,
    async (): Promise<StreetsQueryResponse> => apiClient.street.streetsCsvDownloadQuery(queryFnArgs.id , queryFnArgs.page , queryFnArgs.limit , queryFnArgs.filters ),
    options
  );
}
