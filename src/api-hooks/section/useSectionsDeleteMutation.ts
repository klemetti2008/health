
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, SectionsCreateResponse, ErrorResponse, SectionsDeleteRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type sectionsDeleteMutationType = { 
    requestBody: SectionsDeleteRequestBody

}

export function useSectionsDeleteMutation(
  options?: UseMutationOptions<SectionsCreateResponse, ErrorResponse,  sectionsDeleteMutationType>
) {
  return useMutation<SectionsCreateResponse, ErrorResponse,  sectionsDeleteMutationType>(
    (data: sectionsDeleteMutationType) => apiClient.section.sectionsDeleteMutation(data.requestBody ),
    options
  );
}
