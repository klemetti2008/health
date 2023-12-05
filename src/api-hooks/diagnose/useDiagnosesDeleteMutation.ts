
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, DiagnosesCreateResponse, ErrorResponse, DiagnosesDeleteRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type diagnosesDeleteMutationType = { 
    requestBody: DiagnosesDeleteRequestBody

}

export function useDiagnosesDeleteMutation(
  options?: UseMutationOptions<DiagnosesCreateResponse, ErrorResponse,  diagnosesDeleteMutationType>
) {
  return useMutation<DiagnosesCreateResponse, ErrorResponse,  diagnosesDeleteMutationType>(
    (data: diagnosesDeleteMutationType) => apiClient.diagnose.diagnosesDeleteMutation(data.requestBody ),
    options
  );
}
