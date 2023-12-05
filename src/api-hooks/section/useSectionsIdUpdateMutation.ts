
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, SectionsCreateResponse, ErrorResponse, SectionsCreateRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type sectionsIdUpdateMutationType = { 
    id: number, 
requestBody: SectionsCreateRequestBody

}

export function useSectionsIdUpdateMutation(
  options?: UseMutationOptions<SectionsCreateResponse, ErrorResponse,  sectionsIdUpdateMutationType>
) {
  return useMutation<SectionsCreateResponse, ErrorResponse,  sectionsIdUpdateMutationType>(
    (data: sectionsIdUpdateMutationType) => apiClient.section.sectionsIdUpdateMutation(data.id , data.requestBody ),
    options
  );
}
