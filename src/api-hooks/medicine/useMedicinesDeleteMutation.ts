
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, MedicinesCreateResponse, ErrorResponse, MedicinesDeleteRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type medicinesDeleteMutationType = { 
    requestBody: MedicinesDeleteRequestBody

}

export function useMedicinesDeleteMutation(
  options?: UseMutationOptions<MedicinesCreateResponse, ErrorResponse,  medicinesDeleteMutationType>
) {
  return useMutation<MedicinesCreateResponse, ErrorResponse,  medicinesDeleteMutationType>(
    (data: medicinesDeleteMutationType) => apiClient.medicine.medicinesDeleteMutation(data.requestBody ),
    options
  );
}
