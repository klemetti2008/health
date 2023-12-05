
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, DiagnosesCreateResponse, ErrorResponse, DiagnosesCreateRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type diagnosesIdUpdateMutationType = { 
    id: number, 
requestBody: DiagnosesCreateRequestBody

}

export function useDiagnosesIdUpdateMutation(
  options?: UseMutationOptions<DiagnosesCreateResponse, ErrorResponse,  diagnosesIdUpdateMutationType>
) {
  return useMutation<DiagnosesCreateResponse, ErrorResponse,  diagnosesIdUpdateMutationType>(
    (data: diagnosesIdUpdateMutationType) => apiClient.diagnose.diagnosesIdUpdateMutation(data.id , data.requestBody ),
    options
  );
}
