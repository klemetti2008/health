
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { MajaClient, MedicinesCreateResponse, ErrorResponse, MedicinesCreateRequestBody }from 'src/_requests/Maja';

const apiClient = new MajaClient();


  type medicinesIdUpdateMutationType = { 
    id: number, 
requestBody: MedicinesCreateRequestBody

}

export function useMedicinesIdUpdateMutation(
  options?: UseMutationOptions<MedicinesCreateResponse, ErrorResponse,  medicinesIdUpdateMutationType>
) {
  return useMutation<MedicinesCreateResponse, ErrorResponse,  medicinesIdUpdateMutationType>(
    (data: medicinesIdUpdateMutationType) => apiClient.medicine.medicinesIdUpdateMutation(data.id , data.requestBody ),
    options
  );
}
