
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from 'react-query';
import { MajaClient, SectionsQueryResponse, ErrorResponse, SectionFilterType }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type sectionsQueryType = { 
    filters: SectionFilterType, 
id?: number, 
parentId?: number, 
page?: number, 
limit?: number

}

export function useSectionsQuery(
  queryFnArgs: sectionsQueryType,
  options?: UseQueryOptions<SectionsQueryResponse, ErrorResponse>,
) {
  const queryKey = ["sectionsQuery", JSON.stringify(queryFnArgs)];

  return useQuery<SectionsQueryResponse, ErrorResponse>(
    queryKey,
    async (): Promise<SectionsQueryResponse> => apiClient.section.sectionsQuery(queryFnArgs.filters , queryFnArgs.id , queryFnArgs.parentId , queryFnArgs.page , queryFnArgs.limit ),
    options
  );
}
