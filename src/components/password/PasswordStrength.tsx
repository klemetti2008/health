import {usePasswordStrength} from 'src/hooks/usePasswordStrength';
import {LinearProgress, Stack, Typography} from "@mui/material";

interface PasswordStrengthProps {
  password: string | undefined;
}

export default function PasswordStrength({password}: PasswordStrengthProps) {
  const validation = usePasswordStrength(password || "");
  return (
    <Stack direction="row" alignItems="center" sx={{px: 1}}>
      <LinearProgress color={validation.color} variant="determinate" value={validation.strength} sx={{flexGrow: 1}}/>
      <Typography color={`${validation.color}.main`} sx={{pl: 2}} variant="caption">
        {validation.message}
      </Typography>
    </Stack>
  );
}
