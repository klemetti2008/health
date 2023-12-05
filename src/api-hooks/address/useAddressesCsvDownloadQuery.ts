
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from 'react-query';
import { MajaClient, AddressesQueryResponse, ErrorResponse, AddressFilterType,AddressSortType }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type addressesCsvDownloadQueryType = { 
    page?: number, 
limit?: number, 
filters: AddressFilterType, 
sorts: AddressSortType, 
id?: number, 
nurseId?: number

}

export function useAddressesCsvDownloadQuery(
  queryFnArgs: addressesCsvDownloadQueryType,
  options?: UseQueryOptions<AddressesQueryResponse, ErrorResponse>,
) {
  const queryKey = ["addressesCsvDownloadQuery", JSON.stringify(queryFnArgs)];

  return useQuery<AddressesQueryResponse, ErrorResponse>(
    queryKey,
    async (): Promise<AddressesQueryResponse> => apiClient.address.addressesCsvDownloadQuery(queryFnArgs.page , queryFnArgs.limit , queryFnArgs.filters , queryFnArgs.sorts , queryFnArgs.id , queryFnArgs.nurseId ),
    options
  );
}
