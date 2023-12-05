import {StepperFormStep} from "src/components/stepper/FormStepper";

interface FormStep extends StepperFormStep {}

export enum CreateNurseStepsEnum {
  PersonalInfo = 0,
  ContractInfo = 1,
  Addresses = 2,
  Permissions = 3,
  Absences = 4,
}

export interface NurseState {
  createNurseActiveStep: FormStep;
  currentUserId: string;
  currentNurseId: string;
}

export type StepChangedPayloadType = FormStep;
export type CurrentUserIdChangedPayloadType = string;
export type CurrentNurseIdChangedPayloadType = string;

