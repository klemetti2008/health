
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, MedicinesCreateResponse, ErrorResponse, MedicinesCreateRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type medicinesCreateMutationType = { 
    requestBody: MedicinesCreateRequestBody

}

export function useMedicinesCreateMutation(
  options?: UseMutationOptions<MedicinesCreateResponse, ErrorResponse,  medicinesCreateMutationType>
) {
  return useMutation<MedicinesCreateResponse, ErrorResponse,  medicinesCreateMutationType>(
    (data: medicinesCreateMutationType) => apiClient.medicine.medicinesCreateMutation(data.requestBody ),
    options
  );
}
