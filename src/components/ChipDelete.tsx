import {Chip, ChipProps, IconButton} from "@mui/material";
import Iconify from "src/components/iconify";

interface Props extends ChipProps {
  onClick: () => void;
}

export default function ChipDelete({onClick, sx, ...props}: Props) {
  return <Chip
    {...props}
    sx={{mb: 1, ...sx}}
    icon={
      <IconButton
        sx={{p: .2}}
        onClick={onClick}
      >
        <Iconify icon="material-symbols:close-rounded"/>
      </IconButton>
    }
  />
}