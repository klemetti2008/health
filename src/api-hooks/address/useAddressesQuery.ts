
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from 'react-query';
import { MajaClient, AddressesQueryResponse, ErrorResponse, AddressFilterType,AddressSortType }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type addressesQueryType = { 
    filters: AddressFilterType, 
sorts: AddressSortType, 
id?: number, 
nurseId?: number, 
page?: number, 
limit?: number

}

export function useAddressesQuery(
  queryFnArgs: addressesQueryType,
  options?: UseQueryOptions<AddressesQueryResponse, ErrorResponse>,
) {
  const queryKey = ["addressesQuery", JSON.stringify(queryFnArgs)];

  return useQuery<AddressesQueryResponse, ErrorResponse>(
    queryKey,
    async (): Promise<AddressesQueryResponse> => apiClient.address.addressesQuery(queryFnArgs.filters , queryFnArgs.sorts , queryFnArgs.id , queryFnArgs.nurseId , queryFnArgs.page , queryFnArgs.limit ),
    options
  );
}
