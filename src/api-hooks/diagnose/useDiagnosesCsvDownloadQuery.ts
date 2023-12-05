
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from 'react-query';
import { MajaClient, DiagnosesQueryResponse, ErrorResponse, DiagnoseFilterType }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type diagnosesCsvDownloadQueryType = { 
    id?: number, 
page?: number, 
limit?: number, 
filters: DiagnoseFilterType

}

export function useDiagnosesCsvDownloadQuery(
  queryFnArgs: diagnosesCsvDownloadQueryType,
  options?: UseQueryOptions<DiagnosesQueryResponse, ErrorResponse>,
) {
  const queryKey = ["diagnosesCsvDownloadQuery", JSON.stringify(queryFnArgs)];

  return useQuery<DiagnosesQueryResponse, ErrorResponse>(
    queryKey,
    async (): Promise<DiagnosesQueryResponse> => apiClient.diagnose.diagnosesCsvDownloadQuery(queryFnArgs.id , queryFnArgs.page , queryFnArgs.limit , queryFnArgs.filters ),
    options
  );
}
