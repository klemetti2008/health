
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, CitiesCreateResponse, ErrorResponse, CitiesCreateRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type citiesCreateMutationType = { 
    requestBody: CitiesCreateRequestBody

}

export function useCitiesCreateMutation(
  options?: UseMutationOptions<CitiesCreateResponse, ErrorResponse,  citiesCreateMutationType>
) {
  return useMutation<CitiesCreateResponse, ErrorResponse,  citiesCreateMutationType>(
    (data: citiesCreateMutationType) => apiClient.city.citiesCreateMutation(data.requestBody ),
    options
  );
}
