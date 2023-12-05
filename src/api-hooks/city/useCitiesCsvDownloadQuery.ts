
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from 'react-query';
import { MajaClient, CitiesQueryResponse, ErrorResponse, CityFilterType }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type citiesCsvDownloadQueryType = { 
    id?: number, 
page?: number, 
limit?: number, 
filters: CityFilterType

}

export function useCitiesCsvDownloadQuery(
  queryFnArgs: citiesCsvDownloadQueryType,
  options?: UseQueryOptions<CitiesQueryResponse, ErrorResponse>,
) {
  const queryKey = ["citiesCsvDownloadQuery", JSON.stringify(queryFnArgs)];

  return useQuery<CitiesQueryResponse, ErrorResponse>(
    queryKey,
    async (): Promise<CitiesQueryResponse> => apiClient.city.citiesCsvDownloadQuery(queryFnArgs.id , queryFnArgs.page , queryFnArgs.limit , queryFnArgs.filters ),
    options
  );
}
