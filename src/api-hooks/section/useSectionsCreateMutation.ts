
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, SectionsCreateResponse, ErrorResponse, SectionsCreateRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type sectionsCreateMutationType = { 
    requestBody: SectionsCreateRequestBody

}

export function useSectionsCreateMutation(
  options?: UseMutationOptions<SectionsCreateResponse, ErrorResponse,  sectionsCreateMutationType>
) {
  return useMutation<SectionsCreateResponse, ErrorResponse,  sectionsCreateMutationType>(
    (data: sectionsCreateMutationType) => apiClient.section.sectionsCreateMutation(data.requestBody ),
    options
  );
}
