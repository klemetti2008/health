
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from 'react-query';
import { MajaClient, DiagnosesQueryResponse, ErrorResponse, DiagnoseFilterType }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type diagnosesQueryType = { 
    page?: number, 
limit?: number, 
filters: DiagnoseFilterType, 
id?: number

}

export function useDiagnosesQuery(
  queryFnArgs: diagnosesQueryType,
  options?: UseQueryOptions<DiagnosesQueryResponse, ErrorResponse>,
) {
  const queryKey = ["diagnosesQuery", JSON.stringify(queryFnArgs)];

  return useQuery<DiagnosesQueryResponse, ErrorResponse>(
    queryKey,
    async (): Promise<DiagnosesQueryResponse> => apiClient.diagnose.diagnosesQuery(queryFnArgs.page , queryFnArgs.limit , queryFnArgs.filters , queryFnArgs.id ),
    options
  );
}
