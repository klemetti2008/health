
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from 'react-query';
import { MajaClient, CompaniesQueryResponse, ErrorResponse, CompanyFilterType }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type companiesCsvDownloadQueryType = { 
    limit?: number, 
filters: CompanyFilterType, 
id?: number, 
page?: number

}

export function useCompaniesCsvDownloadQuery(
  queryFnArgs: companiesCsvDownloadQueryType,
  options?: UseQueryOptions<CompaniesQueryResponse, ErrorResponse>,
) {
  const queryKey = ["companiesCsvDownloadQuery", JSON.stringify(queryFnArgs)];

  return useQuery<CompaniesQueryResponse, ErrorResponse>(
    queryKey,
    async (): Promise<CompaniesQueryResponse> => apiClient.company.companiesCsvDownloadQuery(queryFnArgs.limit , queryFnArgs.filters , queryFnArgs.id , queryFnArgs.page ),
    options
  );
}
