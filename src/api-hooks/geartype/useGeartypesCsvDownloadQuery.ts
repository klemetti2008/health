
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from 'react-query';
import { MajaClient, GearTypesQueryResponse, ErrorResponse, GearTypeFilterType }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type geartypesCsvDownloadQueryType = { 
    limit?: number, 
filters: GearTypeFilterType, 
id?: number, 
page?: number

}

export function useGeartypesCsvDownloadQuery(
  queryFnArgs: geartypesCsvDownloadQueryType,
  options?: UseQueryOptions<GearTypesQueryResponse, ErrorResponse>,
) {
  const queryKey = ["geartypesCsvDownloadQuery", JSON.stringify(queryFnArgs)];

  return useQuery<GearTypesQueryResponse, ErrorResponse>(
    queryKey,
    async (): Promise<GearTypesQueryResponse> => apiClient.geartype.geartypesCsvDownloadQuery(queryFnArgs.limit , queryFnArgs.filters , queryFnArgs.id , queryFnArgs.page ),
    options
  );
}
