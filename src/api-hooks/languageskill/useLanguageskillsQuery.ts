
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from 'react-query';
import { MajaClient, LanguageSkillsQueryResponse, ErrorResponse, LanguageSkillFilterType }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type languageskillsQueryType = { 
    id?: number, 
page?: number, 
limit?: number, 
filters: LanguageSkillFilterType

}

export function useLanguageskillsQuery(
  queryFnArgs: languageskillsQueryType,
  options?: UseQueryOptions<LanguageSkillsQueryResponse, ErrorResponse>,
) {
  const queryKey = ["languageskillsQuery", JSON.stringify(queryFnArgs)];

  return useQuery<LanguageSkillsQueryResponse, ErrorResponse>(
    queryKey,
    async (): Promise<LanguageSkillsQueryResponse> => apiClient.languageskill.languageskillsQuery(queryFnArgs.id , queryFnArgs.page , queryFnArgs.limit , queryFnArgs.filters ),
    options
  );
}
