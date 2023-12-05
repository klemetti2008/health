
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from 'react-query';
import { MajaClient, PermissionsQueryResponse, ErrorResponse, PermissionFilterType }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type permissionsCsvDownloadQueryType = { 
    id?: number, 
nurseId?: number, 
notOwnerNurseId?: number, 
page?: number, 
limit?: number, 
filters: PermissionFilterType

}

export function usePermissionsCsvDownloadQuery(
  queryFnArgs: permissionsCsvDownloadQueryType,
  options?: UseQueryOptions<PermissionsQueryResponse, ErrorResponse>,
) {
  const queryKey = ["permissionsCsvDownloadQuery", JSON.stringify(queryFnArgs)];

  return useQuery<PermissionsQueryResponse, ErrorResponse>(
    queryKey,
    async (): Promise<PermissionsQueryResponse> => apiClient.permission.permissionsCsvDownloadQuery(queryFnArgs.id , queryFnArgs.nurseId , queryFnArgs.notOwnerNurseId , queryFnArgs.page , queryFnArgs.limit , queryFnArgs.filters ),
    options
  );
}
