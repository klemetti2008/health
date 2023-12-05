import { Box, Drawer } from '@mui/material';
import ComingSoon from '../global/coming-soon';

interface TodoListDrawerProps {
  open: boolean;
  onClose: VoidFunction;
}

export default function TodoListDrawer({ open, onClose }: TodoListDrawerProps) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      BackdropProps={{
        invisible: true,
      }}
      PaperProps={{
        sx: { width: 320 },
      }}
    >
      <Box p={2}>
        <ComingSoon dense date={new Date('07/07/2024 21:30')} />
      </Box>
    </Drawer>
  );
}
