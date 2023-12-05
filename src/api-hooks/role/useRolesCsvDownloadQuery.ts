
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from 'react-query';
import { MajaClient, RolesQueryResponse, ErrorResponse, RoleFilterType }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type rolesCsvDownloadQueryType = { 
    id?: number, 
page?: number, 
limit?: number, 
filters: RoleFilterType

}

export function useRolesCsvDownloadQuery(
  queryFnArgs: rolesCsvDownloadQueryType,
  options?: UseQueryOptions<RolesQueryResponse, ErrorResponse>,
) {
  const queryKey = ["rolesCsvDownloadQuery", JSON.stringify(queryFnArgs)];

  return useQuery<RolesQueryResponse, ErrorResponse>(
    queryKey,
    async (): Promise<RolesQueryResponse> => apiClient.role.rolesCsvDownloadQuery(queryFnArgs.id , queryFnArgs.page , queryFnArgs.limit , queryFnArgs.filters ),
    options
  );
}
