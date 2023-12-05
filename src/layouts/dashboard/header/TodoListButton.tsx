import { useState } from 'react';
// @mui
import { Badge } from '@mui/material';
// components
import { IconButtonAnimate } from 'src/components/animate';
import Iconify from 'src/components/iconify';
import TodoListDrawer from 'src/sections/todo/TodoListDrawer';

// ----------------------------------------------------------------------

export default function TodoListButton() {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const totalUnRead = 5;

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpenDrawer}
        sx={{
          width: 40,
          height: 40,
          ...(openDrawer && {
            bgcolor: 'action.selected',
          }),
        }}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify icon="wpf:todolist" />
        </Badge>
      </IconButtonAnimate>

      <TodoListDrawer open={openDrawer} onClose={handleCloseDrawer} />
    </>
  );
}
