
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, PrescriptionsCreateResponse, ErrorResponse, PrescriptionsDeleteRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type prescriptionsDeleteMutationType = { 
    requestBody: PrescriptionsDeleteRequestBody

}

export function usePrescriptionsDeleteMutation(
  options?: UseMutationOptions<PrescriptionsCreateResponse, ErrorResponse,  prescriptionsDeleteMutationType>
) {
  return useMutation<PrescriptionsCreateResponse, ErrorResponse,  prescriptionsDeleteMutationType>(
    (data: prescriptionsDeleteMutationType) => apiClient.prescription.prescriptionsDeleteMutation(data.requestBody ),
    options
  );
}
