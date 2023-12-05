
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, AddressesCreateResponse, ErrorResponse, AddressesCreateRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type addressesIdUpdateMutationType = { 
    id: number, 
requestBody: AddressesCreateRequestBody

}

export function useAddressesIdUpdateMutation(
  options?: UseMutationOptions<AddressesCreateResponse, ErrorResponse,  addressesIdUpdateMutationType>
) {
  return useMutation<AddressesCreateResponse, ErrorResponse,  addressesIdUpdateMutationType>(
    (data: addressesIdUpdateMutationType) => apiClient.address.addressesIdUpdateMutation(data.id , data.requestBody ),
    options
  );
}
