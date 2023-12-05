import {Box, CircularProgress, CircularProgressProps, Typography} from "@mui/material";
import {fPercent} from "../../utils/formatNumber";

export default function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number },
) {
  const {value} = props;
  let color = undefined as CircularProgressProps["color"]

  if (value < 30) {
    color = "error"
  } else if (value > 30 && value < 70) {
    color = "warning"
  } else {
    color = "primary"
  }

  return (
    <Box sx={{position: 'relative', display: 'inline-flex'}}>
      <CircularProgress color={color} sx={{width: 40}} variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${fPercent(value)}`}
        </Typography>
      </Box>
    </Box>
  );
}