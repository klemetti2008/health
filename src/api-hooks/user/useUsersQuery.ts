
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from 'react-query';
import { MajaClient, UsersQueryResponse, ErrorResponse, UserFilterType,UserSortType }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type usersQueryType = { 
    filters: UserFilterType, 
sorts: UserSortType, 
id?: number, 
page?: number, 
limit?: number

}

export function useUsersQuery(
  queryFnArgs: usersQueryType,
  options?: UseQueryOptions<UsersQueryResponse, ErrorResponse>,
) {
  const queryKey = ["usersQuery", JSON.stringify(queryFnArgs)];

  return useQuery<UsersQueryResponse, ErrorResponse>(
    queryKey,
    async (): Promise<UsersQueryResponse> => apiClient.user.usersQuery(queryFnArgs.filters , queryFnArgs.sorts , queryFnArgs.id , queryFnArgs.page , queryFnArgs.limit ),
    options
  );
}
