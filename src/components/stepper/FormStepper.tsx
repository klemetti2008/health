import {Box, Stack, Step, StepConnector as MUIStepConnector, StepLabel, Stepper, StepperProps} from "@mui/material";
import {styled} from "@mui/material/styles";
import Iconify from "src/components/iconify";

// ----------------------------------------------------------------------

const StepConnector = styled(MUIStepConnector)(({theme}) => ({
  top: 10,
  zIndex: 10,
  cursor: 'pointer',
  left: 'calc(-50% + 20px)',
  right: 'calc(50% + 20px)',
  '& .MuiStepConnector-line': {
    borderTopWidth: 2,
    borderColor: theme.palette.divider,
  },
  '&.Mui-active, &.Mui-completed': {
    '& .MuiStepConnector-line': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

export type StepperFormStep = {
  name: string;
  path: string;
}

// ----------------------------------------------------------------------

interface NewNurseStepsProps extends StepperProps {
  steps: StepperFormStep[];
  activeStep: number;
  changeStep: (step: StepperFormStep) => void;
}

export default function FormStepper({steps, activeStep, changeStep, sx, ...other}: NewNurseStepsProps) {
  const handleChangeStep = (step: StepperFormStep) => () => {
    // console.log(step)
    changeStep(step)
  }

  return (
    <Box sx={{width: '100%', backgroundColor: "background.neutral", py: 2, px: 5}}>
      <Stepper
        sx={{...sx}}
        alternativeLabel
        activeStep={activeStep}
        connector={<StepConnector/>}
        {...other}
      >
        {steps.map((step, i) => (
          <Step key={step.path}
            // TODO: if allowed to go to this step by some logic, then make it clickable
                onClick={handleChangeStep(step)}
                sx={{
                  cursor: 'pointer',
                  // TODO: if allowed to go to this step by some logic, then make it clickable
                  '& .MuiStepLabel-root.Mui-disabled': {
                    cursor: 'pointer',
                  }
                }}>
            <StepLabel
              StepIconComponent={StepIcon}
              sx={{
                cursor: 'pointer',
                '& .MuiStepLabel-label': {
                  typography: 'subtitle2',
                },
              }}
            >
              {step.name}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}


// ----------------------------------------------------------------------

type StepIconProps = {
  active: boolean;
  completed: boolean;
};

function StepIcon({active, completed}: StepIconProps) {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        width: 24,
        height: 24,
        color: 'text.disabled',
        ...(active && {
          color: 'primary.main',
        }),
      }}
    >
      {completed ? (
        <Iconify icon="eva:checkmark-fill" sx={{color: 'primary.main'}}/>
      ) : (
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
          }}
        />
      )}
    </Stack>
  );
}