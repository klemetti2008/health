
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from 'react-query';
import { MajaClient, NursesQueryResponse, ErrorResponse, NurseFilterType,NurseSortType }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type nursesQueryType = { 
    limit?: number, 
filters: NurseFilterType, 
sorts: NurseSortType, 
id?: number, 
userId?: number, 
page?: number

}

export function useNursesQuery(
  queryFnArgs: nursesQueryType,
  options?: UseQueryOptions<NursesQueryResponse, ErrorResponse>,
) {
  const queryKey = ["nursesQuery", JSON.stringify(queryFnArgs)];

  return useQuery<NursesQueryResponse, ErrorResponse>(
    queryKey,
    async (): Promise<NursesQueryResponse> => apiClient.nurse.nursesQuery(queryFnArgs.limit , queryFnArgs.filters , queryFnArgs.sorts , queryFnArgs.id , queryFnArgs.userId , queryFnArgs.page ),
    options
  );
}
