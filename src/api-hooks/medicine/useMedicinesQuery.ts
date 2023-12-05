
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from 'react-query';
import { MajaClient, MedicinesQueryResponse, ErrorResponse, MedicineFilterType }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type medicinesQueryType = { 
    id?: number, 
page?: number, 
limit?: number, 
filters: MedicineFilterType

}

export function useMedicinesQuery(
  queryFnArgs: medicinesQueryType,
  options?: UseQueryOptions<MedicinesQueryResponse, ErrorResponse>,
) {
  const queryKey = ["medicinesQuery", JSON.stringify(queryFnArgs)];

  return useQuery<MedicinesQueryResponse, ErrorResponse>(
    queryKey,
    async (): Promise<MedicinesQueryResponse> => apiClient.medicine.medicinesQuery(queryFnArgs.id , queryFnArgs.page , queryFnArgs.limit , queryFnArgs.filters ),
    options
  );
}
