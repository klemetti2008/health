
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, CitiesCreateResponse, ErrorResponse, CitiesDeleteRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type citiesDeleteMutationType = { 
    requestBody: CitiesDeleteRequestBody

}

export function useCitiesDeleteMutation(
  options?: UseMutationOptions<CitiesCreateResponse, ErrorResponse,  citiesDeleteMutationType>
) {
  return useMutation<CitiesCreateResponse, ErrorResponse,  citiesDeleteMutationType>(
    (data: citiesDeleteMutationType) => apiClient.city.citiesDeleteMutation(data.requestBody ),
    options
  );
}
