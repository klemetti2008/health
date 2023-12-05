
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from 'react-query';
import { MajaClient, ContractTypesQueryResponse, ErrorResponse, ContractTypeFilterType }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type contractTypesQueryType = { 
    id?: number, 
page?: number, 
limit?: number, 
filters: ContractTypeFilterType

}

export function useContractTypesQuery(
  queryFnArgs: contractTypesQueryType,
  options?: UseQueryOptions<ContractTypesQueryResponse, ErrorResponse>,
) {
  const queryKey = ["contractTypesQuery", JSON.stringify(queryFnArgs)];

  return useQuery<ContractTypesQueryResponse, ErrorResponse>(
    queryKey,
    async (): Promise<ContractTypesQueryResponse> => apiClient.contracttype.contractTypesQuery(queryFnArgs.id , queryFnArgs.page , queryFnArgs.limit , queryFnArgs.filters ),
    options
  );
}
