
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, AddressesCreateResponse, ErrorResponse, AddressesDeleteRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type addressesDeleteMutationType = { 
    requestBody: AddressesDeleteRequestBody

}

export function useAddressesDeleteMutation(
  options?: UseMutationOptions<AddressesCreateResponse, ErrorResponse,  addressesDeleteMutationType>
) {
  return useMutation<AddressesCreateResponse, ErrorResponse,  addressesDeleteMutationType>(
    (data: addressesDeleteMutationType) => apiClient.address.addressesDeleteMutation(data.requestBody ),
    options
  );
}
