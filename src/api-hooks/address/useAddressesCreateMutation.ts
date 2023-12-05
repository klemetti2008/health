
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, AddressesCreateResponse, ErrorResponse, AddressesCreateRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type addressesCreateMutationType = { 
    requestBody: AddressesCreateRequestBody

}

export function useAddressesCreateMutation(
  options?: UseMutationOptions<AddressesCreateResponse, ErrorResponse,  addressesCreateMutationType>
) {
  return useMutation<AddressesCreateResponse, ErrorResponse,  addressesCreateMutationType>(
    (data: addressesCreateMutationType) => apiClient.address.addressesCreateMutation(data.requestBody ),
    options
  );
}
