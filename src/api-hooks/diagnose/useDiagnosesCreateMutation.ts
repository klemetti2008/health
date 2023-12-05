
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, DiagnosesCreateResponse, ErrorResponse, DiagnosesCreateRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type diagnosesCreateMutationType = { 
    requestBody: DiagnosesCreateRequestBody

}

export function useDiagnosesCreateMutation(
  options?: UseMutationOptions<DiagnosesCreateResponse, ErrorResponse,  diagnosesCreateMutationType>
) {
  return useMutation<DiagnosesCreateResponse, ErrorResponse,  diagnosesCreateMutationType>(
    (data: diagnosesCreateMutationType) => apiClient.diagnose.diagnosesCreateMutation(data.requestBody ),
    options
  );
}
