
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from 'react-query';
import { MajaClient, CitiesQueryResponse, ErrorResponse, CityFilterType }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type citiesQueryType = { 
    id?: number, 
page?: number, 
limit?: number, 
filters: CityFilterType

}

export function useCitiesQuery(
  queryFnArgs: citiesQueryType,
  options?: UseQueryOptions<CitiesQueryResponse, ErrorResponse>,
) {
  const queryKey = ["citiesQuery", JSON.stringify(queryFnArgs)];

  return useQuery<CitiesQueryResponse, ErrorResponse>(
    queryKey,
    async (): Promise<CitiesQueryResponse> => apiClient.city.citiesQuery(queryFnArgs.id , queryFnArgs.page , queryFnArgs.limit , queryFnArgs.filters ),
    options
  );
}
