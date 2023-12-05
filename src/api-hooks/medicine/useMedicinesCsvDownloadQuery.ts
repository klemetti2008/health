
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from 'react-query';
import { MajaClient, MedicinesQueryResponse, ErrorResponse, MedicineFilterType }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type medicinesCsvDownloadQueryType = { 
    page?: number, 
limit?: number, 
filters: MedicineFilterType, 
id?: number

}

export function useMedicinesCsvDownloadQuery(
  queryFnArgs: medicinesCsvDownloadQueryType,
  options?: UseQueryOptions<MedicinesQueryResponse, ErrorResponse>,
) {
  const queryKey = ["medicinesCsvDownloadQuery", JSON.stringify(queryFnArgs)];

  return useQuery<MedicinesQueryResponse, ErrorResponse>(
    queryKey,
    async (): Promise<MedicinesQueryResponse> => apiClient.medicine.medicinesCsvDownloadQuery(queryFnArgs.page , queryFnArgs.limit , queryFnArgs.filters , queryFnArgs.id ),
    options
  );
}
