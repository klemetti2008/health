
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from 'react-query';
import { MajaClient, ShiftTypesQueryResponse, ErrorResponse, ShiftTypeFilterType }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type shiftTypesQueryType = { 
    id?: number, 
page?: number, 
limit?: number, 
filters: ShiftTypeFilterType

}

export function useShiftTypesQuery(
  queryFnArgs: shiftTypesQueryType,
  options?: UseQueryOptions<ShiftTypesQueryResponse, ErrorResponse>,
) {
  const queryKey = ["shiftTypesQuery", JSON.stringify(queryFnArgs)];

  return useQuery<ShiftTypesQueryResponse, ErrorResponse>(
    queryKey,
    async (): Promise<ShiftTypesQueryResponse> => apiClient.shifttype.shiftTypesQuery(queryFnArgs.id , queryFnArgs.page , queryFnArgs.limit , queryFnArgs.filters ),
    options
  );
}
