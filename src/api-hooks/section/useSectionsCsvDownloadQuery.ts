
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from 'react-query';
import { MajaClient, SectionsQueryResponse, ErrorResponse, SectionFilterType }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type sectionsCsvDownloadQueryType = { 
    page?: number, 
limit?: number, 
filters: SectionFilterType, 
id?: number, 
parentId?: number

}

export function useSectionsCsvDownloadQuery(
  queryFnArgs: sectionsCsvDownloadQueryType,
  options?: UseQueryOptions<SectionsQueryResponse, ErrorResponse>,
) {
  const queryKey = ["sectionsCsvDownloadQuery", JSON.stringify(queryFnArgs)];

  return useQuery<SectionsQueryResponse, ErrorResponse>(
    queryKey,
    async (): Promise<SectionsQueryResponse> => apiClient.section.sectionsCsvDownloadQuery(queryFnArgs.page , queryFnArgs.limit , queryFnArgs.filters , queryFnArgs.id , queryFnArgs.parentId ),
    options
  );
}
