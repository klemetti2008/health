
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from 'react-query';
import { MajaClient, CompaniesQueryResponse, ErrorResponse, CompanyFilterType }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type companiesQueryType = { 
    id?: number, 
page?: number, 
limit?: number, 
filters: CompanyFilterType

}

export function useCompaniesQuery(
  queryFnArgs: companiesQueryType,
  options?: UseQueryOptions<CompaniesQueryResponse, ErrorResponse>,
) {
  const queryKey = ["companiesQuery", JSON.stringify(queryFnArgs)];

  return useQuery<CompaniesQueryResponse, ErrorResponse>(
    queryKey,
    async (): Promise<CompaniesQueryResponse> => apiClient.company.companiesQuery(queryFnArgs.id , queryFnArgs.page , queryFnArgs.limit , queryFnArgs.filters ),
    options
  );
}
