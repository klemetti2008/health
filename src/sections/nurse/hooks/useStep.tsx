import {useRouter} from "next/router";
import {useDispatch, useSelector} from "src/redux/store";
import {useCallback, useEffect, useMemo} from "react";
import {
  currentUserIdChanged,
  currentUserIdSelector,
  currentNurseIdChanged,
  currentNurseIdSelector,
  createNurseActiveStepChanged,
  createNurseActiveStepSelector,
} from "src/redux/slices/nurse";
import {CreateNurseSteps} from "src/sections/nurse/NurseNewFormSteps/steps";
import {
  CreateNurseStepsEnum,
} from "src/@types/redux/nurse";
import {PATH_PAGE} from "src/routes/paths";
import {StepperFormStep} from "src/components/stepper/FormStepper";
import {pushParams} from "src/utils/pushParams";

type UseStepReturnType = {
  changeStep: (step: StepperFormStep) => void;
}

export default function useStep(): UseStepReturnType {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentStepPath = router.query.step as string | undefined;
  const currentUserId = router.query.userId as string | undefined;
  const currentNurseId = router.query.nurseId as string | undefined;

  const userId = useSelector(currentUserIdSelector)
  const nurseId = useSelector(currentNurseIdSelector)
  const activeStep = useSelector(createNurseActiveStepSelector)


  const requiredParamsForStepPath = useMemo(() => ({
    [CreateNurseSteps[CreateNurseStepsEnum.PersonalInfo].path]: [],
    [CreateNurseSteps[CreateNurseStepsEnum.ContractInfo].path]: ['userId'],
    [CreateNurseSteps[CreateNurseStepsEnum.Addresses].path]: ['userId', 'nurseId'],
    [CreateNurseSteps[CreateNurseStepsEnum.Permissions].path]: ['userId', 'nurseId'],
    [CreateNurseSteps[CreateNurseStepsEnum.Absences].path]: ['userId', 'nurseId'],
  }) as Record<string, string[]>, [])

  const changeStep = useCallback(
    (step: StepperFormStep) => {
      if (!step) return;
      pushParams([{key: 'step', value: step.path}]);
      dispatch(createNurseActiveStepChanged(step));
    }, [dispatch])

  const changeStepWithValidation = useCallback(
    (step: StepperFormStep) => {
      if (!step) return;

      const requiredParams = requiredParamsForStepPath[step.path];

      if (!userId && requiredParams.includes('userId')) {
        return;
      }

      if (!nurseId && requiredParams.includes('nurseId')) {
        return;
      }

      changeStep(step);

    }, [changeStep, nurseId, requiredParamsForStepPath, userId]
  );

  const changeUserId = useCallback(
    (uId: string) => {
      pushParams([{key: 'userId', value: uId}]);
      dispatch(currentUserIdChanged(uId));
    }, [dispatch]
  );

  const changeNurseId = useCallback(
    (nId: string) => {
      pushParams([{key: 'nurseId', value: nId}]);
      dispatch(currentNurseIdChanged(nId));
    }, [dispatch]
  );

  useEffect(() => {
    if (currentStepPath) {
      const innerActiveStep = CreateNurseSteps.find((step) => step.path === currentStepPath)
      if (innerActiveStep) changeStep(innerActiveStep);
    }

  }, [changeStep, currentStepPath, dispatch]);

  useEffect(() => {
    if (currentUserId) {
      changeUserId(currentUserId);
    }
  }, [changeUserId, currentUserId, dispatch, userId]);

  useEffect(() => {
    if (currentNurseId) {
      changeNurseId(currentNurseId);
    }
  }, [changeNurseId, currentNurseId, dispatch, nurseId]);

  if (!CreateNurseSteps.find((step) => step.path === currentStepPath || step.path === activeStep.path)) {
    router.push(PATH_PAGE.page404);
  }

  return {
    changeStep: changeStepWithValidation,
  };
}