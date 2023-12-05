
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from 'react-query';
import { MajaClient, NursesQueryResponse, ErrorResponse, NurseFilterType,NurseSortType }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type nursesCsvDownloadQueryType = { 
    userId?: number, 
page?: number, 
limit?: number, 
filters: NurseFilterType, 
sorts: NurseSortType, 
id?: number

}

export function useNursesCsvDownloadQuery(
  queryFnArgs: nursesCsvDownloadQueryType,
  options?: UseQueryOptions<NursesQueryResponse, ErrorResponse>,
) {
  const queryKey = ["nursesCsvDownloadQuery", JSON.stringify(queryFnArgs)];

  return useQuery<NursesQueryResponse, ErrorResponse>(
    queryKey,
    async (): Promise<NursesQueryResponse> => apiClient.nurse.nursesCsvDownloadQuery(queryFnArgs.userId , queryFnArgs.page , queryFnArgs.limit , queryFnArgs.filters , queryFnArgs.sorts , queryFnArgs.id ),
    options
  );
}
