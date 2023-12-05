import {useSelector} from "src/redux/store";
import {createNurseActiveStepSelector, currentNurseIdSelector, currentUserIdSelector} from "src/redux/slices/nurse";
import {
  StepChangedPayloadType,
  CurrentUserIdChangedPayloadType,
  CurrentNurseIdChangedPayloadType,
} from "src/@types/redux/nurse";
import {CreateNurseSteps} from "src/sections/nurse/NurseNewFormSteps/steps";

type UseStepDataReturnType = {
  userId: CurrentUserIdChangedPayloadType;
  nurseId: CurrentNurseIdChangedPayloadType;
  activeStep: StepChangedPayloadType;
  activeStepIndex: number;
}

export default function useStepData(): UseStepDataReturnType {
  const userId = useSelector(currentUserIdSelector)
  const nurseId = useSelector(currentNurseIdSelector)
  const activeStep = useSelector(createNurseActiveStepSelector)

  const activeStepIndex = CreateNurseSteps.findIndex((step) => step.path === activeStep.path);

  return {
    userId,
    nurseId,
    activeStep,
    activeStepIndex,
  };
}