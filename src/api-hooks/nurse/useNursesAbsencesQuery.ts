
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from 'react-query';
import { MajaClient, NursesQueryAbsencesResponse, ErrorResponse, NursesQueryAbsencesSortType,NursesQueryAbsencesFilterType }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type nursesAbsencesQueryType = { 
    sorts: NursesQueryAbsencesSortType, 
id?: number, 
nurseId?: number, 
page?: number, 
limit?: number, 
filters: NursesQueryAbsencesFilterType

}

export function useNursesAbsencesQuery(
  queryFnArgs: nursesAbsencesQueryType,
  options?: UseQueryOptions<NursesQueryAbsencesResponse, ErrorResponse>,
) {
  const queryKey = ["nursesAbsencesQuery", JSON.stringify(queryFnArgs)];

  return useQuery<NursesQueryAbsencesResponse, ErrorResponse>(
    queryKey,
    async (): Promise<NursesQueryAbsencesResponse> => apiClient.nurse.nursesAbsencesQuery(queryFnArgs.sorts , queryFnArgs.id , queryFnArgs.nurseId , queryFnArgs.page , queryFnArgs.limit , queryFnArgs.filters ),
    options
  );
}
