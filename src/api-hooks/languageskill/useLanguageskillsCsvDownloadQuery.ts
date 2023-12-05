
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from 'react-query';
import { MajaClient, LanguageSkillsQueryResponse, ErrorResponse, LanguageSkillFilterType }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type languageskillsCsvDownloadQueryType = { 
    limit?: number, 
filters: LanguageSkillFilterType, 
id?: number, 
page?: number

}

export function useLanguageskillsCsvDownloadQuery(
  queryFnArgs: languageskillsCsvDownloadQueryType,
  options?: UseQueryOptions<LanguageSkillsQueryResponse, ErrorResponse>,
) {
  const queryKey = ["languageskillsCsvDownloadQuery", JSON.stringify(queryFnArgs)];

  return useQuery<LanguageSkillsQueryResponse, ErrorResponse>(
    queryKey,
    async (): Promise<LanguageSkillsQueryResponse> => apiClient.languageskill.languageskillsCsvDownloadQuery(queryFnArgs.limit , queryFnArgs.filters , queryFnArgs.id , queryFnArgs.page ),
    options
  );
}
