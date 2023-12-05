import {StepperFormStep} from "src/components/stepper/FormStepper";

export const CreateNurseSteps = [
  {
    name: 'Personal Info',
    path: 'personal-info',
  },
  {
    name: 'Contract Info',
    path: 'contract-info',
  },
  {
    name: 'Addresses',
    path: 'addresses',
  },
  {
    name: 'Permissions',
    path: 'permissions',
  },
  {
    name: 'Absences',
    path: 'absences',
  }
] satisfies StepperFormStep[]