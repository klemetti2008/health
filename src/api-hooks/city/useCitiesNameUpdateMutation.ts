
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, CitiesCreateResponse, ErrorResponse, CitiesCreateRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type citiesNameUpdateMutationType = { 
    name: string, 
requestBody: CitiesCreateRequestBody

}

export function useCitiesNameUpdateMutation(
  options?: UseMutationOptions<CitiesCreateResponse, ErrorResponse,  citiesNameUpdateMutationType>
) {
  return useMutation<CitiesCreateResponse, ErrorResponse,  citiesNameUpdateMutationType>(
    (data: citiesNameUpdateMutationType) => apiClient.city.citiesNameUpdateMutation(data.name , data.requestBody ),
    options
  );
}
