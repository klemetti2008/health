
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from 'react-query';
import { MajaClient, NurseTypesQueryResponse, ErrorResponse, NurseTypeFilterType }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type nursetypesQueryType = { 
    page?: number, 
limit?: number, 
filters: NurseTypeFilterType, 
id?: number

}

export function useNursetypesQuery(
  queryFnArgs: nursetypesQueryType,
  options?: UseQueryOptions<NurseTypesQueryResponse, ErrorResponse>,
) {
  const queryKey = ["nursetypesQuery", JSON.stringify(queryFnArgs)];

  return useQuery<NurseTypesQueryResponse, ErrorResponse>(
    queryKey,
    async (): Promise<NurseTypesQueryResponse> => apiClient.nursetype.nursetypesQuery(queryFnArgs.page , queryFnArgs.limit , queryFnArgs.filters , queryFnArgs.id ),
    options
  );
}
