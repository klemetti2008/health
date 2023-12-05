
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from 'react-query';
import { MajaClient, PaymentTypesQueryResponse, ErrorResponse, PaymentTypeFilterType }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type paymenttypesQueryType = { 
    id?: number, 
page?: number, 
limit?: number, 
filters: PaymentTypeFilterType

}

export function usePaymenttypesQuery(
  queryFnArgs: paymenttypesQueryType,
  options?: UseQueryOptions<PaymentTypesQueryResponse, ErrorResponse>,
) {
  const queryKey = ["paymenttypesQuery", JSON.stringify(queryFnArgs)];

  return useQuery<PaymentTypesQueryResponse, ErrorResponse>(
    queryKey,
    async (): Promise<PaymentTypesQueryResponse> => apiClient.paymenttype.paymenttypesQuery(queryFnArgs.id , queryFnArgs.page , queryFnArgs.limit , queryFnArgs.filters ),
    options
  );
}
