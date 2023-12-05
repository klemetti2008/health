// @mui
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

export const StyledRoot = styled('main')(() => ({
  height: '100%',
  display: 'flex',
  position: 'relative',
}));

export const StyledSection = styled('div')(({ theme }) => ({
  position: 'relative',
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.up('md')]: {},
}));

export const StyledContent = styled('div')(({ theme }) => ({
  minHeight: '100vh',
}));
