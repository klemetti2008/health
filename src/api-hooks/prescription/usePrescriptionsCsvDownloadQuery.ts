
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from 'react-query';
import { MajaClient, PrescriptionsQueryResponse, ErrorResponse, PrescriptionFilterType }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type prescriptionsCsvDownloadQueryType = { 
    id?: number, 
page?: number, 
limit?: number, 
filters: PrescriptionFilterType

}

export function usePrescriptionsCsvDownloadQuery(
  queryFnArgs: prescriptionsCsvDownloadQueryType,
  options?: UseQueryOptions<PrescriptionsQueryResponse, ErrorResponse>,
) {
  const queryKey = ["prescriptionsCsvDownloadQuery", JSON.stringify(queryFnArgs)];

  return useQuery<PrescriptionsQueryResponse, ErrorResponse>(
    queryKey,
    async (): Promise<PrescriptionsQueryResponse> => apiClient.prescription.prescriptionsCsvDownloadQuery(queryFnArgs.id , queryFnArgs.page , queryFnArgs.limit , queryFnArgs.filters ),
    options
  );
}
