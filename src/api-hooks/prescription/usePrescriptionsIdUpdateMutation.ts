
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, PrescriptionsCreateResponse, ErrorResponse, PrescriptionsCreateRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type prescriptionsIdUpdateMutationType = { 
    id: number, 
requestBody: PrescriptionsCreateRequestBody

}

export function usePrescriptionsIdUpdateMutation(
  options?: UseMutationOptions<PrescriptionsCreateResponse, ErrorResponse,  prescriptionsIdUpdateMutationType>
) {
  return useMutation<PrescriptionsCreateResponse, ErrorResponse,  prescriptionsIdUpdateMutationType>(
    (data: prescriptionsIdUpdateMutationType) => apiClient.prescription.prescriptionsIdUpdateMutation(data.id , data.requestBody ),
    options
  );
}
