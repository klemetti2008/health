
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, PrescriptionsCreateResponse, ErrorResponse, PrescriptionsCreateRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type prescriptionsCreateMutationType = { 
    requestBody: PrescriptionsCreateRequestBody

}

export function usePrescriptionsCreateMutation(
  options?: UseMutationOptions<PrescriptionsCreateResponse, ErrorResponse,  prescriptionsCreateMutationType>
) {
  return useMutation<PrescriptionsCreateResponse, ErrorResponse,  prescriptionsCreateMutationType>(
    (data: prescriptionsCreateMutationType) => apiClient.prescription.prescriptionsCreateMutation(data.requestBody ),
    options
  );
}
