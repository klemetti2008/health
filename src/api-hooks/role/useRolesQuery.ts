
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from 'react-query';
import { MajaClient, RolesQueryResponse, ErrorResponse, RoleFilterType }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type rolesQueryType = { 
    limit?: number, 
filters: RoleFilterType, 
id?: number, 
page?: number

}

export function useRolesQuery(
  queryFnArgs: rolesQueryType,
  options?: UseQueryOptions<RolesQueryResponse, ErrorResponse>,
) {
  const queryKey = ["rolesQuery", JSON.stringify(queryFnArgs)];

  return useQuery<RolesQueryResponse, ErrorResponse>(
    queryKey,
    async (): Promise<RolesQueryResponse> => apiClient.role.rolesQuery(queryFnArgs.limit , queryFnArgs.filters , queryFnArgs.id , queryFnArgs.page ),
    options
  );
}
