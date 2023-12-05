
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from 'react-query';
import { MajaClient, NursesQueryPermissionsResponse, ErrorResponse, NursesQueryPermissionsFilterType,NursesQueryPermissionsSortType }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type nursesPermissionsQueryType = { 
    id?: number, 
nurseId?: number, 
page?: number, 
limit?: number, 
filters: NursesQueryPermissionsFilterType, 
sorts: NursesQueryPermissionsSortType

}

export function useNursesPermissionsQuery(
  queryFnArgs: nursesPermissionsQueryType,
  options?: UseQueryOptions<NursesQueryPermissionsResponse, ErrorResponse>,
) {
  const queryKey = ["nursesPermissionsQuery", JSON.stringify(queryFnArgs)];

  return useQuery<NursesQueryPermissionsResponse, ErrorResponse>(
    queryKey,
    async (): Promise<NursesQueryPermissionsResponse> => apiClient.nurse.nursesPermissionsQuery(queryFnArgs.id , queryFnArgs.nurseId , queryFnArgs.page , queryFnArgs.limit , queryFnArgs.filters , queryFnArgs.sorts ),
    options
  );
}
