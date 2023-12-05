
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from 'react-query';
import { MajaClient, StreetsQueryResponse, ErrorResponse, StreetFilterType }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type streetsQueryType = { 
    filters: StreetFilterType, 
id?: number, 
page?: number, 
limit?: number

}

export function useStreetsQuery(
  queryFnArgs: streetsQueryType,
  options?: UseQueryOptions<StreetsQueryResponse, ErrorResponse>,
) {
  const queryKey = ["streetsQuery", JSON.stringify(queryFnArgs)];

  return useQuery<StreetsQueryResponse, ErrorResponse>(
    queryKey,
    async (): Promise<StreetsQueryResponse> => apiClient.street.streetsQuery(queryFnArgs.filters , queryFnArgs.id , queryFnArgs.page , queryFnArgs.limit ),
    options
  );
}
