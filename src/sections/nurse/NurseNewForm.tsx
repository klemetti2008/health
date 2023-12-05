import FormStepper from 'src/components/stepper/FormStepper';
import {
  AddressesFormStep,
  ContractInfoFormStep,
  NurseAbsencesFormStep,
  NursePermissionsFormStep,
  PersonalInfoFormStep,
} from 'src/sections/nurse/NurseNewFormSteps';
import {Box, Card} from '@mui/material';
import {CreateNurseStepsEnum} from 'src/@types/redux/nurse';
import {CreateNurseSteps} from 'src/sections/nurse/NurseNewFormSteps/steps';
import useStep from "src/sections/nurse/hooks/useStep";
import useStepData from "src/sections/nurse/hooks/useStepData";

interface NurseNewFormProps {
}

const Steps = {
  [CreateNurseSteps[CreateNurseStepsEnum.PersonalInfo].path]: <PersonalInfoFormStep/>,
  [CreateNurseSteps[CreateNurseStepsEnum.ContractInfo].path]: <ContractInfoFormStep/>,
  [CreateNurseSteps[CreateNurseStepsEnum.Addresses].path]: <AddressesFormStep/>,
  [CreateNurseSteps[CreateNurseStepsEnum.Permissions].path]: <NursePermissionsFormStep/>,
  [CreateNurseSteps[CreateNurseStepsEnum.Absences].path]: <NurseAbsencesFormStep/>,
} satisfies Record<string, JSX.Element>

export default function NurseNewForm(props: NurseNewFormProps) {
  const {changeStep} = useStep()
  const {activeStep, activeStepIndex} = useStepData()

  // TODO: if  userid or nurse id not found go to 404 page

  return (
    <Card>
      <FormStepper
        activeStep={activeStepIndex}
        changeStep={changeStep}
        steps={CreateNurseSteps}
      />
      <Box p={2}>
        {Steps[activeStep.path]}
      </Box>
    </Card>
  );
}
