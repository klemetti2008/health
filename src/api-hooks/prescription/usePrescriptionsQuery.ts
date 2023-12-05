
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from 'react-query';
import { MajaClient, PrescriptionsQueryResponse, ErrorResponse, PrescriptionFilterType }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type prescriptionsQueryType = { 
    id?: number, 
page?: number, 
limit?: number, 
filters: PrescriptionFilterType

}

export function usePrescriptionsQuery(
  queryFnArgs: prescriptionsQueryType,
  options?: UseQueryOptions<PrescriptionsQueryResponse, ErrorResponse>,
) {
  const queryKey = ["prescriptionsQuery", JSON.stringify(queryFnArgs)];

  return useQuery<PrescriptionsQueryResponse, ErrorResponse>(
    queryKey,
    async (): Promise<PrescriptionsQueryResponse> => apiClient.prescription.prescriptionsQuery(queryFnArgs.id , queryFnArgs.page , queryFnArgs.limit , queryFnArgs.filters ),
    options
  );
}
