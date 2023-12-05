
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from 'react-query';
import { MajaClient, PermissionsQueryResponse, ErrorResponse, PermissionFilterType }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type permissionsQueryType = { 
    page?: number, 
limit?: number, 
filters: PermissionFilterType, 
id?: number, 
nurseId?: number, 
notOwnerNurseId?: number

}

export function usePermissionsQuery(
  queryFnArgs: permissionsQueryType,
  options?: UseQueryOptions<PermissionsQueryResponse, ErrorResponse>,
) {
  const queryKey = ["permissionsQuery", JSON.stringify(queryFnArgs)];

  return useQuery<PermissionsQueryResponse, ErrorResponse>(
    queryKey,
    async (): Promise<PermissionsQueryResponse> => apiClient.permission.permissionsQuery(queryFnArgs.page , queryFnArgs.limit , queryFnArgs.filters , queryFnArgs.id , queryFnArgs.nurseId , queryFnArgs.notOwnerNurseId ),
    options
  );
}
